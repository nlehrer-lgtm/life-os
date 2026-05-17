# Recurring System

The "things I'd otherwise forget" engine. Source of truth in markdown, notifications via Google Calendar, prep packets via Gmail.

## What lives here

Recurring tasks split by category:

- **home.md** — air filters, smoke detectors, gutters, deep cleaning, HVAC service, water heater flush, etc.
- **vehicles.md** — tire rotation, oil changes, registration, inspections, brake checks
- **relationships.md** — date nights with Ellie, kid 1:1 time, calls to parents, mentor check-ins
- **personal.md** — haircut, dentist, doctor, eye exam, annual physical
- **gifts.md** — Valentine's Day, Christmas, Mother's/Father's Day prep (birthdays + anniversaries live in `people/*.md`, NOT here)
- **_index.md** — auto-generated master view, sorted by next-due
- **_config.md** — defaults: target calendar ID, prep packet email, default prep leads by category, cleanup nudge cadence
- **_prep-log.md** — auto-managed: tracks which prep packets have been sent (avoids duplicates for person-derived events)

Plus people-derived events: birthdays and anniversaries pulled directly from `people/*.md` files — those don't get duplicated here.

## Task format

Each task is a `##` markdown section inside a category file:

```markdown
## Task Name
- **Frequency:** every N days/weeks/months/years
- **Last done:** YYYY-MM-DD (or blank if never)
- **Next due:** YYYY-MM-DD (auto-calculated by /done)
- **Prep lead:** N days (when to send prep packet email; 0 = no prep packet)
- **Alert lead:** N days (calendar alert N days before due; 0 = morning of)
- **Vendor:** where to buy / book — [link]
- **Location:** physical location if relevant
- **Notes:** anything else (filter size, account info, last vendor used)
- **Calendar event ID:** _managed by /sync-recurring_
```

## Skills

- **`/recurring`** — show what's overdue, due today, due this week, due this month
- **`/done <task name>`** — mark a task complete, log it, schedule the next occurrence, update calendar
- **`/add-recurring`** — interactively add a new recurring task
- **`/sync-recurring`** — full sync: read people files for birthdays/anniversaries, ensure all Google Calendar events exist, fire prep packet emails for tasks in their lead window, regenerate _index.md

## How it actually fires reminders

Three surfaces:

1. **Google Calendar event** — created for every upcoming occurrence. iPhone alert fires on the day (or N days ahead per `Alert lead`). This is the always-on notification you can't miss.
2. **Gmail prep packet** — for tasks with `Prep lead > 0`, an email arrives N days ahead with context, vendor info, options, pricing, and decision support.
3. **Markdown** — `_index.md` is the at-a-glance view when you want to see everything; individual category files are the deep view.

## Status

**Scaffolded:** 2026-05-16. Folders + skills exist, no tasks populated yet. Intake interview pending — that's the next step.
