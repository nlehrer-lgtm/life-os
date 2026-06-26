Resume importing voice-journal transcripts from the macOS Journal app into `journal/entries/`, picking up exactly where the last run left off. Trigger when Nathaniel says "resume journal logs," "continue the journal import," or anything similar. Runs via computer-use (screen control), because Apple's Journal app has no API — the only way out is the app's "Copy Transcript" button.

## Before you run (what Nathaniel needs)

Tell him this up front if he hasn't already set up:

- **Be at the Mac, unlocked.** A permission dialog will ask him to approve screen control — he has to click Allow.
- **Don't use the Mac during the run.** Computer-use drives the Journal app the whole time; the cursor and windows are controlled. He gets the Mac back when it pauses/finishes.
- **Nothing needs to be manually opened.** This skill opens the Journal app itself and quits the blocking overlay (see Step 0). Journal just needs to be signed into the iCloud account that holds the entries (it is, on this Mac).
- **Optional:** tell me a stopping point ("resume journal logs through October") or I'll run continuously, oldest-ward, pushing per month, until done or he says stop.

## Step 0 — Tools, access, and clear the blocker

1. Load computer-use tools: `ToolSearch` with query `computer-use`, max_results 30 (one call loads the whole toolkit).
2. `request_access` for app `Journal` with **`clipboardRead: true`** (needed to read each copied transcript).
3. **Quit Clicky** — a click-visualizer overlay (`/Applications/Clicky.app`, process "HeyClicky") paints a full-screen, click-through window that makes EVERY click land on it instead of Journal, so automation is impossible while it runs. Check and quit it:
   - Bash: `pgrep -x HeyClicky && osascript -e 'quit app "HeyClicky"'` (fall back to `killall HeyClicky`).
   - It's harmless to quit; Nathaniel can relaunch it from Applications later. Mention that you closed it.

## Step 1 — Find the resume point

1. Read `journal/entries/apple-journal-import-log.md` → the **Resume point** section says which month/date to start at.
2. `ls journal/entries/` to see which `YYYY-MM-DD.md` files already exist — never re-capture or overwrite those.

## Step 2 — Open and position the Journal window

1. `open_application` `Journal`, then screenshot.
2. The feed is the scrolling list of entries, newest first, grouped by month. The detail view (opened by double-clicking a recording) is where "Copy Transcript" lives.
3. **Window position matters:** the detail-view three-dot "•••" button (top-right) disappears if the window sits too low / is taller than the screen. If "•••" is missing, **drag the title bar UP** (e.g. from ~(700, 93) to ~(700, 33)) so the toolbar clears the top. Don't fight the resize-edge handles — they're hard to grab; just move the window up.
4. Scroll the feed down to the resume month (e.g. "November 2025"). Scroll is **sluggish** — use scroll_amount ~50 over a non-card area, and close any open menu first (open menus eat scroll events).

## Step 3 — Capture routine (repeat per entry, going down = older)

For each audio entry at/after the resume point:

1. **Double-click** the entry's first recording card → `wait` ~2.5s → screenshot. (Single click only selects; double-click opens the detail view.)
2. Read the **date/time** from the bottom label and count the **page dots** at the bottom (one dot per recording in this entry).
3. Click **"•••"** (top-right, ≈ (1305, 50)) → click **"Copy Transcript"** (≈ (1297, 81)) → `read_clipboard`. Batch the open+menu: `double_click → wait 2.5 → click(1305,50) → wait 0.6 → screenshot`, then a second call to click Copy Transcript + read.
4. **Multiple recordings:** click the **›** arrow (≈ (1338, 447)) to advance to the next recording in the entry, then repeat the copy. (Arrows move WITHIN an entry only — they dead-end at the first/last recording.)
5. **No transcript:** if there's no "•••" button (only Share) or the transcript icon shows **"Couldn't Transcribe Audio"**, this recording has no transcript — **log it as Skipped** and move on. (Give it one retry click on "•••" first, in case it was still loading.)
6. Click the **back arrow** (top-left, ≈ (490, 50)) → returns to the feed at the **same scroll position** (it's preserved).
7. **Scroll down ~50** to the next entry and repeat.

## Step 4 — Save each entry (verbatim)

Write to `journal/entries/YYYY-MM-DD.md` using the date from the detail view:

```markdown
# Month Day, Year

*Voice journal entry imported from the Apple Journal app. Transcript is verbatim (auto-transcribed audio).*

## H:MM AM — Audio journal

[the transcript, exactly as copied]
```

- One `## H:MM AM — Audio journal` section per recording (multi-recording entries get multiple sections; note if they're one continuous session split by the recording limit).
- **Keep transcripts 100% verbatim** — voice-to-text quirks and all (e.g. "Elena/Elliot" = Ellie, "Shep" = Shepherd, "Stiddy" etc.). Do not edit, correct, or summarize. This is the one place the [[wiki-linking]] rule is **intentionally skipped** in the body — bracketing error-prone transcription would pollute the graph. Offer a separate cleanup/wiki-link pass at the end instead.
- If a date file already exists (e.g. an old typed entry), **append** a new section — never overwrite or delete existing content.

## Step 5 — Log, commit, push

1. Update `journal/entries/apple-journal-import-log.md`:
   - Add the date to the **Captured** table (date · # recordings · `[[YYYY-MM-DD]]`), or to **Skipped** (date · reason · short feed preview).
   - Rewrite the **Resume point** to the next month/entry not yet done.
2. A background auto-save watcher commits file changes on its own — you usually just need to **`git push origin master`** (every month boundary is a good cadence). If `git commit` says "nothing to commit," that's expected; just push.

## Pausing / finishing

- Stop at the boundary Nathaniel asked for (a month, a year) or when he says stop, or when you reach the oldest entry.
- Always finish by updating the **Resume point** in the log and pushing, then give a short report: dates captured, dates skipped (with reasons), and where the next run will pick up.

## UI quick reference (coordinates are approximate — always verify against a fresh screenshot)

- Back arrow ≈ (490, 50) · "•••" menu ≈ (1305, 50) · "Copy Transcript" item ≈ (1297, 81) · Share ≈ (1338, 50)
- Within-entry nav: ‹ ≈ (480, 447), › ≈ (1338, 447)
- These shift with window size/position — re-read them from a screenshot if clicks miss.

## Gotchas (learned the hard way)

- **Clicky overlay blocks all clicks** → quit it (Step 0). Symptom: "Click would land on HeyClicky."
- **"•••" missing** in detail view → window too low/tall; drag the title bar up.
- **Sluggish or dead scroll** → a menu is open; press Escape / click a neutral spot (a month header) first.
- **"Couldn't Transcribe Audio"** and **flat (un-rendered) waveform** in the detail view → no full transcript available (audio may not be downloaded from iCloud). The feed may show a short preview, but it's truncated — log as Skipped, don't save the partial as if complete.
- **Each transcript is long** — save to disk immediately after copying so nothing's lost if the session compacts. The saved files + this log are the source of truth for resuming.
