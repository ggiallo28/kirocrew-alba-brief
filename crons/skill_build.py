"""Builds Alba's skill file(s) from skills/alba/core.md + skills/alba/parts/*.md.

Why: SKILL.md used to be one growing file with instructions for every possible app, read in full on
every brief even by a profile using only two or three of them. The shared rules now live in core.md;
each app that has real dedicated instructions (not just the generic "integration" line, which stays in
core since it is the same for every such app) gets its own small file under parts/.

- `python3 skill_build.py`, run by hand after editing core.md or parts/*.md, regenerates the complete
  static skills/alba/SKILL.md (core + every part) - the safe, always-complete default Crew's own skill
  loading reads by convention.
- `run(ctx)`, called by the pipeline as a script step right before the brief agent starts, regenerates
  data/skill-effective.md with only the parts for apps actually enabled right now (or with a real
  Slackbot recap saved), and that smaller file is what the brief prompt actually points the agent to.
"""
from __future__ import annotations

import json
import os

APP = os.path.expanduser("~/.kiro/crew/apps/alba")
SKILL_DIR = os.path.join(APP, "skills", "alba")
DATA = os.path.join(APP, "data")

# part file -> the app keys that make it relevant (None = decided separately, see build_effective)
PART_APPS: dict[str, set[str] | None] = {
    "linkedin.md": {"linkedin"},
    "slackbot.md": None,
    "folders.md": {"folder", "claudecode", "kiro"},
    "discord.md": {"discord"},
    "googlechat.md": {"googlechat"},
    "web.md": {"web"},
}


def _core() -> str:
    with open(os.path.join(SKILL_DIR, "core.md"), encoding="utf-8") as f:
        return f.read()


def _part(name: str) -> str:
    with open(os.path.join(SKILL_DIR, "parts", name), encoding="utf-8") as f:
        return f.read()


def _json(path: str, default):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default


def build_full() -> str:
    body = "\n\n".join(_part(n).rstrip("\n") for n in sorted(PART_APPS))
    return _core().rstrip("\n") + "\n\n" + body + "\n"


def _green_apps(cfg: dict, conns: dict, app_keys: set[str]) -> bool:
    """True if at least one ENABLED account of one of these apps is actually working right now -
    connected with no error (connections.json), or health[id].status == "ok" for the apps checked that way."""
    for app in app_keys:
        for a in (cfg.get("accounts") or {}).get(app, []) or []:
            if not a.get("enabled"):
                continue
            acc_id = a.get("id")
            c = conns.get(acc_id)
            if c is not None:
                if not c.get("lastError"):
                    return True
                continue
            h = (cfg.get("health") or {}).get(acc_id)
            if h and h.get("status") == "ok":
                return True
    return False


def _slackbot_green(data_dir: str) -> bool:
    import glob
    sb = _json(os.path.join(data_dir, "slackbot.json"), {})
    if not sb:
        return False
    for acc_id in sb:
        snaps = sorted(glob.glob(os.path.join(data_dir, "sources", "*", f"slackbot-{acc_id}.json")), key=lambda p: os.path.getmtime(p), reverse=True)
        if not snaps:
            return True  # configured, just not fetched yet: give it the benefit of the doubt
        items = _json(snaps[0], {}).get("items") or []
        if not (len(items) == 1 and items[0].get("kind") == "unavailable"):
            return True
    return False


def build_effective() -> str:
    cfg = _json(os.path.join(DATA, "config.json"), None)
    if cfg is None:
        return build_full()  # config unreadable: the complete skill is the safe fallback
    conns = _json(os.path.join(DATA, "connections.json"), {})
    wanted = []
    for name, apps in PART_APPS.items():
        if name == "web.md":   # a web watch has nothing to connect: enabled is enough
            want = any(a.get("enabled") for a in ((cfg.get("accounts") or {}).get("web") or []))
        else:
            want = _slackbot_green(DATA) if name == "slackbot.md" else _green_apps(cfg, conns, apps)
        if want:
            wanted.append(name)
    out = _core().rstrip("\n") + "\n"
    if wanted:
        out += "\n" + "\n\n".join(_part(n).rstrip("\n") for n in wanted) + "\n"
    return out


def run(ctx):
    """Pipeline script step: keep data/skill-effective.md fresh before the brief agent reads it."""
    out = build_effective()
    tmp = os.path.join(DATA, "skill-effective.md.tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(out)
    os.replace(tmp, os.path.join(DATA, "skill-effective.md"))


if __name__ == "__main__":
    with open(os.path.join(SKILL_DIR, "SKILL.md"), "w", encoding="utf-8") as f:
        f.write(build_full())
    print("SKILL.md rebuilt from core.md + parts/*.md")
