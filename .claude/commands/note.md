Capture a quick note, idea, or reminder into the inbox. No organization required — just get it down. If the note is clearly about Lindy or Andrew, also route a copy to their 1:1 running notes file. If the note is for the Get REC'D meeting, also route a copy to the Get REC'D talking points file.

## Steps

1. **Get the current date and time** (format: `YYYY-MM-DD HH:MM`).

2. **Read the user's note** from the prompt arguments. If no arguments were provided, ask: "What's on your mind?"

3. **Always append to `notes/inbox.md`**:

   ```markdown
   ## YYYY-MM-DD HH:MM
   [the note, exactly as the user said it]
   ```

   Append after the last entry (or after the `---` header divider if the file is empty). Never rewrite existing entries.

4. **Detect routing.** Check whether the note matches any of the following destinations. Multiple can apply — route to all that match. If none apply, skip routing.

   - **Lindy** (1:1 running notes): the note mentions "Lindy" or "Wood"
   - **Andrew** (1:1 running notes): the note mentions "Andrew" or "McIntosh"
   - **Get REC'D meeting** (talking points): the note contains "Get REC'D" (case-insensitive — also match `get recd`, `get rec'd`, `getrecd`, etc.)

   When routing, **also** append the note verbatim to the matching file:
   - Lindy → `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/1on1s/lindy-wood/running-notes.md`
   - Andrew → `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/1on1s/andrew-mcintosh/running-notes.md`
   - Get REC'D → `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/Get REC'D Meeting/agendas/_talking-points.md`

   Use the same format:

   ```markdown
   ## YYYY-MM-DD HH:MM
   [the note, exactly as the user said it]
   ```

   Append after the last entry (or after the `---` header divider if the file is empty). Never rewrite existing entries.

5. **Confirm** with a single short line. Examples:
   - `Saved.`
   - `Saved. Also added to Lindy's 1:1 running notes.`
   - `Saved. Also added to Get REC'D talking points.`
   - `Saved. Also added to Andrew's 1:1 running notes and Get REC'D talking points.`

   No summary, no elaboration.

## Important
- Capture the note verbatim. Don't rewrite, summarize, or clean up the user's words.
- Never delete or overwrite existing inbox or running-notes entries.
- Keep it fast. This is a capture tool, not a conversation.
- Routing is a copy, not a move — inbox always gets the entry.
- Write to `/Users/nlehrer/Desktop/life-os/` (not any worktree path) so Obsidian sees changes immediately.
