"""Alba pipeline: the only scheduled job of the app. Plain code, no LLM of its own.

Every five minutes (cron in app.json) it looks at what is due; the brief itself runs on the days and from the time the user chose, never after 22:00. It looks at what is due and runs the steps in order:

    pre   : health (sign-in check), linkedin (weekly stats, browser agent)
    main  : brief (agent)
    post  : knowledge (export to Crew's Knowledge), slackbot (channel recap asked to Slackbot, slow: kept last so it never blocks the brief)

A step that needs an agent is started in its own session and the next tick waits for it to finish
(it is finished when its output changed), so the order holds even if the computer was off at 08:00.

To add a step: write its `due_<id>` (and, for a script step, a module with `run(ctx)`), then add one line to STEPS.
Never raise Done here: in Crew it REMOVES the job from the schedule. A tick ends with a plain return (or Skip when idle).
Manual runs: the page writes data/run-request.json {"force": ["brief"]} and triggers this job.
"""
from __future__ import annotations

import datetime as dt
import glob
import importlib.util
import json
import os
import time

from kiro_crew.cron_script import Done, Skip

APP = os.path.expanduser("~/.kiro/crew/apps/alba")
BASE = os.path.join(APP, "data")
STATE = os.path.join(BASE, "pipeline.json")
REQ = os.path.join(BASE, "run-request.json")
TIMEOUT = 25 * 60   # an agent step that has not produced anything after this long is given up
RETRY = 45 * 60     # a failed brief is retried after this long, at most 3 times a day

# phase order is the list order. kind: "script" runs now; "agent" starts a session and is awaited.
STEPS = [
    {"id": "health", "kind": "script", "module": "health.py"},
    {"id": "linkedin", "kind": "agent", "prompt": "alba-linkedin", "session": "Alba · LinkedIn"},
    {"id": "brief", "kind": "agent", "prompt": "alba-now", "session": "Alba · brief"},
    {"id": "knowledge", "kind": "script", "module": "knowledge.py"},
    {"id": "slackbot", "kind": "agent", "prompt": "alba-slackbot", "session": "Alba · Slackbot"},
]


# ---------------------------------------------------------------- small helpers
def _json(path, default):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default


def _save(st: dict) -> None:
    tmp = STATE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(st, f, ensure_ascii=False, indent=1)
    os.replace(tmp, STATE)


def _prompt(cmd_id: str) -> str:
    for c in (_json(os.path.join(APP, "app.json"), {}).get("contributes", {}).get("commands") or []):
        if c.get("id") == cmd_id:
            return c.get("prompt", "")
    return ""


def _module(fname: str):
    sp = importlib.util.spec_from_file_location("alba_" + fname[:-3], os.path.join(os.path.dirname(__file__), fname))
    m = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(m)
    return m


def _is_example(b: dict) -> bool:
    return str(b.get("caption", "")).upper().startswith("ESEMPIO")


def _brief_today(cfg: dict, now: dt.datetime) -> bool:
    b = cfg.get("brief") or {}
    gen = str(b.get("generatedAt") or "")
    if not gen or _is_example(b):
        return False
    try:
        return dt.datetime.fromisoformat(gen.replace("Z", "+00:00")).astimezone().date() == now.date()
    except ValueError:
        return False


def _linkedin_ready(cfg: dict) -> bool:
    accs = [a for a in ((cfg.get("accounts") or {}).get("linkedin") or []) if a.get("enabled")]
    return any(((cfg.get("health") or {}).get(a.get("id")) or {}).get("status") == "ok" for a in accs)


def _linkedin_files() -> list[str]:
    return glob.glob(os.path.join(BASE, "sources", "*", "linkedin-*.json"))


def _linkedin_newest_day() -> str:
    best = ""
    for fp in _linkedin_files():
        best = max(best, str(_json(fp, {}).get("fetchedAt") or "")[:10])
    return best


