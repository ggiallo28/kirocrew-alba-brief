## LinkedIn insights (weekly)
If `data/sources/*/linkedin-*.json` exists, its `fetchedAt` is within the last 8 days, and you have not already covered that fetch in a previous brief, add ONE update (`source: "linkedin"`, `tag: "LinkedIn"`) made of:
- The one or two numbers that moved most against the previous week (read `data/linkedin-history.json`) and the post that did best, with a short, honest reason you can see in the numbers.
- The single most useful suggestion for next week (opening line, format, timing or topic) - never one you already gave.
- It is an update like the others: same size, 2-4 short sentences.
- If items are `unavailable`, add one `unread` line naming the page that could not be read and why, not a sentence in the update.

Other item kinds, each worth at most one line when relevant:
- `job` (with the `alert` it came from): results of the user's saved searches - mention only new, relevant ones, grouped by search.
- `event`: an upcoming event worth mentioning if it fits the user's field or they are going.
- `invitation` / recommended `job`: worth a line only when it matches `config.json`'s `about` (who the user is and what they do, if set) - say who is waiting and for how long if known.

If the newest snapshot is older than 8 days, do not present its numbers as current: write one short `unread` line instead ("LinkedIn: data from N days ago"). Never invent numbers, and never read LinkedIn messages.
