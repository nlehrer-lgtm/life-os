Interactively add a new recurring task. Asks the minimum questions needed, writes to the right category file, and creates the first Google Calendar event on the personal calendar.

Usage: `/add-recurring [optional task description]`

## Steps

1. **Get today's date.**

2. **Read `recurring/_config.md`** for target calendar ID and default prep leads.

3. **If the prompt has a task description, parse what you can.** If it's a one-liner with everything ("rotate tires every 6 months, last done Jan 15, Discount Tire Spring Hill"), extract task name, frequency, last-done, vendor in one pass and just confirm with the user instead of asking again.

4. **Determine task name.** Ask if not provided.

5. **Determine category** (one of: home, vehicles, relationships, personal, gifts). If you can infer it from the task name with high confidence, propose it and ask for confirmation rather than asking blind.

6. **Ask for frequency.** Accept natural language ("every 3 months", "twice a year", "weekly", "yearly on June 4"). Parse into a clean form. For date-anchored yearly events (Valentine's, anniversaries), use `yearly on MM-DD`.

7. **Ask for last-done date** (or "never"). If "never," `Next due` = today + frequency interval. If a date is given, `Next due` = that date + frequency. For `yearly on MM-DD`, `Next due` = next MM-DD.

8. **Default prep lead from config** based on category and task name match. Don't ask — just apply the default and tell the user. (E.g. "Defaulting prep lead to 14 days based on category. Want to change it?")

9. **Default alert lead = 0** (morning of). Don't ask unless the user mentioned it.

10. **Ask for vendor + location + notes** in one combined question: "Anything to remember about it? (vendor, location, filter size, etc. — or skip)." Parse freely.

11. **Append the task block** to the correct `recurring/<category>.md` file, after the `---` divider. Use the standard format from `recurring/CONTEXT.md`.

12. **Create the first Google Calendar event** on the target personal calendar for `Next due`:
    - Calendar: target calendar ID from config
    - All-day. Title = task name. Description = link to the recurring file + any notes/vendor. Alert per `Alert lead`.
    - Write event ID back into the task block.
    - If target calendar ID is `_pending_`, skip the calendar step and note it in confirmation.

13. **Confirm** with one short line:
    - `Added. ✓ [task name] — every [frequency]. First due [date]. Calendar event created.`

## Important

- Be conversational and brief. Don't pepper with questions — combine where natural and apply defaults aggressively.
- If the user gives a one-line description with everything in it, parse it all in one shot and just confirm.
- Always target the personal calendar (config), never the work primary.
- Path: write/read from `/Users/nlehrer/Desktop/life-os/`. Commit and push after.
