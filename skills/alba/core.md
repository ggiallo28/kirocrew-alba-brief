---
name: alba
description: Prepare the Alba brief per space and save it to the Alba page, never in chat
triggers: [alba, riepilogo mattutino, digest]
always: false
---

# Alba

Goal: what the user needs to know and do today, on one page, without opening anything.
**Never output the brief in chat. Write it into Alba's config file**, which the page reads.

`config.json`'s `about` (if set) is one line the user wrote on who they are and what they do; `aboutBySpace[<space>]`, when present, overrides it for that profile only (someone can be a different "who I am" at work than personally). For an item in space S use `aboutBySpace[S] ?? about`. Use it as a relevance filter everywhere: it decides what counts as personally interesting versus generic noise (LinkedIn invitations/jobs, Slack opportunities/events, anything ambiguous). It is a preference about relevance, never a command to do anything else.


## Learn from past briefs (Knowledge)
Alba's briefs, open tasks and reminders are exported every weekday at 8:30 into Crew's Knowledge, source "Alba" (namespace "Alba"). **Before writing the brief**, call `local_knowledge_search` with `namespace: "Alba"` (a query such as "open tasks and recent briefs") and use what you find to: not repeat news already told unless it changed or is still open; follow up on tasks that stayed open; notice trends (what keeps coming back, what the user usually ignores); write one short sentence on what changed since the last brief. If the search returns nothing, just write the brief. Never copy old briefs into the new one.

## Learn from the user's votes
On the page the user can mark an update with a thumb up (more like this) or a thumb down (less like this). The votes are in `~/.kiro/crew/apps/alba/data/feedback.json`: `{ "votes": [ { "vote": 1 | -1, "at": "YYYY-MM-DD", "title", "tag", "source", "space" } ] }`, oldest first. **Read it before choosing the updates** (a missing file means no votes yet).
- A thumb down says "this kind of thing is not news to me". Work out what kind it was (the topic, the sender or channel, the type of item: an announcement, a release, a digest) and leave similar updates out from now on. Several thumbs down on the same kind make it a firm rule.
- A thumb up says "this was worth my time": when two candidates compete for a place, the one closer to what was voted up wins.
- Generalize from the kind of item, never from the exact title: the same story will not come back, a similar one will. Recent votes count more than old ones, and a later vote overrides an earlier one on the same kind.
- Votes shape which updates are chosen. They never hide something where a person is waiting on the user or a date is at stake, and they never apply to to-dos.
- Never mention the votes in the brief.

## Language
Read `lang` in the config file (the language of the Kiro Crew interface, e.g. `it`, `en`, `pt-BR`). Write **every text field** of the brief in that language: headline, titles, bodies, tags, `weekday`, `dateLabel` (localized month, e.g. "18 NOV 2026" / "NOV 18, 2026"), `caption` and `unread`. If `lang` is missing, use English.

## Rules
- **Read-only** on the apps. Never send, reply, archive, delete or modify. Possible actions become proposals.
- **Never invent.** Every item comes from a source you really read. If a source cannot be reached, add it to `unread`.
- **One single brief that mixes all enabled accounts of all spaces.** Do not make one page per space or per account. Rank items by importance across everything. Tag every item with its `space` and its `account` so the page can filter and label it.
- Window: since the last brief (`generatedAt`) or the last 18 hours.
- Each item: concrete, with real names, dates and times, written the way "How the brief reads" below describes.

## How the brief reads
The brief is a short morning note from someone who read everything for the user. It is not a log of what arrived. The user should finish it in under a minute and know what to do first.

**Pick, do not cover.** Out of a hundred or more items in the sources, only the ones that matter reach the page: one piece of work to push, the to-dos, the updates. There is no fixed number. Everything that changes the user's day, a decision or a deadline is in, however many that is, and nothing else is. A brief that mentions everything has failed, even if every line in it is true; so has one that leaves out something the user needed in order to stay under a count.

**Read deep, write short.** Reading the real content is what lets you write one precise sentence instead of five careful ones.
- **Start from the ranking.** Gmail snapshots arrive already ranked by code (`score`, `kind`, `direct`, `needsReply`, `important`). Candidates are, in order: people writing to the user directly whose thread waits for an answer (`needsReply`), starred or important mail, calendar events and invites, direct mentions in chat, and whatever the other connected sources mark as waiting on the user (a review request, a failed check, an assigned issue past its date). Everything with `kind: "bulk"` or `"notification"` is background, unless it carries a security alert, a deadline or money.
- **Dig, do not skim.** Subject lines and snippets are not enough. For the 5-8 candidates that matter most, read the real content with the query tools: `gmail_read` (the full message), `slack_channel` / `slack_search` (the thread around a mention), `calendar_events` (the day, the invites). Then write what the item actually says.