def _marker(step_id: str, cfg: dict) -> str:
    """Value that changes when the step's agent has produced its output."""
    if step_id == "brief":
        return str((cfg.get("brief") or {}).get("generatedAt") or "")
    if step_id == "linkedin":
        return str(max([os.path.getmtime(f) for f in _linkedin_files()] or [0]))
    if step_id == "slackbot":
        return str(max([os.path.getmtime(f) for f in glob.glob(os.path.join(BASE, "sources", "*", "slackbot-*.json"))] or [0]))
    return ""



def _fresh_sources(wait: float = 150.0) -> bool:
    """Ask the backend to re-read every connected source and wait for it (the brief must not use stale data)."""
    rq = os.path.join(BASE, "refresh-request.json")
    dn = os.path.join(BASE, "refresh-done.json")
    t0 = time.time()
    try:
        with open(rq, "w", encoding="utf-8") as f:
            json.dump({"ts": t0}, f)
    except OSError:
        return False
    while time.time() - t0 < wait:
        done = _json(dn, {})
        if float(done.get("for") or 0) >= t0 - 0.001 and done.get("ts"):
            return True
        time.sleep(2)
    return False


# ---------------------------------------------------------------- when is a step due
def _recent(s: dict, secs: float) -> bool:
    return bool(s.get("startedAt")) and time.time() - float(s["startedAt"]) < secs


def due_health(s, cfg, now, force):
    return force or s.get("day") != now.date().isoformat()


def _last_due_day(days: list[int], now: dt.datetime) -> str:
    """Most recent date (today included) whose weekday is in `days` (1 = Monday ... 7 = Sunday)."""
    for back in range(7):
        d = now - dt.timedelta(days=back)
        if d.isoweekday() in days:
            return d.date().isoformat()
    return now.date().isoformat()


def due_linkedin(s, cfg, now, force):
    if force:
        return True
    if not _linkedin_ready(cfg) or _recent(s, 6 * 3600):
        return False
    # frequency set on the account (avatar panel); default: once a week, on Monday
    accs = [a for a in ((cfg.get("accounts") or {}).get("linkedin") or []) if a.get("enabled")]
    modes = [(cfg.get("frequency") or {}).get(a.get("id")) or {"mode": "weekly", "days": [1]} for a in accs]
    modes = [m for m in modes if m.get("mode") != "off"]
    if not modes:
        return False
    newest = _linkedin_newest_day()
    for m in modes:
        if m.get("mode") == "every":
            target = now.date().isoformat()
        else:
            target = _last_due_day(m.get("days") or [1], now)
        if newest < target:
            return True
    return False


def due_slackbot(s, cfg, now, force):
    """Slackbot recap: once a day (or as set on the account) for every account with a saved Slackbot chat address."""
    sb = _json(os.path.join(BASE, "slackbot.json"), {})
    if not sb:
        return False
    if force:
        return True
    if _recent(s, 3 * 3600) and s.get("status") == "failed":
        return False
    today = now.date().isoformat()
    for acc in (((cfg.get("accounts") or {}).get("slack")) or []):
        if not acc.get("enabled") or acc.get("id") not in sb:
            continue
        m = (cfg.get("frequency") or {}).get(acc["id"]) or {"mode": "every"}
        if m.get("mode") == "off":
            continue
        if m.get("mode") == "weekly" and now.isoweekday() not in (m.get("days") or [1]):
            continue
        done = [str(_json(f, {}).get("fetchedAt") or "")[:10] for f in glob.glob(os.path.join(BASE, "sources", "*", f"slackbot-{acc['id']}.json"))]
        if not done or max(done) < today:
            return True
    return False


def due_brief(s, cfg, now, force):
    if force:
        return True
    if _brief_today(cfg, now):
        return False
    if s.get("day") == now.date().isoformat() and int(s.get("attempts", 0)) >= 3:
        return False
    return not _recent(s, RETRY)


def due_knowledge(s, cfg, now, force):
    if force:
        return True
    if not _brief_today(cfg, now):
        return False
    day = str((cfg.get("brief") or {}).get("generatedAt") or "")[:10]
    fp = os.path.join(BASE, "knowledge", f"brief-{day}.md")
    try:
        gen = dt.datetime.fromisoformat(str(cfg["brief"]["generatedAt"]).replace("Z", "+00:00")).timestamp()
        return not os.path.exists(fp) or os.path.getmtime(fp) < gen
    except Exception:
        return False


