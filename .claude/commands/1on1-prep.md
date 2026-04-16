Prepare a people-first 1:1 briefing for Andrew McIntosh or Lindy Wood, grounded in their Asana growth plan milestones and the latest Granola transcripts.

## Trigger
Use this command whenever Nathaniel asks to "prepare a 1:1", "prep for my 1:1", or "get ready for a one-on-one" with Andrew or Lindy.

## Philosophy (from One-on-Ones & Growth Plans doc)
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

2. **Pull the last 2 Granola transcripts** from their folder in parallel:
   - Use `list_meetings` with the person's Granola folder ID (use a wide custom range like 6 months to catch all notes)
   - Use `query_granola_meetings` with their meeting IDs to extract: topics discussed, action items (Nathaniel's and theirs), emotional/personal state, anything unresolved

3. **Pull their Asana growth plan milestones** using `get_tasks` with their Growth Plan project ID. For each milestone, note: name, description, completion status, and any notes.

4. **Write the briefing** — output directly, do not save to file.

---

## Output Format

```
# 1:1 Prep — [Name] — [Today's Date]
_Last 1:1: [date] | Previous: [date if available]_

---

## 1. How Are They Doing?
[1-2 warm, human check-in questions based on what you know about them right now — their energy, recent workload, anything personal that's come up in past meetings. Not generic. Make it feel like you've been paying attention.]

---

## 2. Follow-Up from Last Time
**Your open items:**
- [ ] [Action Nathaniel committed to]

**Their open items:**
- [ ] [Action they committed to]

[Include source citations from Granola]

---

## 3. Growth Plan — Milestone Check-In
[Go through each milestone one by one. For each one:]

### [Milestone Name]
> [Brief description of what this milestone is about — 1 sentence]

**Where things stand:** [What the Granola transcripts tell you about progress here. If nothing, say so honestly.]
**Check-in angle:** [A warm, directional question to ask — not "did you do X" but "how does this area feel right now?"]

---

## 4. Things to Affirm
[Specific, real wins to name from the transcripts. Not generic praise. Make it land.]

---

## 5. Open Projects to Check On
[Any active work items or decisions surfaced in recent transcripts that need a status or decision — separate from growth milestones.]

---

## 6. Questions to Leave Space For
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
