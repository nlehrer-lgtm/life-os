Show what recurring tasks are overdue, due today, or coming up soon. Read-only — doesn't modify anything.

## Steps

1. **Get today's date.**

2. **Read all task files** in parallel:
   - `recurring/home.md`
   - `recurring/vehicles.md`
   - `recurring/relationships.md`
   - `recurring/personal.md`
   - `recurring/gifts.md`
   - All `people/*.md` (for `**Birthday:** YYYY-MM-DD` and `**Anniversary:** YYYY-MM-DD` fields)

3. **Parse every task.** Each `##` heading inside a category file is a task. Extract `Next due`. Skip anything inside `<!-- -->` comment blocks (those are templates, not real tasks).

4. **For birthdays/anniversaries from people files:** compute the next occurrence (this year or next, whichever is upcoming). The "task name" is e.g. "Ellie's birthday" or "Anniversary with Ellie." Category = `gifts`.

5. **Bucket by urgency:**
   - **Overdue** — `Next due` is in the past
   - **This week** — within 7 days
   - **This month** — within 30 days
   - **Next 90 days** — within 90 days

6. **Display** in a clean grouped list. For each task show: name, days until due (or "X days overdue"), category, and prep-lead status (e.g. "📧 prep packet due in 3 days"). Sort within each bucket by next-due ascending.

7. **If nothing is due in the next 90 days**, say so and stop.

## Important

- Read-only. Don't modify any files.
- Skip template examples inside `<!-- -->` comment blocks.
- Path: write/read from `/Users/nlehrer/Desktop/life-os/` (not any worktree).
