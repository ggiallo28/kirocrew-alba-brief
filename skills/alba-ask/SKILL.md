---
name: alba-ask
description: Answer the user's questions about today's Alba brief and about previous briefs, from Alba's own files
triggers: [brief, ieri, yesterday, ayer, hier, gestern, ontem, "what was", "cosa c'era", "cosa avevo", previous brief, precedente, in sospeso, pending, "what did"]
always: false
---

# Alba: ask about briefs

Read-only. Sources: `~/.kiro/crew/apps/alba/data/config.json` (current `brief`, `tasks`, `reminders`, `spaces`, `accounts`) and `~/.kiro/crew/apps/alba/data/history.json` (previous briefs: `{"briefs":[{"date":"YYYY-MM-DD","brief":{...}}]}`, newest first, up to 30 days).

- Look the answer up in the files (grep by keyword, then read the matching entry). Name the brief it comes from ("in the brief of Tuesday 17").
- If it is not in the files, say so. Never invent. You have no access to Gmail, Slack or other apps.
- Questions about "what is still open" -> read `tasks` (status `open`, with `firstSeen`, age in days).
- Answer in the user's language (`lang` in the config file), in one or two sentences.
