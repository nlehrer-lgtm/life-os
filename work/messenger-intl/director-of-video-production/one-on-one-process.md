# The Biweekly 1:1 Process

A complete loop, end to end. Two reports: **Lindy Wood** (Tue 2:30pm CT, biweekly) and **Andrew McIntosh** (Thu 1:30pm CT, biweekly). Tools used: Claude Code skills, Asana, Granola.

Grounded in *Developing Messengers — The Weekly 1:1* (saved in this folder). Core philosophy:

> **The team member owns and drives the agenda.** They bring priorities, progress, challenges, feedback.
>
> **The leader sets the context.** Team and department objectives, vision and direction, current priorities, how the team member's role aligns with their giftings and the mission.
>
> *"The goal is development, not direction. Ask more, tell less."*

---

## The full loop

### Phase 1 — Between meetings (the 2 weeks)
Whenever you notice something about Lindy or Andrew, capture it with `/note`:

> `/note for Lindy: she nailed the AACC pilot edit pacing today`

The `/note` skill writes to `notes/inbox.md` *and* (because it detected "Lindy") to `work/messenger-intl/video-team/1on1s/lindy-wood/running-notes.md`. Same for Andrew.

This fixes the recency-bias problem — observations get captured the moment they happen, not dredged from the last transcript.

### Phase 2 — Their prep (3 weekdays before the 1:1)
They have a recurring Asana task in their growth plan project: **"1:1 Agenda — Fill out before our 1:1"**.

- **Lindy's task** is due Fridays at 2:30pm CT (3 weekdays before Tue 2:30pm).
- **Andrew's task** is due Mondays at 1:30pm CT (3 weekdays before Thu 1:30pm).

The template prompts them for: top 3 priorities, progress since last 1:1, biggest challenge, questions they want to discuss, feedback / what they need from you, wins.

They fill it out and complete the task. The next biweekly instance auto-creates (recurrence is configured in the Asana UI).

### Phase 3 — Your prep (2 days before the 1:1)
You run `/1on1-prep Lindy` (or Andrew).

The skill pulls:
- Their filled-out Asana agenda
- Your mid-week running notes (`running-notes.md`)
- Open action items from the last cycle (your + their My Tasks)
- The most recent meeting summary (from the last debrief)
- Their growth plan milestones

It writes a prep doc with: how they're doing, their agenda (verbatim), your mid-week observations, open action items, a "Context to Share" section for you to fill in (vision/priorities/role alignment), growth plan compass check, questions to leave space for, and a quick diagnostics self-check from the Messenger guide.

### Phase 4 — Day-of glance sheet (morning of the 1:1)
You run `/1on1-final Lindy`. It reads the prep doc, asks you what you want to make sure lands, and produces a tight one-page glance sheet for the meeting.

### Phase 5 — The 1:1 itself
- **They drive the agenda.**
- **You bring context** — vision, priorities, role alignment, news from leadership.
- People-first: care → clarity → direction.
- Ask more, tell less.
- End with clear action items, at minimum one per person.
- Granola records the transcript.

### Phase 6 — Debrief (1–3 days after the 1:1)
An Asana recurring biweekly reminder in your **Leadership OS – 2026** project tells you to do this:

- **"Run /1on1-debrief Lindy"** — due Wed (day after Tue 1:1)
- **"Run /1on1-debrief Andrew"** — due Fri (day after Thu 1:1)

You run `/1on1-debrief Lindy` (or Andrew). The skill:
- Pulls the most recent Granola transcript
- Extracts action items, topics, decisions, wins, parking lot items, connection moments
- Saves a summary to `1on1-summary-YYYY-MM-DD.md` in their folder (filename uses **meeting date**, not today)
- Archives the running notes into that summary and resets `running-notes.md`
- **Surfaces the full summary inline in chat** — action items are numbered (`N1, N2...` for yours, `L1, L2...` or `A1, A2...` for theirs)
- Asks: *"Which of these should I schedule as Asana tasks?"*

You reply with the numbers you want (or "all" or "none"), and you can edit, rephrase, or add items in your reply. Claude creates only the items you select:
- **Yours** → assigned to you, no project → land in your My Tasks
- **Theirs** → assigned to them, no project, you as follower → land in their My Tasks

### Phase 7 — Cycle repeats
Two weeks later, the recurring agenda task is due again. The loop continues.

---

## Skill map

| When | Tool | Where output lives |
|---|---|---|
| Between meetings | `/note` | `notes/inbox.md` + their `running-notes.md` (if Lindy or Andrew named) |
| 3 weekdays before | Asana agenda task they fill out | their growth plan project |
| 2 days before | `/1on1-prep [Name]` | `work/.../1on1s/[person]/1on1-prep-YYYY-MM-DD.md` |
| Morning of | `/1on1-final [Name]` | `work/.../1on1s/[person]/1on1-final-YYYY-MM-DD.md` |
| 1–3 days after | `/1on1-debrief [Name]` (Asana reminder fires) | Summary file + inline action items; tasks created on request |

## Project / folder map

- **Lindy's growth plan (Asana):** `Lindy W - Growth Plan` — recurring agenda task lives here
- **Andrew's growth plan (Asana):** `Andrew M - Growth Plan` — recurring agenda task lives here
- **Your Asana hub:** `Leadership OS – 2026` — biweekly debrief reminders live here
- **Action items (Asana):** `My Tasks` for whoever owns them; no project attachment
- **Life OS markdown:** `work/messenger-intl/video-team/1on1s/{lindy-wood,andrew-mcintosh}/` — prep, final, summary, running notes

## Why this works

- **No more recency bias.** Mid-week notes are captured the moment they happen, not dredged from the last transcript.
- **They own the agenda.** Their Asana task forces them to come prepared with their priorities, not yours.
- **Action items are real.** Every commitment you select becomes a task in someone's My Tasks with a due date. The "we keep talking about the same things" problem dies here.
- **You decide what's worth tasking.** The debrief surfaces a draft; you triage in chat; only what matters gets scheduled.
- **Philosophy enforced.** The Developing Messengers framing — leader brings context, team member drives agenda, people-first, ask more / tell less — is baked into the prep skill itself.

## Quick reference — what to say to Claude

- **Capture a mid-week note:** `/note for Lindy: <observation>` or `/note <thing about Andrew>`
- **Two days before 1:1:** `/1on1-prep Lindy` (or `Andrew`)
- **Morning of 1:1:** `/1on1-final Lindy`
- **1–3 days after 1:1:** `/1on1-debrief Lindy` — then reply with the action item numbers you want scheduled (e.g., `N1, L2, L3` or `all` or `none`)
