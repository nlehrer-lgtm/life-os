Mark a recurring task as complete. Updates `Last done`, recomputes `Next due`, and updates the Google Calendar event for the next occurrence on the personal calendar.

Usage: `/done <task name or fuzzy match>`

## Steps

1. **Get today's date** (format: `YYYY-MM-DD`).

2. **Read `recurring/_config.md`** to get the target calendar ID. If `_pending_`, warn the user that the calendar event update will be skipped (markdown will still be updated).

3. **Read the task name** from the prompt arguments. If no arguments, ask: "Which recurring task did you complete?"

4. **Find the task.** Glob `recurring/*.md` (excluding `_index.md`, `_config.md`, `_prep-log.md`, and `CONTEXT.md`). For each `##` heading (skipping template blocks in `<!-- -->`), fuzzy-match against the user's input. If multiple matches, ask the user to disambiguate. If no matches, list the closest tasks and ask.

5. **Update the task block:**
   - Set `**Last done:** YYYY-MM-DD` to today.
   - Parse `**Frequency:**` (e.g. "every 3 months", "every 2 weeks", "every 6 months", "yearly", "yearly on MM-DD").
   - Compute `**Next due:** YYYY-MM-DD` = today + frequency interval. For `yearly on MM-DD`, set next due to MM-DD of next year.
   - Clear `**Last prep packet sent:**` (so the next occurrence's prep packet will fire when its window opens).

6. **Update the Google Calendar event on the target personal calendar:**
   - If `**Calendar event ID:**` is set and target calendar ID is known: delete the old event from the target calendar.
   - Create a new Google Calendar event on the target calendar for the new `Next due`. All-day. Title: task name. Description: link to the recurring file + vendor/notes. Alert: per `**Alert lead:**`.
   - Write the new event ID back into the task block.
   - If target calendar ID is `_pending_`, skip the calendar step and note it in the confirmation.

7. **Confirm** with one short line:
   - `Done. ✓ [task name]. Next due [date] ([X days/weeks/months]).`
   - If calendar was skipped: `Done. ✓ [task name]. Next due [date]. Calendar update skipped — personal calendar not yet linked.`

## Important

- Never delete a task block. Only update its fields.
- If `**Frequency:**` is malformed or missing, ask the user before guessing.
- Always target the personal calendar (config), never the work primary.
- Path: write/read from `/Users/nlehrer/Desktop/life-os/` (not any worktree). After the change, commit and push.
