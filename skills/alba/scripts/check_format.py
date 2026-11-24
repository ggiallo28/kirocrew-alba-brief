"""Deterministic formatting checks on the brief the agent just wrote - plain code, no LLM.

Why: the skill asks for a confident voice, short tags, a headline about the shape of the day, a short
caption and a small number of short items, but nothing ever verified the agent actually followed that. This catches regressions the moment a brief
violates one of those rules, instead of only noticing weeks later when it quietly drifted back into
old habits.

This never rewrites or blocks the brief - rewriting prose well needs judgment a regex does not have.
It only reports, so whoever (or whatever) wrote the brief can see the drift and fix the specific
sentence.

The brief-writing agent has no shell access, so it never runs this file directly: `lint()` is called
by the backend's `check_brief_format` MCP tool (see backend/server.py's `mcp_call`), which the skill
(core.md) instructs the agent to call right after writing `brief`, before replying in chat.

This file is also a standalone CLI, for a human checking a brief by hand:

    python3 skills/alba/scripts/check_format.py ~/.kiro/crew/apps/alba/data/config.json

Exit code 0 and no output = clean. Otherwise it prints one violation per line and exits 1.
"""
from __future__ import annotations

import json
import os
import re
import sys

APP = os.path.expanduser("~/.kiro/crew/apps/alba")
DATA = os.path.join(APP, "data")

# Case-insensitive substrings that mean the text is narrating its own reading/sourcing instead of
# just stating facts. Kept short and literal on purpose: a regex cannot judge prose, it can only catch
# the exact tells that kept slipping back in. Extend this list (and LANGS below) when a new one does.
_BANNED_EN = [
    "i did not open", "i didn't open", "i have not opened", "i haven't opened",
    "i did not read", "i didn't read", "i could not read", "i couldn't read",
    "i only saw", "i was not able to", "i wasn't able to",
    "i can't confirm", "i cannot confirm", "i can't say", "i cannot say",
    "may be partial", "might be partial", "could be partial", "may not be complete",
    "this is a slackbot", "this comes from the slackbot", "this comes from a recap",
    "is a summary and",
]
_BANNED_IT = [
    "non ho aperto", "non ho letto", "non sono riuscito a leggere", "non sono riuscita a leggere",
    "ho visto solo", "non posso confermare", "non posso dire con certezza",
    "potrebbe essere parziale", "potrebbe non essere completo",
    "è un riepilogo di slackbot", "questo viene dal riepilogo",
]
LANGS = {"en": _BANNED_EN, "it": _BANNED_IT}

# the conjunction word that, in a long headline, is the warning sign for "two facts glued together"
# (see core.md's headline rule). One word per language actually in use; falls back to "and".
_CONJUNCTION = {"en": "and", "it": "e", "es": "y", "fr": "et", "de": "und", "pt": "e"}

# Sizes. core.md gives the writer tighter ceilings (20 / 75 / 55 / 50 words); these are set a little
# above them so a brief one or two words over is not sent back, only one that ignored the size.
MAX_HEADLINE_WORDS = 22
JOINED_HEADLINE_WORDS = 16   # a conjunction is only suspicious in a headline longer than this
MAX_PUSH_TITLE_WORDS = 12
MAX_PUSH_BODY_WORDS = 90
MAX_UPDATES = 10   # what the page can hold, not a target: the skill sets no number
MAX_UPDATE_TITLE_WORDS = 14
MAX_UPDATE_BODY_WORDS = 62
MAX_TASK_TITLE_WORDS = 13
MAX_TASK_BODY_WORDS = 68


def _words(text) -> int:
    return len(str(text or "").split())


def _json(path, default):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default


def _texts(brief: dict) -> list[tuple[str, str]]:
    """(field path, text) for every prose field a human reads, tags excluded (checked separately)."""
    out = []
    if brief.get("headline"):
        out.append(("headline", brief["headline"]))
    if brief.get("caption"):
        out.append(("caption", brief["caption"]))
    push = brief.get("push") or {}
    if push.get("title"):
        out.append(("push.title", push["title"]))
    if push.get("body"):
        out.append(("push.body", push["body"]))
    for i, u in enumerate(brief.get("updates") or []):
        if u.get("body"):
            out.append((f"updates[{i}].body", u["body"]))
        if u.get("title"):
            out.append((f"updates[{i}].title", u["title"]))
    return out