DUE = {"health": due_health, "linkedin": due_linkedin, "slackbot": due_slackbot, "brief": due_brief, "knowledge": due_knowledge}


# ---------------------------------------------------------------- the tick
def run(ctx):
    dry = (getattr(ctx, "message", "") or "").strip() == "dry"
    now = dt.datetime.now()
    st = _json(STATE, {})
    steps = st.setdefault("steps", {})
    req = _json(REQ, None)
    if req:
        st["force"] = sorted(set(st.get("force") or []) | set(req.get("force") or []))
        if not dry:
            try:
                os.remove(REQ)
            except OSError:
                pass
    force_all = set(st.get("force") or [])
    st["force"] = []   # one-shot: a forced run must never linger into a later tick and bypass the day/time gate below
    cfg = _json(os.path.join(BASE, "config.json"), None)
    if cfg is None:
        raise Skip("config non leggibile")
    sch = cfg.get("schedule") or {}
    days = sch.get("days") or [1, 2, 3, 4, 5]   # 1 = Monday ... 7 = Sunday, set from the Alba page
    try:
        hh, mm = (int(x) for x in str(sch.get("time") or "08:00").split(":")[:2])
    except ValueError:
        hh, mm = 8, 0
    if not force_all and ((now.isoweekday() not in days) or (now.hour, now.minute) < (hh, mm) or now.hour >= 22):
        raise Skip("fuori orario")
    today = now.date().isoformat()
    notes: list[str] = []

    for step in STEPS:
        sid = step["id"]
        s = steps.setdefault(sid, {})
        if s.get("status") == "running":
            if _marker(sid, cfg) != s.get("before"):
                s.update(status="ok", endedAt=time.time(), day=today)
                notes.append(f"{sid}: finito")
            elif time.time() - float(s.get("startedAt", 0)) > TIMEOUT:
                s.update(status="failed", endedAt=time.time(), error="timeout")
                notes.append(f"{sid}: timeout")
            else:
                if not dry:
                    _save(st)
                return
            st["force"] = [f for f in (st.get("force") or []) if f != sid]
            continue
        forced = sid in force_all
        if not DUE[sid](s, cfg, now, forced):
            continue
        if dry:
            notes.append(f"dry: {sid} sarebbe avviato")
            continue
        if step["kind"] == "script":
            try:
                try:
                    _module(step["module"]).run(ctx)
                except (Done, Skip):
                    pass
                s.update(status="ok", day=today, startedAt=time.time(), error="")
                notes.append(f"{sid}: fatto")
            except Exception as e:  # a failing script step must not block the others
                s.update(status="failed", day=today, startedAt=time.time(), error=f"{type(e).__name__}: {str(e)[:120]}")
                notes.append(f"{sid}: errore")
            st["force"] = [f for f in (st.get("force") or []) if f != sid]
            # a script step can change the config (health): reread it for the next steps
            cfg = _json(os.path.join(BASE, "config.json"), cfg)
            continue
        # agent step: own session, then wait for it
        if sid == "brief":
            _fresh_sources()   # collect from the sources first, then let the agent read the snapshots
            try:
                _module("skill_build.py").run(ctx)   # keep the skill trimmed to the apps actually enabled right now
            except Exception:
                pass   # the prompt falls back to the full static SKILL.md if this file is missing
        try:
            slot = ctx.open_session(step["session"] + " " + now.strftime("%d/%m %H:%M"), agent="alba-agent")  # unique name: a run may only control sessions it created
            ctx.send_to_session(slot, _prompt(step["prompt"]))
        except Exception as e:
            s.update(status="failed", startedAt=time.time(), day=today, error=f"{type(e).__name__}: {str(e)[:120]}")
            notes.append(f"{sid}: non avviato")
            continue
        s.update(status="running", startedAt=time.time(), before=_marker(sid, cfg), error="",
                 attempts=(int(s.get("attempts", 0)) + 1) if s.get("day") == today else 1, day=today)
        _save(st)
        return

    if not dry:
        _save(st)
    if not notes:
        raise Skip("niente da fare")