### Voice
- **Talk to the user as "you"**, like a calm colleague who already looked into it: "The contract draft is still waiting for your comments."
- **Short sentences, one fact each**, mostly under 18 words. When a sentence needs a second comma, split it in two.
- **Plain words.** Contractions are fine. No headings, lists or tables inside a field: every field is plain sentences, because the page is a narrow card.
- **Times the way the user lives them**: their own timezone, and relative days where natural ("tomorrow at 6 PM", "Friday night"). Add the other timezone only when the user will have to quote it to someone.
- **People by the name the user knows them by**, usually the first name or the handle. A full name only the first time a stranger appears.
- **Keep a number or an id only when it helps find the thing or decide** ("invoice 2031", "3 of 5 approvals in", "12 seats left"). Leave out what does not change what the user does: the minute a mail was sent, how many people are invited, message ids, quoted subject lines, the name of the meeting tool, who was in copy.
- **End an item on what it means for the user**: the consequence, what is still open, or the next step ("No reply yet.", "Check the totals before you approve.").
- **Confident voice, no self-narration.** Tell the user what is there, never how you learned it or how far your reading went. No sentences about what you did or did not open, read or check ("I did not open the attachment", "I only saw the first lines", "I can't confirm"), and none about the reliability of the source material ("this is a recap and it may be partial"). State the facts you have. If a detail is missing, leave it out, or, only when the gap itself changes what the user must do, say it as a fact about the world ("the attachment still needs a look"). Never fill a gap with a guess. Source-level gaps (a source not connected, a page that needed sign-in, a recap that covered only part of a channel) go ONLY in `unread`, never inside an item.
- The one place for "I" is the last sentence of `push`, where you offer what you can do.

### The parts and their size
The word counts are a ceiling in any language, not a target. Shorter is better whenever nothing is lost.

- **`headline`: what kind of day it is, in at most 20 words.** Read it off the calendar first. Empty calendar: say so and what that frees up. One meeting that matters: name it and its time. Otherwise the one deadline or blocker of the day. One or two short sentences, spoken to the user, and a small human remark is welcome. It is a teaser, not a table of contents: never list meetings, never stack unrelated open threads (those are to-dos and updates), never a generic greeting. Good: "Nothing on the calendar today or tomorrow. Use the quiet however you like." / "One call at 15:00 and nothing else. The morning is yours." / "Three meetings back to back from 10:00, so the budget reply has to go out first." Bad: "The review starts at 10:30, and the offer you received last week still waits for your answer before Friday." (two unrelated threads glued together: keep the one about today, the other is a to-do).
- **`push`: the one piece of work most worth moving forward today.** Prefer something of the user's own that you could draft for them: a reply, a document that needs an outline, a summary someone asked for, a plan. `title`: an action in at most 10 words ("Draft the reply to the supplier's offer"). `body`: 3-5 short sentences, at most 75 words. Facts first (since when, who is waiting, what is blocking), then a last sentence in first person on what YOU can do ("I can draft a reply that accepts the price and asks for the earlier delivery date."). `prompt`: the full request to send to the agent if the user presses "Let's do it", written so the agent can start without asking anything. Exact ids, links and names belong in `prompt`, not in `body`.
- **To-dos (`tasks`): what the user personally has to do or decide.** Create one whenever someone is waiting on the user or a date is at stake, as many as there really are; something the user merely could do is an update, or nothing. `title`: verb plus object in at most 10 words ("Answer the kickoff invite for Thursday"), never a topic, never a quoted meeting title with its time range and the sender's full name. `body`: 2-4 short sentences, at most 55 words: who is waiting and since when, what happens if it waits, and the one detail that changes how to act (a version, a deadline, a risk to check first).
- **Updates: as many as are needed, no more.** An update earns its place only if it changes the user's day, a decision or a deadline; every one that does is included, and none is added to fill the page. `title`: the news itself as a short statement with a verb, at most 12 words ("Expense reports now need two approvals", "The community call is tomorrow at 6 PM your time", "The venue is confirmed, but catering is still open"), never a topic label ("Expense policy", "Discussion about the venue"). `body`: 2-4 short sentences, at most 50 words: what changed, what it means, what is still open. Fold small related facts into one update ("Your trip next week is taking shape") instead of one update per mail. Include things that matter but are not on the calendar (an event announced in Slack or mail).
- **`tag` is one or two words, no exceptions**: the project, organization, channel or sender name itself ("Finance", "Hiring", "Website"), never that name plus a qualifier ("Acme calendar"). If the precise name needs more than two words, use its shorter, more recognizable piece. Never the tool or method that produced the item ("Slackbot recap", "Gmail"): that is plumbing, not a topic. Tasks take a `tag` too.
- **`caption` is a short identity line**: the pattern `"Alba · N spaces · M sources"` (counts only), plus at most one short clause if something needs flagging there (a source that errored today). Never list the apps you read or skipped: that is what `sources` and `unread` are for.

