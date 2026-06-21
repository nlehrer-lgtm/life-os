Turn a saying from Shepherd into a copy-paste-ready Lyra (Gemini) music prompt — simple, catchy, kid-friendly lyrics with your exact chorus as the hook and ultra-short verses, wrapped in a style directive that locks the genre, voice, reference artist, and length. Asks for anything missing before drafting. Chat-only — writes no files.

Usage: `/shep-song [saying or any details you already have]`

## What this makes

One single prompt block you paste into Lyra's prompt box. It contains two things woven together:

1. A **style/production directive** — genre (+ reference artist/song), voice type, tempo/feel, genre-signature instruments, mood, "kid-friendly but professionally produced," and hard guardrails on length and structure.
2. The **full lyrics** — your exact chorus repeated as the hook, plus 1–2 tiny verses, with section tags.

Writing the actual lyrics is the whole point: it's the only reliable way to keep verses short, keep the words simple, and guarantee the chorus is exactly your phrase. Lyra performs what's written instead of inventing a long, boring song.

## Inputs to gather

**Required — do not draft until you have all four. Interrogate until you're 99% sure:**

1. **Chorus phrase** — the exact words Shepherd says (or the exact chorus line the user wants). This becomes the hook, *verbatim*.
2. **Genre** — the musical style. Always ask if there's an artist or song it should sound like ("Anyone or any song you want it to feel like?"). A reference makes the sound far better.
3. **Voice** — male, female, choir, kids' choir, duet, group of guys, solo + backing kids, etc.
4. **What it's about / the vibe** — enough to write 1–2 tiny verses: when he says it, what it's about, and the mood.

**Optional — use the defaults, but grab them if the user offers:**

- **Title** — default: the saying, Title Cased (e.g., "Yellow Bus").
- **Tone/mood** — silly, sweet, hyped-up, gentle, triumphant.
- **Tempo / energy** — default: upbeat and bouncy.
- **Must-include images, words, or lines.**
- **Length** — default: very short, under ~90 seconds. Honor "even shorter" / "a little longer."
- **How the phrase is used in the chorus** — default: the phrase IS the repeated hook. If it's unclear whether the chorus should be the phrase alone (repeated) or a short line *built around* the phrase, ask. Either way the exact phrase must appear unchanged.

## Steps

1. **Parse the prompt args** and map whatever the user gave to the inputs above.

2. **Ask for everything missing in ONE batch** — don't dribble questions out one at a time. You are 99% sure only when you know: the exact chorus words, the genre (ideally with a reference), the voice, and enough about the subject to write verses. If the chorus phrasing is ambiguous, ask whether the chorus is the phrase repeated or a short hook built around it.

3. **Draft the lyrics** following the brevity rules:
   - **Chorus = the exact phrase, verbatim**, as the hook. Repeat it (typically 2–4 times per chorus).
   - **1–2 verses max**, each just **2 short lines**. Simple, concrete, toddler-friendly words. Singable. Light, natural rhyme — never force it.
   - **Structure:** tiny intro → Verse 1 → Chorus → (optional Verse 2 → Chorus) → short outro. Get to the chorus within the first few seconds.
   - **No bridge, no third verse, no long instrumental breaks.** Brevity is the feature.

4. **Build the style/production directive.** Include, in plain prose:
   - Genre, and if a reference was given, "in the style of [artist/song]" — but also translate it into **descriptive sonic traits** (tempo/feel, 2–4 signature instruments, production vibe, vocal character). Describe the qualities; never tell the tool to "copy/clone [artist] exactly."
   - The voice type.
   - Mood/energy.
   - "Catchy, professionally produced, clean and modern, simple enough for a toddler to sing along."
   - **Guardrails:** target length (e.g., "keep the whole song under ~90 seconds"), "get to the chorus fast and repeat the hook," "these are the complete lyrics — sing them as written, do not add extra verses, bridges, or long instrumental sections," and "the chorus words must be exactly '[phrase]'."

5. **Assemble ONE single prompt block** (Lyra uses one box): the style/production directive paragraph first, then the tagged lyrics. See the template.

6. **Output in chat** — no files:
   - A one-line recap: `Title • genre • voice • ~length • chorus: "[phrase]"`
   - The full prompt inside a fenced code block so it's one-click copyable.

7. **Offer revisions** in one line: "Want it shorter, a different voice, or another genre? Say the word and I'll regenerate."

## Output template (mirror this shape)

````
[One paragraph: catchy, professionally produced {genre} song for little kids — {sonic traits: tempo/feel, signature instruments, production vibe}. {Voice} lead{, backing details}. In the style of {reference}, {vocal character}. Clean, modern, easy for a toddler to sing along. Keep the whole song under ~{length}: short intro, get to the chorus fast, repeat the hook. These are the complete lyrics — sing them as written; do not add extra verses, bridges, or long instrumental breaks. The chorus words must be exactly "{phrase}".]

[Intro – brief]

[Verse 1]
{two short, simple lines}

[Chorus]
{phrase}, {phrase},
{short hook line ending on the phrase}

[Verse 2]   (optional)
{two short, simple lines}

[Chorus]
{phrase}, {phrase},
{short hook line ending on the phrase}

[Outro – brief]
{phrase}!
````

## Worked example

Input: *saying "yellow bus" → Latin pop, female voice, he loves yellow school buses.*

````
Catchy, professionally produced Latin pop song for little kids — bright and sunny, ~100 BPM reggaeton-tinged groove, warm acoustic guitar, light brass stabs, shaker and congas, big sing-along hook. Female lead vocal, joyful and playful, in the style of modern bright Latin pop (clean and kid-safe — not explicit). Clean, polished, and modern, but simple enough for a toddler to sing along. Keep the whole song under 90 seconds: short intro, get to the chorus fast, and repeat the hook. These are the complete lyrics — sing them as written; do not add extra verses, bridges, or long instrumental breaks. The chorus words must be exactly "yellow bus".

[Intro – 2 bars, guitar + shaker]

[Verse 1]
Down the street, here it comes,
Big and bright in the morning sun.

[Chorus]
Yellow bus, yellow bus,
Come and ride along with us!
Yellow bus, yellow bus!

[Verse 2]
Wheels go round, the horn goes too,
Wave your hand, it waves at you.

[Chorus]
Yellow bus, yellow bus,
Come and ride along with us!
Yellow bus, yellow bus!

[Outro]
Yellow bus... beep beep!
````

## Important

- **Chat-only. Write no files.** Output the prompt and stop.
- **The chorus is the user's exact words, verbatim.** Never reword, expand, or "improve" the phrase itself.
- **Verses are tiny** — 2 lines, simple words, fast to the chorus. The point is to NOT give the AI room to make it long and boring.
- **Default to very short** (~60–90 sec). Always state the length cap and the exact structure inside the prompt so Lyra can't sprawl.
- **One single prompt block** — Lyra uses one box. Style directive first, then tagged lyrics. Don't split into separate sections.
- **Calibrate vocabulary to Shepherd** (toddler/preschool) unless told otherwise.
- **Artist references:** describe the sound and say "in the style of." Never instruct the tool to copy an artist exactly.
- **If you don't have the exact chorus, genre, voice, and subject, ask before drafting.** Don't guess.
