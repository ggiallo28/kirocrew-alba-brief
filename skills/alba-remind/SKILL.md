---
name: alba-remind
description: Save a reminder the user asks for, deducing the day or asking when it cannot be deduced
triggers: [remind me, remind, reminder, ricordami, ricorda, promemoria, recuérdame, rappelle-moi, erinnere mich, lembre-me]
always: false
---

# Alba: reminders

The user asks Alba to remember something. Alba does NOT act now: it brings the reminder back, proactively, in a daily brief.

## When it comes back (the user does NOT have to say)
1. The message gives a time -> resolve it against today's date.
2. The thing is tied to something in the current or a previous brief (a meeting, a deadline, an event) -> the day the user needs it (the day before if preparation is needed). Say what you chose in one short clause.
3. Nothing to go on -> ask ONE short question and wait. If the user answers "whenever / it does not matter" (in any language), use the next day's brief.
Never invent a day. A past date: ask.

## Where to write (mandatory)
Call the `reminder_add` tool: `text` (what to remember, in the user's words) and `due` (`YYYY-MM-DD`; leave it out only for "the next day's brief"). The tool saves it safely. Never edit `config.json` yourself.

## Reply
One short sentence in the user's language saying WHEN it comes back.