def _tags(brief: dict) -> list[tuple[str, str]]:
    out = []
    for i, u in enumerate(brief.get("updates") or []):
        if u.get("tag"):
            out.append((f"updates[{i}].tag", u["tag"]))
    return out


def lint(brief: dict, lang: str = "en", tasks: list | None = None) -> list[str]:
    if not brief:
        return []
    violations: list[str] = []
    lang_key = (lang or "en").split("-")[0]
    banned = LANGS.get(lang_key, _BANNED_EN)
    conjunction = _CONJUNCTION.get(lang_key, "and")

    headline = brief.get("headline") or ""
    n = _words(headline)
    if n > MAX_HEADLINE_WORDS:
        violations.append(f'headline is {n} words, keep it to 20: say what kind of day it is, the rest are to-dos and updates: "{headline}"')
    elif n > JOINED_HEADLINE_WORDS and re.search(rf"\b{re.escape(conjunction)}\b", headline, re.IGNORECASE):
        violations.append(f'headline is long and joins facts with "{conjunction}": keep the one about today, move the other to a to-do or an update: "{headline}"')
    if "(" in headline or headline.count(",") >= 3 or ";" in headline:
        violations.append(f'headline reads like a list of meetings or open threads, not one remark about the day: "{headline}"')

    caption = brief.get("caption") or ""
    if len(caption) > 60 or caption.count(",") >= 2 or caption.count("·") > 3:
        violations.append(f'caption reads like a source inventory, not a short identity line: "{caption}"')

    push = brief.get("push") or {}
    if _words(push.get("title")) > MAX_PUSH_TITLE_WORDS:
        violations.append(f'push.title is {_words(push.get("title"))} words, keep it to an action in 10: "{push.get("title")}"')
    if _words(push.get("body")) > MAX_PUSH_BODY_WORDS:
        violations.append(f'push.body is {_words(push.get("body"))} words, keep it to 75: facts first, then what you can do; ids and links belong in push.prompt')

    updates = brief.get("updates") or []
    if len(updates) > MAX_UPDATES:
        violations.append(f"{len(updates)} updates: the page holds {MAX_UPDATES}; fold related ones together")
    for i, u in enumerate(updates):
        if _words(u.get("title")) > MAX_UPDATE_TITLE_WORDS:
            violations.append(f'updates[{i}].title is {_words(u.get("title"))} words, keep it to 12: "{u.get("title")}"')
        if _words(u.get("body")) > MAX_UPDATE_BODY_WORDS:
            violations.append(f'updates[{i}].body is {_words(u.get("body"))} words, keep it to 50 by leaving out details that do not change what the user does ("{u.get("title")}")')

    # only the to-dos written in this run: older open ones carry over untouched (see Task lifecycle)
    day = str(brief.get("generatedAt") or "")[:10]
    todays = [t for t in (tasks or []) if isinstance(t, dict) and t.get("status", "open") == "open"
              and str(t.get("firstSeen") or "") == day and day and not str(t.get("id") or "").startswith("rem-")]
    for t in todays:
        if _words(t.get("title")) > MAX_TASK_TITLE_WORDS:
            violations.append(f'task "{t.get("id")}" title is {_words(t.get("title"))} words, keep it to verb plus object in 10: "{t.get("title")}"')
        if _words(t.get("body")) > MAX_TASK_BODY_WORDS:
            violations.append(f'task "{t.get("id")}" body is {_words(t.get("body"))} words, keep it to 55 ("{t.get("title")}")')

    for path, text in _texts(brief) + [(f'task "{t.get("id")}" body', t.get("body") or "") for t in todays]:
        low = text.lower()
        for phrase in banned:
            if phrase in low:
                violations.append(f'{path} contains banned self-narration ("{phrase}"): "{text}"')
                break

    for path, tag in _tags(brief) + [(f'task "{t.get("id")}" tag', t.get("tag")) for t in todays if t.get("tag")]:
        words = tag.replace("/", " ").split()
        if len(words) > 2:
            violations.append(f'{path} is {len(words)} words, tags must be 1-2: "{tag}"')

    return violations


def main() -> int:
    config_path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(DATA, "config.json")
    cfg = _json(config_path, {})
    brief = cfg.get("brief") or {}
    lang = cfg.get("lang") or "en"
    violations = lint(brief, lang, cfg.get("tasks") or [])
    for v in violations:
        print(v)
    return 1 if violations else 0


if __name__ == "__main__":
    raise SystemExit(main())
