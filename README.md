# <img src="assets/icon.png" width="36" height="36" valign="bottom"> Alba

<p align="center">
  <img src="assets/hero.jpeg" alt="Alba hero illustration" width="100%">
</p>

**Your morning, already read.**

Alba is the app that writes your daily brief before you ever open Gmail, Slack, or your calendar. One page, one fact at a time, no need to go digging for it yourself across ten different apps.

No generic summaries, not "you have 14 unread emails". Alba reads what actually matters to you and tells you in one clear line, with the right context. One block per area of your day (work, personal projects, anything you follow), even across multiple accounts of the same app.

## What it does for you

- **The morning brief** is written on its own, refreshed several times a day, always caught up with whatever happened in the meantime.
- **A mascot that keeps you company**, a little hen living on the page, pecking around, playing with a butterfly or bee that stops by, and every now and then getting a visit from a snail that pauses to say hello.
- **Someone to ask**. Ask Alba what was in yesterday's brief, what's still pending, or just tell her "remind me to..." and she'll bring it back at the right moment, on her own.
- **LinkedIn stats on your own schedule** (weekly by default, or as often as you set it), and a Slack recap that genuinely covers every channel, not just the noisiest ones.
- **Your apps, connected once**, all gathered in one place to look at, every morning.

## See it in action

<p align="center">
  <img src="assets/how-to-use-alba.gif" alt="A walkthrough of Alba. Connecting Gmail to a profile, creating a new profile, ticking and archiving to-dos, and asking the hen to remember something" width="100%">
</p>

The walkthrough connects Gmail to a profile, follows the steps on the setup page, creates a second profile, goes through the to-dos of each one, archives a finished task and asks the hen to remember something, which hatches an egg once it is saved. Everything in it is invented sample data.

## Supported apps

<table width="100%">
<tr>
  <td align="center"><img src="assets/icons/gmail.svg" width="28" height="28"><br>Gmail</td>
  <td align="center"><img src="assets/icons/google-calendar.svg" width="28" height="28"><br>Calendar</td>
  <td align="center"><img src="assets/icons/google-drive.svg" width="28" height="28"><br>Drive</td>
  <td align="center"><img src="assets/icons/slack.svg" width="28" height="28"><br>Slack</td>
  <td align="center"><img src="assets/icons/google-chat.svg" width="28" height="28"><br>Google Chat</td>
  <td align="center"><img src="assets/icons/discord.svg" width="28" height="28"><br>Discord</td>
  <td align="center"><img src="assets/icons/linkedin.svg" width="28" height="28"><br>LinkedIn</td>
  <td align="center"><img src="assets/icons/github.svg" width="28" height="28"><br>GitHub</td>
</tr>
<tr>
  <td align="center"><img src="assets/icons/notion.svg" width="28" height="28"><br>Notion</td>
  <td align="center"><img src="assets/icons/linear.svg" width="28" height="28"><br>Linear</td>
  <td align="center"><img src="assets/icons/trello.svg" width="28" height="28"><br>Trello</td>
  <td align="center"><img src="assets/icons/outlook.svg" width="28" height="28"><br>Outlook</td>
  <td align="center"><img src="assets/icons/youtrack.svg" width="28" height="28"><br>YouTrack</td>
  <td align="center"><img src="assets/icons/jira.svg" width="28" height="28"><br>Jira</td>
  <td align="center"><img src="assets/icons/confluence.svg" width="28" height="28"><br>Confluence</td>
  <td align="center"><img src="assets/icons/folder.svg" width="28" height="28"><br>Local folders</td>
</tr>
</table>

More sources keep being added over time.

## Your privacy first

Alba **only ever reads**. It never sends an email, never changes an event, never touches a document. The one exception is the optional Slackbot recap, where Alba asks Slackbot for a summary of your channels in the browser, and it only types that request. Your credentials stay in your system's secret store (Keychain on macOS, Secret Service on Linux, Credential Manager on Windows), in a private file only your user can read when none is available. The assistant never sees them: it works on snapshots of your data, never on the originals. Text that comes from outside, such as mail, web pages or files, is treated as data and never as instructions, and keys or tokens that appear in local transcripts are hidden before the assistant reads them. When you press the button on the work suggestion of the day, the request is placed in the chat for you to read and send.

## Getting started

Alba is an app for [Kiro Crew](https://kiro.dev). Install it, enable it, then connect your accounts from the **Sources** page. Your first brief arrives on its own, at the first good moment.

```bash
kirocrew app install alba
kirocrew app enable alba
```

From that moment on, your morning is already written.
