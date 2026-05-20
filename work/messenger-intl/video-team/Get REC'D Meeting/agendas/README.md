# Get REC'D Meeting Agendas

This folder holds the rolling talking points and weekly prep docs for the **[[Get REC'D|[[Get REC'D]] Meeting]]** (Tuesdays, 8:00 AM).

## Workflow

```
  /note  ──►  _talking-points.md  ──►  /get-recd-prep  ──►  YYYY-MM-DD.md
  (week)      (rolling list)            (Mon or Tue AM)      (prep doc)
```

### During the week

When Nathaniel runs `/note` and the note mentions **"[[Get REC'D]]"**, the `/note` skill routes a copy of that note into `_talking-points.md`. Items accumulate there through the week.

### Before the meeting

When Nathaniel runs `/get-recd-prep`, the skill:

1. Compiles everything in `_talking-points.md` into a clean line-item prep doc.
2. Saves the prep doc to `YYYY-MM-DD.md` (date of the upcoming Tuesday).
3. **Clears `_talking-points.md`** so the next week starts fresh.

The prep doc covers **Section 3 of the meeting** (Nathaniel's team-wide updates) — the part he leads. It does not prep the rotating icebreaker or [[Lindy Wood|Lindy]]'s calendar section.

## File naming

- `_talking-points.md` — the single rolling capture file (always present, sorted to top of folder by the underscore prefix).
- `YYYY-MM-DD.md` — one prep doc per meeting date, e.g. `2026-05-19.md`.

See `../CONTEXT.md` for the full meeting format and standards.
