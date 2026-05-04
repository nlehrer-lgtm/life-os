Morning brief. Review last night's digest, check the weather and calendar, and surface what needs attention today.

## Steps

1. **Get today's date** (day of week, month, day, year). Determine if it's a weekday or weekend.

2. **Review last night's digest.** Read `digests/YYYY-MM-DD.md` for yesterday. Surface:
   - Any open loops that carried forward
   - Any decisions or context worth remembering today
   - Anything that was saved last night that looks wrong or needs a correction

   If yesterday's digest doesn't exist, note it and skip this section.

3. **Pull today's data.** Run in parallel where possible.

   - **Weather**: Detect timezone via `readlink /etc/localtime | sed 's|.*/zoneinfo/||'`. Fetch from Open-Meteo API using Spring Hill, TN coordinates (lat=35.7512, lon=-86.9300): `curl -s "https://api.open-meteo.com/v1/forecast?latitude=35.7512&longitude=-86.9300&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&temperature_unit=fahrenheit&timezone=America/Chicago&forecast_days=1"`. Weather codes: 0=clear, 1-3=partly cloudy/overcast, 45-48=fog, 51-55=drizzle, 61-65=rain, 71-75=snow, 80-82=showers, 95=thunderstorm.
   - **Google Calendar**: Fetch all of today's events from all configured calendars. Merge and deduplicate.
   - **Asana**: Use `get_my_tasks` to pull Nathaniel's open tasks. Note anything due today or overdue.
   - **Reminders**: Read `reminders/reminders.md`. Only include unchecked items.
   - **Active project STATUS files**: Read `STATUS.md` for any active projects (look in `work/` for STATUS.md files). Note open decisions and blockers.

   If a source isn't connected, skip it gracefully.

4. **Identify pressing priorities.** Before writing, scan everything and ask: what genuinely can't wait today? Flag anything with a hard deadline, a blocked teammate waiting on Nathaniel, or an open decision that needs to close soon.

5. **Write the briefing.** Use bold text for section labels, not # headings. Keep it tight and scannable. No em dashes or en dashes.

### Weekday format:

```
**[Day of week], [Month Day, Year]**
[One sentence weather summary. High/low and conditions. Keep it conversational — "Upper 70s, sunny all day" not a weather report.]

**Last Night's Digest**
[2-3 bullet points from yesterday's digest worth knowing this morning — open loops, key context, anything that looks off or needs a correction. Omit if digest is missing or there's nothing notable.]

**Today's Schedule**
- [Time]: [Event], [brief context if notable]
- List all events chronologically
- Call out anything that stands out: first meetings with someone, hard deadlines, back-to-backs

**Pressing Priorities**
[Only include if something genuinely can't wait. 1-3 items max. These are things with real consequences if they slip today.]
1. [Item — why it's pressing]

**Today's Tasks**
[Pull from Asana, open loops, and reminders. These are the things worth working on today — not exhaustive, just the right focus.]
- [ ] [Task — brief context]

**Open Projects**
[List active projects with their current status pulled from STATUS.md files. One line per project.]
- **[Project name]** — [current phase] / [most pressing open item]
```

### Weekend format:

```
**[Day of week], [Month Day, Year]**
[Weather summary.]

**This weekend**
[Personal and family events only. Skip all work items entirely.]
```

6. **Omit empty sections.** If there's nothing for a section, leave it out.

7. **Show the briefing.** Don't save to a file.

8. **Ask**: "Anything you want to add or change before you dive in?"

## Important

- **Never fabricate anything.** Every item must come from a real source.
- **Weather is hardcoded to Spring Hill, TN.** Don't ask for location.
- **Weekends are personal only.** No work items, tasks, or projects on weekends.
- **Pressing Priorities is not a task list.** Only things with real urgency go there. If nothing is urgent, omit the section.
- **No em dashes or en dashes.** Use commas, periods, or colons.
- **Keep it short enough to read in 60 seconds.** Dense is good. Exhaustive is not.
