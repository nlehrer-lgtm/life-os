Compile rolling Get REC'D meeting talking points into a clean prep doc for the next Tuesday's meeting. Run this the day before (Monday) or the morning of (Tuesday) so Nathaniel walks into Get REC'D with a focused list of what he wants to talk about in his team-wide updates section.

## Steps

1. **Get the current date.** Calculate the date of the **next upcoming Tuesday** (the next Get REC'D meeting). If today is Tuesday, use today.

2. **Read the rolling talking points file:**
   `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/Get REC'D Meeting/agendas/_talking-points.md`

   If the file is empty (only the header, no captured entries), tell Nathaniel: "No Get REC'D talking points captured this week. Add some via `/note`, or run this again later." Stop here — don't create an empty prep doc.

3. **Compile the prep doc.** Read every captured entry and turn it into clean line-item talking points:
   - Group related items together if obvious.
   - Tighten phrasing into focused bullets — one line each where possible.
   - Preserve specifics (names, dates, references like "Leif Babin video", Asana tasks, etc.).
   - **Do not add anything that wasn't in Nathaniel's notes.** No padding, no extrapolating, no "you might also want to mention…".

4. **Save the prep doc** to:
   `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/Get REC'D Meeting/agendas/YYYY-MM-DD.md`

   Where `YYYY-MM-DD` is the next Tuesday. Use this template:

   ```markdown
   # Get REC'D Meeting — [Day, Month DD, YYYY]

   _Tuesday, 8:00 AM_

   ## Section 3 talking points (Nathaniel)

   - [Bullet 1]
   - [Bullet 2]
   ...
   ```

   **If the prep doc for this Tuesday already exists** (re-run case), append a new section below the existing content:

   ```markdown

   ## Added HH:MM

   - [New bullet]
   ...
   ```

   Never overwrite existing items.

5. **Clear the rolling talking points file** by resetting it to just the original header (preserving the file structure for the next week). The compiled bullets are now in the dated prep doc — no info is lost.

   Reset content:
   ```markdown
   # Get REC'D Talking Points (Rolling)

   Items captured via `/note` when a note mentions "Get REC'D" accumulate here through the week. Run `/get-recd-prep` before the next Tuesday meeting — it compiles these into a prep doc and clears this file.

   ---
   ```

6. **Confirm** with a brief summary, e.g.:
   `Get REC'D prep saved → agendas/2026-05-19.md. [N] talking points. Rolling file cleared.`

## Important

- Pull **only** from `_talking-points.md`. Don't pull from journals, digests, or anything else.
- Keep bullets tight and direct — these are talking points Nathaniel will glance at during the meeting, not a script.
- This skill produces Section 3 talking points only (Nathaniel's team-wide updates). It does not prep the icebreaker rotation or Lindy's calendar section — those aren't his to prepare.
- Write all files to `/Users/nlehrer/Desktop/life-os/` (not any worktree path) so Obsidian sees changes immediately.
