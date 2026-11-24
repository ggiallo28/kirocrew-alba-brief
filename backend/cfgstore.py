"""Safe writes to Alba's config.json, shared by the backend, the cron scripts and the MCP tools.

Several processes touch config.json: the page, the sign-in check, the brief agent, the backend. An agent
holds its copy of the file for minutes, so letting it rewrite the whole file loses whatever else changed in
the meantime. Two rules prevent that:
  1. every writer here reads the CURRENT file, changes only its own keys and writes it back under a
     cross-process lock (`update`);
  2. the brief agent does not write config.json at all: it writes data/out/brief-out.json and the backend
     merges `brief`, `tasks` and the delivered reminders into the current file (`commit_output`).
Standard library only.
"""
import contextlib
import json
import os
import time

try:
    import fcntl
except ImportError:   # Windows
    fcntl = None
    import msvcrt


@contextlib.contextmanager
def file_lock(path: str, timeout: float = 15.0):
    lp = os.path.abspath(path) + ".lock"
    os.makedirs(os.path.dirname(lp), exist_ok=True)
    fh = open(lp, "a+")
    t0 = time.time()
    try:
        while True:
            try:
                if fcntl:
                    fcntl.flock(fh, fcntl.LOCK_EX | fcntl.LOCK_NB)
                else:
                    fh.seek(0)
                    msvcrt.locking(fh.fileno(), msvcrt.LK_NBLCK, 1)
                break
            except OSError:
                if time.time() - t0 > timeout:
                    raise TimeoutError("config.json is locked")
                time.sleep(0.05)
        yield
    finally:
        try:
            if fcntl:
                fcntl.flock(fh, fcntl.LOCK_UN)
            else:
                fh.seek(0)
                msvcrt.locking(fh.fileno(), msvcrt.LK_UNLCK, 1)
        except OSError:
            pass
        fh.close()


def _read(path: str, default):
    try:
        with open(path, encoding="utf-8") as f:
            v = json.load(f)
        return v if isinstance(v, type(default)) else default
    except (OSError, ValueError):
        return default


def _write(path: str, obj) -> None:
    tmp = f"{path}.{os.getpid()}.tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)
    os.replace(tmp, path)


def update(path: str, fn):
    """Read the current file, let `fn(cfg)` change it (in place, or return a new dict), write it back. Returns the result."""
    with file_lock(path):
        cfg = _read(path, {})
        before = json.dumps(cfg, sort_keys=True)
        new = fn(cfg)
        if new is None:
            new = cfg
        if json.dumps(new, sort_keys=True) != before:   # no rewrite when nothing changed
            _write(path, new)
        return new


def ensure_out(data_dir: str) -> str:
    """data/out is the one folder the brief agent may write to (besides sources/)."""
    d = os.path.join(data_dir, "out")
    os.makedirs(d, exist_ok=True)
    return d


def commit_output(data_dir: str) -> bool:
    """Merge the agent's data/out/brief-out.json into config.json, archiving the brief it replaces in history.json. True when something new was committed.

    brief-out.json: {"brief": {...}, "tasks": [...], "delivered": ["<reminder id>", ...]}
    Only the keys present are applied; every other key of config.json stays as it is on disk right now."""
    src = os.path.join(data_dir, "out", "brief-out.json")
    cfgp = os.path.join(data_dir, "config.json")
    mark = os.path.join(data_dir, "out", ".brief-out.done")
    try:
        mt = os.path.getmtime(src)
    except OSError:
        return False
    try:
        if float(open(mark).read().strip() or 0) >= mt:
            return False
    except (OSError, ValueError):
        pass
    out = _read(src, {})
    if not out:
        return False
    delivered = {str(x) for x in (out.get("delivered") or [])}
    try:   # what the assistant wrote is reduced to what the page uses, with links limited to each app's own site
        import importlib.util
        spec = importlib.util.spec_from_file_location("alba_safety", os.path.join(os.path.dirname(os.path.abspath(__file__)), "safety.py"))
        safety = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(safety)
        nb, nt = safety.sanitize(out.get("brief"), out.get("tasks"), data_dir)
        if nb is not None:
            out["brief"] = nb
        if nt is not None:
            out["tasks"] = nt
    except Exception:
        out.pop("brief", None)   # never write an unchecked brief
        out.pop("tasks", None)
        if not delivered:
            return False

    replaced = {}

    def apply(cfg):
        if isinstance(out.get("brief"), dict):
            replaced["brief"] = cfg.get("brief")
            cfg["brief"] = out["brief"]
        if isinstance(out.get("tasks"), list):
            mine = list(out["tasks"])
            have = {str(t.get("id")) for t in mine if isinstance(t, dict)}
            cut = time.strftime("%Y-%m-%d", time.localtime(time.time() - 30 * 86400))
            # the history of closed tasks belongs to the user, not to one run: whatever the agent left out is kept for 30 days
            for t in cfg.get("tasks") or []:
                if isinstance(t, dict) and str(t.get("id")) not in have and t.get("status") in ("done", "dismissed") and str(t.get("doneAt") or "9999") >= cut:
                    mine.append(t)
            cfg["tasks"] = mine
        if delivered:
            for r in cfg.get("reminders") or []:
                if str(r.get("id")) in delivered and r.get("status") == "pending":
                    r["status"] = "delivered"
                    r["deliveredAt"] = time.strftime("%Y-%m-%d")
        keep = time.strftime("%Y-%m-%d", time.localtime(time.time() - 7 * 86400))   # delivered reminders are kept 7 days
        cfg["reminders"] = [r for r in cfg.get("reminders") or [] if not (r.get("status") == "delivered" and str(r.get("deliveredAt") or "9999") < keep)]

    update(cfgp, apply)
    _archive(data_dir, replaced.get("brief"))
    with open(mark, "w") as f:
        f.write(str(mt))
    return True


def _archive(data_dir: str, prev) -> None:
    """Keep the brief that was just replaced in history.json (one entry per day, newest first, 30 days), for the chat to look back on."""
    if not isinstance(prev, dict) or not str(prev.get("generatedAt") or "")[:10] or str(prev.get("caption") or "").upper().startswith("ESEMPIO"):
        return
    date = str(prev["generatedAt"])[:10]
    hp = os.path.join(data_dir, "history.json")

    def add(h):
        briefs = h.get("briefs") if isinstance(h.get("briefs"), list) else []
        if not any(isinstance(b, dict) and b.get("date") == date for b in briefs):
            briefs.insert(0, {"date": date, "brief": prev})
        h["briefs"] = briefs[:30]

    update(hp, add)


def add_reminder(data_dir: str, text: str, due: str = "") -> dict:
    import secrets
    r = {"id": "r" + secrets.token_hex(4), "text": str(text).strip()[:500], "createdAt": time.strftime("%Y-%m-%dT%H:%M:%S%z") or time.strftime("%Y-%m-%dT%H:%M:%S"), "status": "pending"}
    if due:
        r["due"] = str(due)[:10]

    def apply(cfg):
        cfg.setdefault("reminders", [])
        if not isinstance(cfg["reminders"], list):
            cfg["reminders"] = []
        cfg["reminders"].append(r)

    update(os.path.join(data_dir, "config.json"), apply)
    return r
