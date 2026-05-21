Run a leadership reflection interview with Nathaniel and append the entry to the rolling journal at `work/messenger-intl/leadership-reflections/leadership-reflections.md`.

## Where entries live

All reflections are kept in a single rolling markdown file:

`/Users/nlehrer/Desktop/life-os/work/messenger-intl/leadership-reflections/leadership-reflections.md`

Newest entry sits at the top of the file (right below the `<!-- INSERT NEW ENTRIES BELOW THIS LINE -->` marker). Older entries are below.

## Entry format

Each entry is an H2 section. Use this exact structure:

```markdown
## YYYY-MM-DD — [Month] [Day]th/st/nd/rd

**Did I lead people more than tasks this week?**
[answer]

**One leadership win (what worked?)**
[answer]

**One leadership miss (what I'd change)**
[answer]

### People

**Who did I intentionally invest in?**
[answer]

**Who needs my attention or clarity next week?**
[answer]

### Focus & Energy

**What drained me?**
[answer]

**What gave me energy?**
[answer]

### Look Ahead

**What is the one leadership priority next week?**
[answer]

**One behavior I will start/stop/adjust next week**
[answer]

### Reset
- [ ] Clean up Asana (close, reschedule, reprioritize)
- [ ] Schedule or plan the key leadership conversation

**Gut check:** [Yes / No / Mixed + short reason]

---
```

The trailing `---` is the divider between entries. Always include it.

## Steps

1. **Confirm today's date.** Use the current date to determine the entry label. Format the H2 heading as `## YYYY-MM-DD — [Month] [Day]th/st/nd/rd` (e.g. `## 2026-05-21 — May 21st`). Tell Nathaniel what period you're logging.

2. **Interview Nathaniel.** Ask each question below ONE AT A TIME in a conversational way. Wait for his answer before moving to the next. Don't rush — let him think. Reflect back briefly between questions to show you heard him; don't editorialize.

   Ask these questions in order:
   - "Did you lead people more than tasks this week?"
   - "What was one leadership win — what worked?"
   - "What was one leadership miss — what would you change?"
   - "Who did you intentionally invest in this week?"
   - "Who needs your attention or clarity next week?"
   - "What drained you this week?"
   - "What gave you energy this week?"
   - "What is the one leadership priority for next week?"
   - "What's one behavior you'll start, stop, or adjust next week?"
   - "On the gut check — was this a good week of leadership? (Yes / No / Mixed)"

3. **Format the entry.** Plug Nathaniel's answers into the template above exactly as he said them. Wrap any named entities in Obsidian wiki-links (see "Wiki-Linking" below). Skipped questions get `_(not recorded)_`.

4. **Insert the entry at the top of the file.**
   - Read the current file.
   - Use the Edit tool to insert the new entry block immediately after the line `<!-- INSERT NEW ENTRIES BELOW THIS LINE -->`. Leave one blank line between that marker and the new H2.
   - The previously-newest entry should now be directly below the new entry's trailing `---` divider.

5. **Confirm with Nathaniel.** Tell him the entry has been saved (give the file path) and summarize what he wrote in 3–5 short bullets — wins, who he invested in, priority for next week, behavior shift, gut check.

## Rules

- Never fabricate or embellish Nathaniel's answers — write exactly what he said.
- If he skips a question, put `_(not recorded)_` rather than guessing.
- The "Reset" section is a checklist reminder, not a question — always include it verbatim.
- Don't open a browser, don't touch the old Google Doc — this skill is markdown-only now. (Pre-2026-05-21 entries were migrated from the Google Doc into the rolling file. If anything looks off in the migrated entries, the source of truth is the markdown file.)

## Wiki-Linking

Wrap named entities in Obsidian `[[wiki-links]]` so the second-brain graph builds automatically.

- **People** (anyone with a file in `people/`): `[[Andrew]]`, `[[Lindy]]`, `[[Arden]]`, `[[Josh]]`, `[[LeVann]]`, etc. First names work via aliases.
- **Projects & meetings**: `[[Messenger Cup]]`, `[[Get REC'D]]`, `[[Discipleship Team]]`, `[[Podcast Machine]]`, `[[Home Base]]`, `[[Video Team]]`, `[[Job Site Social]]`.
- **Organizations**: `[[Messenger International]]`.
- **Life pillars** (when relevant): `[[Faith]]`, `[[Marriage]]`, `[[Fatherhood]]`, `[[Relationships]]`, `[[Joy & Rest]]`.

Don't link: common nouns, times/dates, generic actions, yourself ("Nathaniel"/"I"), or text inside YAML frontmatter or code blocks.

If Nathaniel mentions someone or something that doesn't have an anchor file yet, still wrap it in `[[brackets]]` — Obsidian will flag it as an unresolved link, which is a useful signal.

Full convention: see "Wiki-Linking Convention" in `CLAUDE.md`.