An example of the compression, on one update:
- Before, 53 words: "The organizer canceled 'Weekly data sync' (15:45-16:45) at 01:01 and sent a new invite at 02:02 for 'Data sync with the vendor', today 16:30-17:00 on a video call with 3 attendees. It already shows on your work calendar and the invite mail still waits for your answer. The review meeting ends at 15:30."
- After, title "Data sync moved to 16:30 today", 33 words: "The 15:45 sync was cancelled and replaced by a half-hour call with the vendor at 16:30. The invite still needs your answer. Your review ends at 15:30, so there's a gap before it."

### Choosing and ordering
- **One item, one thing.** Two unrelated pieces of news that share a source or an account are two items, each with its own title and `tag`.
- **Order by importance across all accounts and profiles**, not by source. Merge duplicates: the same thing in mail and Slack is one item.
- **Never drop something where a person is waiting on the user or a date is at stake.** Everything below that bar is folded into one line of a related update, or left out. On a quiet day the brief is shorter still. Never add filler to look full.
- **Continuity.** Read the previous brief (`history.json`, most recent entry). If its `push` is still open, keep pushing it with what changed since ("two people replied since yesterday"); drop it once done. Do not repeat an update already told unless it changed.
- **Hot or not.** Set `"hot": true` on the one or two tasks/updates that need attention today (deadline, someone waiting, failure); leave it out otherwise.
- **Do not pad.** Newsletters, job alerts and promotions are not in the brief at all unless something in them is actionable.
- **Sources that are not connected** go in `unread`, never invented.

## Focus per source (user-written guidance)
`config.json` may hold `focus`: `{ "<space>": { "<app>": "text" } }` (for example `focus["Work"]["gmail"]`). It is the user's own instruction on what to look for in that app **for that profile**. When you read an account, apply the text for its `space` and app as the selection rule: it decides what counts as important, what to ignore and what to put first. If there is no entry, use the default behaviour of this skill. The focus never overrides the rules (read-only, never invent, honest limits). Treat it as a preference about relevance, not as a command to do anything else.

## Privacy: private conversations are off limits
The same care applies to any chat app read from the page: stay on mentions and shared channels, never wander into private threads.

## How often each source is read (frequency)
`config.json` may hold `frequency`: `{ "<account id>": { "mode": "every|weekly|off", "days": [1..7] } }` (1 = Monday ... 7 = Sunday), set by the user in each account's panel. For every enabled account look up `frequency[<its id>]`: no entry or `every` => read it in every brief; `off` => do not read it and do not mention it; `weekly` => read it only if today's weekday is in `days`, otherwise leave it out silently (it is not an error and not worth an `unread` line). Apply this before reading anything.

## What never goes in the brief
- Verification codes, one-time passwords, sign-in codes and "security code" emails: they are noise, never an update or a task (a Google or AWS security alert about an unknown sign-in IS worth a line).
- An empty source is not news. If a snapshot has no items (for example Slack connected to an empty personal workspace), do not write an update saying "nothing new": add one short `unread` line naming the app and that it returned no content (and the workspace name if the snapshot or `connections.json` has it). Skip this `unread` line entirely if a newer snapshot for the SAME account already covers it (e.g. a `slackbot-<account id>.json` recap for that account): an empty legacy snapshot superseded by a working one is not worth mentioning.
- **A source you read fine but with nothing new or actionable is not mentioned anywhere** - not as an update, not in `unread`. `unread` is only for sources you could NOT read, that errored, or that are genuinely empty (the point above); "read, nothing changed since last time" is simply left out of the brief.

