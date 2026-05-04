Prepare a people-first 1:1 briefing for Andrew McIntosh or Lindy Wood, grounded in their Asana growth plan milestones and the latest Granola transcripts.

## Trigger
Use this command whenever Nathaniel asks to "prepare a 1:1", "prep for my 1:1", or "get ready for a one-on-one" with Andrew or Lindy.

## Philosophy
One-on-ones are **people-first**, not performance reviews. In priority order, they exist to:
1. Check in on how someone is actually doing — mentally, emotionally, and with workload
2. Give them space to talk — questions, concerns, ideas, frustrations
3. Provide direction and context — updates or clarity they need from Nathaniel
4. Discuss long-term growth — who they're becoming, not just what they're producing

Growth Plans are a **compass, not a checklist**. The guiding question: *"If we lead this person well for a year, how will they be different?"* Go through milestones one by one — not as a task audit, but as a directional check-in.

If ever unsure: **care → clarity → direction.**

## Known People & Resources

### Andrew McIntosh
- **Granola folder ID:** `922bfeb5-829e-4842-b7a0-db436e289aaf`
- **Asana Growth Plan ID:** `1211631456933613`
- **Growth Milestones:**
  1. Create fully organized VFX and VP asset library
  2. Initiate ownership for VFX/VP projects
  3. Expand virtual production system
  4. Master VPD communications/cadence/feedback loop
  5. Embrace and grow spiritual/missional voice at the TN office

### Lindy Wood
- **Granola folder ID:** `5184fb61-141f-42e4-a52f-263f39c9ab6b`
- **Asana Growth Plan ID:** `1212886997625190`
- **Growth Milestones:**
  1. Cultivate Clear & Compelling Communication
  2. Establish and Own a Ministry-Wide Video Quality Control System
  3. Lead, Develop, and Resource the Editing Team (Josh, Annie, future hires)

## Steps

1. **Identify who the 1:1 is with** — Andrew or Lindy (from the user's prompt).

2. **Pull the last 3 Granola transcripts** using their folder ID:
   - Call `list_meetings` with the person's Granola folder ID
   - From the returned list, identify the 3 most recent meetings that match:
     - **Lindy**: titles containing "1:1 | Lindy" OR "Pre boxing out the week"
     - **Andrew**: titles containing "1:1 | Andrew" OR "Pre boxing out the week"
   - Call `get_meeting_transcript` for each of those 3 meetings
   - **Fallback only:** if `list_meetings` returns nothing or the folder appears empty, use `query_granola_meetings` with the person's name as a search term

3. **Cross-compare the 3 transcripts before writing anything:**
   - Extract all action items from each transcript, noting who owns them and which meeting they came from
   - Mark items as resolved if a later transcript confirms they were completed or are no longer relevant
   - Flag items that appear unresolved across 2 or more meetings — these are recurring/stuck and need explicit attention (mark with ⚠️)
   - Drop one-time topics that were clearly resolved with no lingering thread
   - Note the date range the 3 transcripts cover

4. **Pull their Asana growth plan milestones** using `get_tasks` with their Growth Plan project ID. For each milestone, note: name, description, completion status, and any notes.

5. **Write the briefing** and save it to file:
   - For **Lindy**: save to `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/1on1s/lindy-wood/1on1-prep-[YYYY-MM-DD].md`
   - For **Andrew**: save to `/Users/nlehrer/Desktop/life-os/work/messenger-intl/video-team/1on1s/andrew-mcintosh/1on1-prep-[YYYY-MM-DD].md`
   - Also output the briefing directly in the conversation so Nathaniel sees it immediately.

---

## Output Format

```
# 1:1 Prep — [Name] — [Today's Date]
_Covers: [earliest transcript date] → [most recent transcript date]_

---

## 1. How Are They Doing?
[1-2 warm, specific check-in questions based on what you know right now — their energy, recent workload, anything personal that's come up in recent meetings. Not generic. Make it feel like you've been paying attention.]

---

## 2. Follow-Up + Wins
**Your open items:**
- [ ] [Action Nathaniel committed to — with source transcript date]

**Their open items:**
- [ ] [Action they committed to — with source transcript date]
- ⚠️ [Flag any item open across 2+ meetings with a note that it's been recurring]

**Wins to name:**
- [Specific, real win from transcripts — not generic praise. Make it land.]

[Include Granola citation links so Nathaniel can click through to source notes]

---

## 3. Growth Plan — Milestone Check-In
[Go through each milestone one by one]

### [Milestone Name]
> [Brief description of what this milestone is about — 1 sentence]

**Where things stand:** [What the 3 transcripts tell you about progress here. If nothing, say so honestly.]
**Check-in angle:** [A warm, directional question to ask — not "did you do X" but "how does this area feel right now?"]

**Other Active Work:**
- [Any open projects or decisions surfaced in transcripts that aren't tied to a specific milestone — include status and whether a decision is needed]

---

## 4. Questions to Leave Space For
- What's energizing you most right now?
- Anything feeling stuck or unclear that I can help unblock?
- What do you need from me that you haven't asked for yet?
[+ 1-2 person-specific questions based on what's come up recently]
```

---

## Important
- Never fabricate. If a transcript doesn't speak to a milestone, say so and ask the question anyway.
- Keep milestone check-ins directional, not interrogative. This is a compass check, not an audit.
- The "How Are They Doing?" section is the most important part — don't skip it or make it generic.
- Include Granola citation links so Nathaniel can click through to the source notes.
- Keep bullets scannable. No long paragraphs.
- The cross-comparison step is critical — surface what's actually current, not just the raw dump from each transcript.
