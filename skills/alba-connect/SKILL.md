---
name: alba-connect
description: How Alba apps are connected (credentials never reach the agent) and how to read the read-only snapshots they produce
triggers: ["alba-connect", "collega", "connect to alba", "connetti ad alba"]
---

# Alba: connected apps

Connections are made by the user in the **Sources** page of Alba, never in chat. Alba's own backend keeps the credentials in the operating system's secret store, per account, and writes read-only snapshots. **You never see, ask for, or handle a token, password or secret.** If the user pastes one in chat, tell them not to, that it is now exposed and should be revoked, and point them to Sources > the app card > the plug button.

## What you can read
`~/.kiro/crew/apps/alba/data/sources/<profile>/<app>-<account>.json`
Each file: `{ source, account, space, readOnly, fetchedAt, issues|items: [...] }`. One profile (space) per folder: never mix profiles and never move data between them. These files contain no secrets.

## Google apps (Gmail, Calendar, Drive)
Alba connects them with the user's own free Google Cloud app (OAuth, read-only), set up once from Alba's configuration page, which opens in the user's usual browser (Google refuses automated browsers). Alba's backend keeps the tokens in the OS secret store; you never see them. If asked how to connect, point to the Connect button in Sources and never ask for any value.

## Apps with a real connector today
- **Gmail**: unread or starred inbox mail of the last 7 days (`items`: `from, subject, date, snippet, unread, starred, important, kind, direct, needsReply, threadSize, score, url`), read-only. The backend classifies and ranks them in code, best first: `kind` is `person`, `notification` or `bulk` (newsletters, promotions, social); `direct` means addressed to the user; `needsReply` means the last message of the thread is from someone else; `score` combines them. Slack items older than 7 days are already dropped.
- **Google Calendar**: events of today and tomorrow from the user's selected calendars (`items`: `title, start, end, allDay, location, attendees, calendar, url`).
- **Slack** (user token, read-only): mentions and direct messages (`items`: `kind, channel, from, text, ts, url`).
- **Google Drive**: the 20 most recently modified files (`items`: `name, type, modified, by, url`), metadata only.
- **Gmail**: unread or starred inbox mail of the last 7 days, read-only (`items`: `id, threadId, from, subject, date, snippet, unread, starred, important, kind, direct, needsReply, score, url`, ranked best first). Use `url` as the task/update `url` (Gmail links look like `https://mail.google.com/mail/?authuser=<email>#inbox/<id>`: keep them exactly); tag with the file's `space` and `account`. Quote nothing sensitive in chat beyond what the user asked for.
- **YouTrack**: assigned, unresolved issues (`id, title, project, state, priority, due, updated, url`). Use `url` as the task/update `url`; tag with the file's `space` and `account`.
- **Notion** (token): pages edited in the last 7 days (`title, kind, edited, url`).
- **Linear** (personal key): open issues assigned to the user (`id, title, team, state, priority, due, updated, url`).
- **Trello** (key + read-only token): open cards assigned to the user (`title, board, list, due, dueComplete, updated, url`). A card with a past `due` and `dueComplete: false` is overdue.
- **GitHub** (classic token with `notifications`): `kind: notification` (`reason` such as `review_requested`, `mention`, `ci_activity`, `repo`, `title`, `unread`, `url`), `kind: review_requested` and `kind: mine` (open PRs; public repositories only).
- **Outlook** (Microsoft Graph, read-only): `kind: mail` (`from, subject, date, snippet, unread, important, url`, last 3 days) and `kind: event` (`title, start, end, location, attendees, url`, today and tomorrow, UTC times).
- Discord is read from the page but never its private conversations (DMs, group DMs, message requests). LinkedIn, Telegram and Teams have no usable official API for personal messages: they are read from the page in Crew's browser.

Every other app is not connected through a connector yet. For those, the account's `method` decides: `page` (browser, read-only) or nothing. Do not suggest installing MCP servers or editing any MCP config file for Alba.

## If a snapshot is missing or old
Say so in one short line (e.g. "<app> (<profile>): not synced since <date>"). The backend refreshes every 30 minutes; the user can press refresh on the account row. Do not invent content.

## Sign-in through the browser (no setup, any app that has a web page)
When a message ends with `[alba-login:<app>]` the user wants to sign in once in Crew's browser so Alba can read that app from the page. Gmail, Google Calendar and Drive never take this path: they use Alba's own Google connection (above), because Google blocks automated browsers. Use this section only for apps without a connector.
1. Use the `browser` tool. **Call format matters**: parameters go inside `args`, e.g. `{"op":"navigate","args":{"url":"https://mail.google.com/"}}`. A call like `{"op":"navigate","url":"..."}` (url outside `args`) is refused with a misleading "only public URLs" error even though the page is public: if you see that error, retry with `args`. Open the app's page for that account (Gmail: `https://mail.google.com/mail/?authuser=<account email>`, which picks the right Google account when several are signed in; check the page title shows that email. If it shows another account, do not read anything: hand control to the user to choose or add the right account).
2. Verify the account from the page itself (snapshot: the Google account button label contains the email; the page title alone is not enough). If it is another account or a sign-in screen, open `https://accounts.google.com/ServiceLogin?Email=<email>&continue=<app page>` (email prefilled), snapshot, then call the browser op **`ask`** with `{kind:"credentials", reason:"<short sentence>"}` and **no targets**: Crew shows its secure sign-in sheet, the user types the password there, and the browser fills and submits each screen by itself. You never see the password. For a one-time code use `ask` `{kind:"otp", digits:<n>, targets:[...]}`, for a CAPTCHA `ask` `{kind:"human_check"}`; for a phone prompt `wait_for {text:<email>, time:20}` a few times. Act on the outcome, do not ask the user to say when they are done. Never type or request a password or code in chat.
3. When the right account's main view is visible, set `verifiedAt` (ISO) on that account in the config (match by `label` and `space`), and reply in one sentence that the sign-in works and the account is set to read from the page. Do not read, open or click anything else. Never click anything that changes data.
4. Say that the daily brief will read the list of unread and starred items only, read-only, and that if the page asks to sign in again later the user can repeat this step.

## Pages per app (use `args`, add the account email where Google supports `authuser`)
- Gmail: `https://mail.google.com/mail/?authuser=<email>`
- Google Calendar: `https://calendar.google.com/calendar/u/0/r/day?authuser=<email>`
- Google Drive: `https://drive.google.com/drive/recent?authuser=<email>`
- Slack: `https://app.slack.com/client` · Discord: `https://discord.com/app` (mentions Inbox and chosen server channels only; never direct messages) · LinkedIn: `https://www.linkedin.com/messaging/` · Notion: `https://www.notion.so/` · Linear: `https://linear.app/` · Trello: `https://trello.com/` (the boards and cards assigned to the user, with due dates) · GitHub: `https://github.com/notifications` · Outlook: `https://outlook.office.com/mail/` · Teams: `https://teams.microsoft.com/` · Telegram: `https://web.telegram.org/`
Same rules everywhere: the user signs in, you never type credentials, you only read, you never click anything that changes data.

## Reading Google Calendar from the page (daily brief)
Open the day view for the account, check the page shows that account, and read today's events (time, title, attendees count, location/link if visible). Do not accept, decline, create, move or delete anything.

## Reading Gmail from the page (daily brief)
Open `https://mail.google.com/mail/?authuser=<account email>#inbox`, check the page title shows that email (otherwise stop and say so), and read only the list rows (sender, subject, snippet, unread/starred). **Never open a message**: it would mark it as read. Never archive, delete, label, reply or send. Use the row's link as `url`. Tag with the account's space and label.
