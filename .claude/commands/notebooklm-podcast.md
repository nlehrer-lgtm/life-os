Turn the research and content from the current chat into a NotebookLM Audio Overview — an off-the-cuff podcast between two hosts about what you're trying to solve or create — so you can listen instead of read. Compiles the substantive findings (key passages kept word-for-word, the back-and-forth stripped out), drives NotebookLM in Chrome to generate the episode, and hands back the private link to your notebook. There is no official NotebookLM API for personal accounts, so this works by automating the NotebookLM website through the connected Chrome browser.

Usage: `/notebooklm-podcast [optional: the focus or angle to center the episode on]`

## What this does

1. **Compiles** the substantive research and content *you* (Claude) produced in this chat into one clean source document — key passages verbatim, the meta-conversation (your clarifying questions, tangents, Nathaniel's prompts) dropped.
2. **Quick-confirms** with Nathaniel: shows the compiled source + the host steering prompt + the notebook name, and lets him tweak the focus before anything slow happens.
3. **Drives NotebookLM in Chrome** (`mcp__Claude_in_Chrome__*`): creates a fresh notebook, adds the compiled content as a source, and generates an Audio Overview steered to be a relaxed, two-host conversation about what Nathaniel is working through.
4. **Waits** for generation (can take several minutes) and **delivers the private notebook URL** — the link Nathaniel opens, signed into his own account, to play the episode on phone or laptop.

Nothing is saved into the Life OS vault. The only on-disk artifact is a throwaway temp file used to upload the source, which is deleted at the end.

## Prerequisites — check these first, stop if not met

- **Chrome is connected.** Call `mcp__Claude_in_Chrome__list_connected_browsers`. If no browser is connected, tell Nathaniel to open Chrome with the Claude extension and stop.
- **Logged into the right NotebookLM account.** Navigate to `https://notebooklm.google.com` and confirm the signed-in account is **nathanielrlehrer@gmail.com** (check the account avatar / email via `get_page_text` or `read_page`). If it's a different account (e.g. his work Google account) or logged out, stop and tell him to switch accounts in Chrome — do NOT proceed on the wrong account.

## Steps

### 1. Compile the source

Pull together the substantive research/content from this conversation:

- **Keep the real content word-for-word** — the findings, analysis, drafts, options, recommendations, data, and reasoning Claude brought to the table. That's the whole point; don't paraphrase or shorten the substance.
- **Drop the meta** — Claude's clarifying questions, Nathaniel's prompts, tool-call narration, "let me check…" filler, and tangents that aren't part of the actual deliverable.
- **Light structure only** — a short title line and a few section headers so the two hosts have a spine to follow. Don't editorialize or add commentary the chat didn't contain.
- If the chat covered several unrelated things, and Nathaniel passed a focus in the args, keep only what serves that focus. If no focus was given and the material is sprawling, ask one quick question about which thread to center on.

### 2. Identify the focus

In one sentence, name **what Nathaniel is trying to solve, decide, or create** here. This drives the host steering prompt. If he passed a focus in the args, use it. Otherwise infer it from the compiled content.

### 3. Build the steering prompt

Fill the template in the **Steering prompt** section below with the focus from step 2. This is what gets pasted into NotebookLM's "Customize" box so the hosts riff on Nathaniel's actual problem instead of giving a flat summary.

### 4. Quick-confirm checkpoint (do not skip)

Show Nathaniel, in chat:
- The proposed **notebook name** (see naming below).
- The **compiled source** (or a tight outline of it if it's very long).
- The **steering prompt** the hosts will follow.

Ask if he wants to tweak the focus/steering or just go. Wait for his go-ahead. Generation is slow and uses his account — don't start it until he confirms.

### 5. Generate in NotebookLM (Chrome automation)

NotebookLM's UI changes often, so locate controls by their **visible labels** using `read_page` / `get_page_text` / `find` rather than fixed coordinates. The flow:

1. **Write the compiled source to a temp file** outside the vault, e.g. `/tmp/lifeos-podcast-source-$(date +%Y%m%d-%H%M%S).md`.
2. **Create a new notebook** (the "Create new" / "+ New notebook" button on the NotebookLM home).
3. **Name the notebook** per the naming convention below.
4. **Add the source.** Open "Add source" / the "+" / "Add". Prefer **uploading the temp file** via `mcp__Claude_in_Chrome__file_upload` against the upload file input — most reliable for large text. Fallback: choose **"Paste text" / "Copied text"**, then put the content on the clipboard with `pbcopy` (Bash) and paste it into the textarea. Wait for NotebookLM to finish ingesting the source.
5. **Open the Audio Overview.** In the Studio / Audio panel, choose the **Audio Overview** (the two-host "Deep Dive" conversation format — pick "Deep Dive" if a format chooser is shown).
6. **Customize before generating.** Click **"Customize"**, paste the steering prompt from step 3, then click **"Generate"**.
7. **Wait for it to finish.** Generation typically takes a few minutes. Poll `get_page_text` every ~45–60s (up to ~10 min) until a play control / completed audio appears. Tell Nathaniel it's generating so he isn't left waiting in silence.

### 6. Deliver the link

- Grab the **notebook URL** from the address bar (`https://notebooklm.google.com/notebook/<id>`) and give it to Nathaniel as a clickable link. That's his private notebook in his own account — opening it (signed in) plays the episode.
- **Do not toggle public/"anyone with the link" sharing.** If he wants a truly public link, tell him he can flip that himself in NotebookLM's Share dialog — the skill won't change sharing permissions automatically (the content can include sensitive 1:1 / staff / work material).

### 7. Clean up

Delete the temp source file. Confirm to Nathaniel that the episode is ready, with the link.

## Steering prompt (template for NotebookLM's Customize box)

> Two podcast hosts having a relaxed, off-the-cuff conversation about what Nathaniel is working through here: **{focus from step 2}**. Talk it out naturally — riff, react, and build on each other like you're helping a friend think it through, not delivering a lecture. Stay conversational and energetic. Surface the key insights, options, tradeoffs, and recommendations from the source material, and make it clear what the actual takeaways are. Refer to him as Nathaniel.

Adjust the bracketed focus per run. Keep the "two hosts, off-the-cuff, helping Nathaniel think it through" spirit unless he asks for a different vibe at the checkpoint.

## Notebook naming

`Life OS Podcast — {short topic} — YYYY-MM-DD`

e.g. `Life OS Podcast — Messenger Cup fundraiser flow — 2026-06-25`. Use today's date and a 2–5 word topic from the focus.

## Troubleshooting / fallbacks

- **Wrong Google account in Chrome** → stop, tell Nathaniel to switch to nathanielrlehrer@gmail.com and re-run. Never generate on the work account.
- **File upload doesn't take** → fall back to the "Paste text" source via clipboard (`pbcopy` + paste).
- **No "Customize" option visible** → generate the default Audio Overview anyway, but tell Nathaniel it couldn't be steered this run.
- **Generation stalls past ~10 min** → leave it running, give Nathaniel the notebook link, and tell him to check back; the audio will appear there when done.
- **A control can't be found** → re-read the page (`read_page`), describe what's on screen, and adapt; don't blindly click coordinates.

## Important

- **No official API** — this is browser automation of the NotebookLM website. It depends on Nathaniel being logged into the right account in the connected Chrome.
- **This uses Nathaniel's own NotebookLM account** to create content for himself — that's within his request. **It does not publish anything publicly** and does not change sharing permissions.
- **Nothing is written to the Life OS vault.** The only artifact is a temp file in `/tmp`, deleted at the end.
- **Keep the substance verbatim, cut the meta.** The value is hearing the real research read back as a conversation, not a watered-down recap.