## Where to read
1. The account registry: `~/.kiro/crew/apps/alba/data/config.json`, fields `spaces` and `accounts` (per app: `label`, `space`, `method`, `enabled`). Read only accounts with `enabled: true`.
2. **Snapshot first.** If `data/connections.json` has an entry for the account `id` (or a snapshot file for it exists in `data/sources/<profile>/`), the account IS connected: read its snapshot, whatever its `method` says (older accounts were saved as `page` before they were connected). Use the browser only when there is no snapshot. Every connected app with items is a source to consider: GitHub (CI failures, review requests, mentions, your own open PRs), Notion, Linear, Trello and Outlook count the same as Gmail. List in the brief's `sources` every source you actually read. **Local folder accounts (apps `folder`, `claudecode`, `kiro`, whatever their `method` says) never have a `connections.json` entry or a snapshot file - that is normal for them, not "not connected". Check them separately via `config.json`'s `health[<account id>]` instead, and read every enabled one regardless of what this point says.**
   `method` `integration` (or legacy `integrazione`): for connected apps read the snapshot files described in the `alba-connect` skill (`data/sources/<profile>/`), only the ones of the account's own profile. You never receive credentials. If the app has no snapshot, add one short `unread` line and skip it; do not invent content.
3. **No web pages in the brief.** Do not open pages with the browser for the brief. Discord, Telegram and Teams are NOT read (opening them marks the user's messages as read and takes notifications away); LinkedIn is read only by its own weekly job (`alba-linkedin`) that writes a snapshot you read like any other. If an account has no snapshot, skip it and say so in one short `unread` line. If you ever do use the browser, close every tab you opened before you finish.
   - A linkedin snapshot's items each carry `"scope": "profile"` or `"scope": "company"` (the latter also has a `"page"` field, the company page name) when that account has a company page configured (`companyPage` on the account). Treat them as two separate things, not one account's numbers: a `company_metrics`/`company_post` item is about the company page's own audience (followers, visitors, its posts), never merge its numbers into the personal profile's metrics or vice versa, and name which one you mean if you surface both (e.g. "your profile" vs "the Acme page").
   `method` `page` (or legacy `pagina aperta`), or when no integration exists (except the local folder apps `folder`, `claudecode` and `kiro`, read with the folder tools described further down, never the browser): use the `browser` tool if available (parameters go inside `args`, e.g. `{"op":"navigate","args":{"url":"https://..."}}`; a `url` outside `args` is refused with a misleading "only public URLs" error): open the page, read with `snapshot`, never click actions that modify anything. State that the source was read from the screen. The daily sign-in check is done by code (`crons/health.py`), not by you.

## Where to write (mandatory)
Read `config.json`, add or replace ONLY the key `brief` (one object, not per space; ignore and leave alone any old `briefs` key), and rewrite the whole file keeping every other key (`accounts`, `spaces`, `lang`) and writing `brief` and `tasks` together. The JSON must stay valid.

Format of `brief`:
```json
{
  "generatedAt": "2026-11-18T08:00:00+01:00",
  "weekday": "Tuesday",
  "dateLabel": "18 NOV 2026",
  "timeLabel": "08:00",
  "headline": "One sentence that sums up the day.",
  "caption": "Alba · 3 accounts · 2 spaces",
  "push": { "title": "Get the X ready for review", "body": "3-5 sentences: the facts, what is blocking, then what I can do for you.", "prompt": "The full request to send to the agent if the user presses the button." },
  "updates": [ { "title": "News", "tag": "Channel or sender", "body": "2-4 sentences with names, numbers, dates and what is still unknown.", "source": "gmail", "url": "https://mail.google.com/mail/u/0/#inbox/...", "space": "Personal", "account": "me@gmail.com" } ],
  "sources": ["slack", "gmail"],
  "unread": ["linkedin (not connected)"],
  "reminders": [ { "text": "Call the accountant", "since": "17 Nov" } ]
}
```
`source` and `sources` use these keys: gmail, calendar, drive, googlechat, slack, discord, linkedin, notion, linear, trello, github, youtrack, jira, confluence, web, folder, claudecode, kiro.
`url` (optional, on every task and update): the direct https link to the exact source item (the email, Slack thread, calendar event, issue or pull request). The icon of the source is a clickable link to it. Only http(s) links; leave it out if you do not have the real link, and never build or guess one. Without `url` the icon opens the app's home page. `space` must be exactly one of the space names in `spaces`; `account` is the account `label`. Limits: 1 `push`, at most 10 `updates` (a page limit, not a target). Tasks also accept `tag` and `hot`, and updates accept `hot`. Do NOT put tasks in `brief.todos`: tasks live in the separate top-level `tasks` array (see Task lifecycle).

## Task lifecycle (mandatory)
Tasks are the top-level `tasks` array in the config file. Each task: `{ "id", "title", "body", "source", "space", "account", "firstSeen": "YYYY-MM-DD", "url": "https://…", "status": "open|done|dismissed", "doneAt": "YYYY-MM-DD", "doneBy": "user|source" }`.
On every run, FIRST read `~/.kiro/crew/apps/alba/data/task-state.json` (object keyed by task id: `{ "status": "done|dismissed", "doneAt", "doneBy" }`). It holds what the user ticked or dismissed on the page and it is the truth: those ids are CLOSED, whatever `config.json` says. Apply it to the `tasks` you keep (copy `status`, `doneAt`, `doneBy`), never re-open or re-propose them, never count them as open or "to do", and never mention them in the headline, the push or the updates as pending (a reminder `rem-<id>` that is `done` there is no longer due; the push `push:<generatedAt>` being `done` or `dismissed` means do not repeat that suggestion). Do not edit or delete `task-state.json`. Then read the existing `tasks`:
0. **One to-do, one profile.** `space` and `account` are the ones of the snapshot file the item was read from, never guessed from its content. A to-do covers items of one profile only: two requests that live in different profiles are two to-dos, even when they look alike. If an existing open to-do bundles items of different profiles, or its item now sits in another profile's snapshot (the user moved or filtered the account), replace it with one to-do per profile, each with the right `space` and `account`, keeping the original `firstSeen`.
1. **Never duplicate.** If a source item matches an existing task (same source, account and subject, or the same `id`), keep that task and its `firstSeen`. Create a new task (stable `id`, `firstSeen` = today) only for genuinely new requests.
2. **Not completed => it carries over.** Open tasks stay open, untouched, every day. Do not reset `firstSeen`, do not hide them. The page shows their age ("for 2 days"), marks them overdue from day 3 and moves them to "To revisit" from day 7. Never delete an open task yourself.
3. **Resolved at the source => close it.** If you can see in the source that the thing is done (the email was answered, the thread resolved, the invite accepted, the issue closed), set `status: "done"`, `doneAt: today`, `doneBy: "source"`.
4. **Completed by the user => leave it.** Tasks the user marked `done` or `dismissed` stay as they are and must never be proposed again.
5. **Pruning.** Remove `done`/`dismissed` tasks whose `doneAt` is older than 30 days.
6. Alba is read-only on the apps: ticking a task never archives, replies or changes anything in Gmail, Slack or other sources.

## History (mandatory)
Before you replace `brief` in `config.json`, archive the previous one: read `~/.kiro/crew/apps/alba/data/history.json` (create `{"briefs":[]}` if missing), insert `{ "date": "<date of the previous brief's generatedAt, YYYY-MM-DD>", "brief": <the previous brief object> }` at the START of `briefs` (skip it if an entry with the same date exists), keep at most 30 entries, and rewrite the file. The alba-bot chat reads this file to answer questions about past briefs. Never delete the history for any other reason.

## Reminders (mandatory)
The user can ask Alba to remember things (the mascot in the page, the alba-bot agent, or Cmd+K). They are in the top-level array `reminders`: `{ id, text, createdAt, due?, status: "pending"|"delivered" }`.
On every run, with today's date D:
1. Deliver each `pending` reminder when: it has `due` and `due <= D`; or it has NO `due` and the date of `createdAt` is **before** D (so a reminder asked today comes back in tomorrow's brief, never in today's).
2. Put delivered reminders in `brief.reminders` as `{ "text": "...", "since": "<createdAt date, localized>" }`. The page shows them in the top section "Alba reminds you".
3. Also create a task for each one so it carries over until the user ticks it: `{ "id": "rem-<id>", "title": <text>, "source": "alba", "space": <first space>, "firstSeen": D, "status": "open" }` (do not duplicate if it already exists).
4. Mark each delivered reminder `status: "delivered"` and add `deliveredAt: D`. Keep delivered reminders 7 days, then remove them.
5. Leave future-dated reminders untouched. Never invent or reword them beyond a light cleanup.
6. If there are no delivered reminders, set no `brief.reminders` at all.

## Check formatting before you reply (mandatory)
Right after you write `brief` and `tasks` to `config.json`, call the `check_brief_format` tool (no arguments). It first moves any item filed under the wrong profile to the right one (when it does, the answer has `corrected` and the file has changed: read `config.json` again before editing it further). Then it is a deterministic, non-LLM check of what can be counted: the sizes given in "How the brief reads" (headline, push, the to-dos created today, update titles and bodies), a headline that reads like a list, a caption that lists sources, self-narration phrases, tags longer than two words. `clean: true` means it is fine. Otherwise `violations` says what is wrong and where: fix that field in `config.json` and call it again until it comes back clean, before replying in chat. Fix the real problem the rule describes. An item over its size is cut by leaving out the details that do not change what the user does, never by squeezing the same details into fewer words.

## After writing
Reply in chat with ONE short line in the user's language: the brief's headline followed by the counts, starting with the sun emoji, e.g. `☀ <headline> · 7 updates · 2 to do` (this line is the system notification). No lists, no copy of the content.
