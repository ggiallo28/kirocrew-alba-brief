"""Alba knowledge export: plain code, no LLM, no tokens.

Turns Alba's current brief, open tasks and reminders into markdown files in
~/.kiro/crew/apps/alba/data/knowledge/, the folder registered in Crew's Knowledge as "Alba".
One file per day (brief-YYYY-MM-DD.md) plus tasks.md and reminders.md, rewritten each run.
Nothing from the example brief is exported.
"""
from __future__ import annotations

import datetime as _dt
import json
import os
import re
import time

from kiro_crew.cron_script import Done

BASE = os.path.expanduser("~/.kiro/crew/apps/alba/data")
OUT = os.path.join(BASE, "knowledge")


def _w(name: str, text: str) -> None:
    os.makedirs(OUT, exist_ok=True)
    tmp = os.path.join(OUT, name + ".tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(text.rstrip() + "\n")
    os.replace(tmp, os.path.join(OUT, name))


def _src(x: dict) -> str:
    bits = [x.get("source"), x.get("space"), x.get("account")]
    return " · ".join(str(b) for b in bits if b)


def run(ctx):
    try:
        with open(os.path.join(BASE, "config.json"), encoding="utf-8") as f:
            cfg = json.load(f)
    except Exception:
        raise Done("config Alba non leggibile")
    today = time.strftime("%Y-%m-%d")
    written = []
    b = cfg.get("brief") or {}
    if b and not str(b.get("caption", "")).upper().startswith("ESEMPIO"):
        day = (b.get("generatedAt") or today)[:10]
        L = [f"---\ntitle: Alba brief {day}\ndate: {day}\ntype: daily-brief\n---\n", f"# Alba brief — {b.get('weekday', '')} {day}", ""]
        if b.get("headline"):
            L += [f"**{b['headline']}**", ""]
        push = b.get("push") or {}
        if push.get("title"):
            L += [f"## {push['title']}", push.get("body", ""), ""]
        for r in b.get("reminders") or []:
            L.append(f"- Reminder: {r.get('text', '')}" + (f" (since {r['since']})" if r.get("since") else ""))
        if b.get("reminders"):
            L.append("")
        ups = b.get("updates") or []
        if ups:
            L.append("## Updates")
            for u in ups:
                L.append(f"- **{u.get('title', '')}** [{_src(u)}] {u.get('body', '')}" + (f" <{u['url']}>" if u.get("url") else ""))
            L.append("")
        _w(f"brief-{day}.md", "\n".join(L))
        written.append(f"brief-{day}.md")
    tasks = [t for t in (cfg.get("tasks") or []) if t.get("status") == "open"]
    if tasks:
        L = ["---\ntitle: Alba — open to-dos\ntype: tasks\n---\n", f"# Open to-dos (updated {today})", ""]
        for t in sorted(tasks, key=lambda x: x.get("firstSeen", "")):
            L.append(f"- **{t.get('title', '')}** [{_src(t)}] since {t.get('firstSeen', '')}. {t.get('body', '')}" + (f" <{t['url']}>" if t.get("url") else ""))
        _w("tasks.md", "\n".join(L))
        written.append("tasks.md")
    # decisioni dell'utente sui task (scritte dal backend): cosa chiude e cosa scarta
    try:
        with open(os.path.join(BASE, "task-state.json"), encoding="utf-8") as f:
            st = list((json.load(f) or {}).values())
    except Exception:
        st = []
    st = [x for x in st if x.get("doneAt", "") >= (_dt.date.today() - _dt.timedelta(days=30)).isoformat()]
    if st:
        L = ["---\ntitle: Alba — closed to-dos\ntype: tasks-done\n---\n", f"# To-dos closed or dismissed in the last 30 days (updated {today})", ""]
        for x in sorted(st, key=lambda x: x.get("doneAt", ""), reverse=True):
            L.append(f"- {x.get('doneAt', '')} · {'dismissed' if x.get('status') == 'dismissed' else 'done'}: **{x.get('title', '')}** [{x.get('source', '')}]")
        _w("tasks-done.md", "\n".join(L))
        written.append("tasks-done.md")
    rem = [r for r in (cfg.get("reminders") or []) if r.get("status") == "pending"]
    if rem:
        L = ["---\ntitle: Alba — pending reminders\ntype: reminders\n---\n", f"# Pending reminders (updated {today})", ""]
        for r in rem:
            L.append(f"- {r.get('text', '')}" + (f" — due {r['due']}" if r.get("due") else " — in the next day's brief"))
        _w("reminders.md", "\n".join(L))
        written.append("reminders.md")
    # archivio dei brief precedenti già in history.json, se c'è
    try:
        with open(os.path.join(BASE, "history.json"), encoding="utf-8") as f:
            hist = (json.load(f) or {}).get("briefs") or []
    except Exception:
        hist = []
    for h in hist:
        d = str(h.get("date", ""))
        bb = h.get("brief") or {}
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", d) or str(bb.get("caption", "")).upper().startswith("ESEMPIO"):
            continue
        name = f"brief-{d}.md"
        if os.path.exists(os.path.join(OUT, name)):
            continue
        L = [f"---\ntitle: Alba brief {d}\ndate: {d}\ntype: daily-brief\n---\n", f"# Alba brief — {d}", "", f"**{bb.get('headline', '')}**", ""]
        for u in bb.get("updates") or []:
            L.append(f"- **{u.get('title', '')}** [{_src(u)}] {u.get('body', '')}")
        _w(name, "\n".join(L))
        written.append(name)
    raise Done("esportati: " + (", ".join(written) if written else "niente (brief di esempio)"))
