Mark a recurring task as complete. Updates `Last done`, recomputes `Next due`, and updates the Google Calendar event for the next occurrence.

Usage: `/done <task name or fuzzy match>`

## Steps

1. **Get today's date** (format: `YYYY-MM-DD`).

2. **Read the task name** from the prompt arguments. If no arguments, ask: "Which recurring task did you complete?"

3. **Find the task.** Glob `recurring/*.md` (excluding `_index.md` and `CONTEXT.md`). For each `##` heading, fuzzy-match against the user's input. If multiple matches, ask the user to disambiguate. If no matches, list the tasks that came closest and ask.

4. **Update the task block:**
   - Set `**Last done:** YYYY-MM-DD` to today.
   - Parse `**Frequency:**` (e.g. "every 3 months", "every 2 weeks", "every 6 months", "yearly").
   - Compute `**Next due:** YYYY-MM-DD` = today + frequency interval.

5. **Update the Google Calendar event:**
   - If `**Calendar event ID:**` is set: delete the old event (it was for the previous next-due).
   - Create a new Google Calendar event for the new `Next due` date. All-day event. Title: task name. Description: link to the recurring file and any vendor/notes. Alert: per `**Alert lead:**` (e.g. alert lead 0 = morning of, alert lead 7 = 7 days before).
   - Write the new event ID back into the task block.

6. **Confirm** with one short line:
   - `Done. ✓ [task name]. Next due [date] ([X days/weeks/months]).`

## Important

- Never delete a task block. Only update its fields.
- If `**Frequency:**` is malformed or missing, ask the user before guessing.
- If the Google Calendar MCP fails or isn't available, still update the markdown — note that the calendar event wasn't created.
- Path: write/read from `/Users/nlehrer/Desktop/life-os/` (not any worktree). After the change, commit and push.
