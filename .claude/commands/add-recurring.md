Interactively add a new recurring task. Asks the minimum questions needed, writes to the right category file, and creates the first Google Calendar event.

Usage: `/add-recurring [optional task name]`

## Steps

1. **Get today's date.**

2. **If the prompt has a task name argument, use it.** Otherwise ask: "What's the task?"

3. **Ask for category** (one of: home, vehicles, relationships, personal, gifts). If you can infer it from the task name with high confidence, propose it and ask for confirmation rather than asking blind.

4. **Ask for frequency.** Accept natural language ("every 3 months", "twice a year", "weekly", "yearly on June 4"). Parse into a clean form. For date-anchored yearly events (Valentine's, anniversaries), use `yearly on MM-DD`.

5. **Ask for last-done date** (or "never"). If "never," `Next due` = today + frequency interval starting from today. If a date is given, `Next due` = that date + frequency.

6. **Ask for prep lead** (days before due to send a prep packet email; 0 = no prep packet). Default: 0 for simple chores, 14 for date-anchored gift events, 7 for things that need a vendor decision.

7. **Ask for alert lead** (days before due to fire the calendar alert; 0 = morning of). Default: 0.

8. **Ask for vendor + location + notes** in one combined question: "Anything to remember about it? (vendor, location, notes — or skip)." Parse freely.

9. **Append a new task block** to the correct `recurring/<category>.md` file, after the `---` divider. Use the standard format from `recurring/CONTEXT.md`.

10. **Create the first Google Calendar event** for `Next due`. All-day. Title = task name. Description = link to the recurring file + any notes. Alert per `Alert lead`. Write the event ID back into the task block.

11. **Confirm** with one short line:
    - `Added. ✓ [task name] — every [frequency]. First due [date]. Calendar event created.`

## Important

- Be conversational and brief. Don't overload the user with questions — combine where natural.
- If the user gives a one-line description with everything in it ("rotate tires every 6 months, last done Jan 15, prep 2 weeks ahead, Discount Tire Spring Hill"), parse it all in one shot and just confirm.
- Path: write/read from `/Users/nlehrer/Desktop/life-os/`. Commit and push after.
