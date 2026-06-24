Turn a saying from Shepherd into a copy-paste-ready Lyra (Gemini) music prompt — a real song in the genre you ask for, with simple, catchy lyrics: your exact chorus as the hook and ultra-short verses, wrapped in a style directive that locks the genre, the specific singing voice (its tone and character), reference artist, and length. Asks for anything missing before drafting. Chat-only — writes no files.

Usage: `/shep-song [saying or any details you already have]`

## What this makes

One single prompt block you paste into Lyra's prompt box. It contains two things woven together:

1. A **style/production directive** — genre (+ reference artist/song), a vivid voice (tone/texture, plus ethnicity/age/register where it fits), tempo/feel, genre-signature instruments, mood, "a real, professionally produced song in the genre — not a kids' song," and hard guardrails on length and structure.
2. The **full lyrics** — your exact chorus repeated as the hook, two tiny verses, a short bridge, and a big final chorus, with section tags.

Writing the actual lyrics is the whole point: it's the only reliable way to keep verses short, keep the words simple, and guarantee the chorus is exactly your phrase. Lyra performs what's written instead of inventing a long, boring song.

## Inputs to gather

**Required — do not draft until you have all four. Interrogate until you're 99% sure:**

1. **Chorus phrase** — the exact words Shepherd says (or the exact chorus line the user wants). This becomes the hook, *verbatim*.
2. **Genre** — the musical style. Always ask if there's an artist or song it should sound like ("Anyone or any song you want it to feel like?"). A reference makes the sound far better.
3. **Voice** — a *vivid* description of the singing voice, never just "male" or "female." Always pin down **tone/texture, gender, and — where it fits — ethnicity/cultural character, age, and register**: e.g., "deep African American male," "raspy 30's female," "pure baritone female," "bright young gospel tenor," "smoky soul alto." If the user offers only a bare "male"/"female," push for the texture and character before drafting — the voice line is what makes the song land. Vocal composition (choir, duet, group of guys, solo + backing harmonies) belongs here too.
4. **What it's about / the vibe** — enough to write two tiny verses and a short bridge: when he says it, what it's about, and the mood.

**Optional — use the defaults, but grab them if the user offers:**

- **Title** — default: the saying, Title Cased (e.g., "Yellow Bus").
- **Tone/mood** — silly, sweet, hyped-up, gentle, triumphant.
- **Tempo / energy** — default: upbeat and bouncy.
- **Must-include images, words, or lines.**
- **Length** — default: very short, around 90 seconds to ~2 minutes. Honor "even shorter" / "a little longer."
- **How the phrase is used in the chorus** — default: the phrase IS the repeated hook. If it's unclear whether the chorus should be the phrase alone (repeated) or a short line *built around* the phrase, ask. Either way the exact phrase must appear unchanged.

## Steps

1. **Parse the prompt args** and map whatever the user gave to the inputs above.

2. **Ask for everything missing in ONE batch** — don't dribble questions out one at a time. You are 99% sure only when you know: the exact chorus words, the genre (ideally with a reference), a **vivid voice** (tone/texture, gender, and — where it fits — ethnicity, age, and register; never a bare "male"/"female"), and enough about the subject to write verses. If the chorus phrasing is ambiguous, ask whether the chorus is the phrase repeated or a short hook built around it.

3. **Draft the lyrics** following the brevity rules:
   - **Chorus = the exact phrase, verbatim**, as the hook. Repeat it (typically 2–4 times per chorus).
   - **Two verses**, each just **2 short lines**. Simple, concrete, everyday words — plain and singable, not childish. Light, natural rhyme — never force it.
   - **Structure:** tiny intro → Verse 1 → Chorus → Verse 2 → Chorus → short Bridge → big Final Chorus → short outro. The final chorus is the biggest (fuller vocals/energy); get to the *first* chorus within the first few seconds.
   - **Keep every section tiny** — verses are 2 lines; the bridge is short (2 lines or a brief build/breakdown that lifts into the final chorus). No extra verses beyond these and no long instrumental breaks — brevity is still the feature, even with the bridge.

4. **Build the style/production directive.** Include, in plain prose:
   - Genre, and if a reference was given, "in the style of [artist/song]" — but also translate it into **descriptive sonic traits** (tempo/feel, 2–4 signature instruments, production vibe, vocal character). Describe the qualities; never tell the tool to "copy/clone [artist] exactly."
   - **The voice — always vivid and specific.** Lead with the descriptor: tone/texture, gender, and — where it fits — ethnicity/cultural character, age, and register (e.g., "deep African American male lead," "raspy 30-something female lead," "pure baritone female lead"). This line must always be present; never reduce it to a bare "male"/"female."
   - Mood/energy.
   - "A real, catchy, professionally produced song in the genre (not a kids' song) — clean, modern, with simple lyrics anyone can sing along to."
   - **Guardrails:** target length (e.g., "keep the whole song under ~2 minutes"), "get to the first chorus fast and repeat the hook," "lift through a short bridge into a big final chorus," "these are the complete lyrics — perform them as written; do not add extra verses or long instrumental breaks beyond what's written," and "the chorus words must be exactly '[phrase]'."

5. **Assemble ONE single prompt block** (Lyra uses one box): the style/production directive paragraph first, then the tagged lyrics. See the template.

6. **Output in chat** — no files:
   - A one-line recap: `Title • genre • voice • ~length • chorus: "[phrase]"`
   - The full prompt inside a fenced code block so it's one-click copyable.

7. **Offer revisions** in one line: "Want it shorter, a different voice, or another genre? Say the word and I'll regenerate."

## Output template (mirror this shape)

````
[One paragraph: catchy, professionally produced {genre} song — a real {genre} track, not a kids' song — {sonic traits: tempo/feel, signature instruments, production vibe}. {Vivid voice descriptor — tone/texture + gender, plus ethnicity/age/register where it fits} lead{, backing details}. In the style of {reference}, {vocal character}. Clean and modern, with simple lyrics anyone can sing along to. Keep the whole song under ~{length}: short intro, get to the first chorus fast, repeat the hook, lift through a short bridge into a big final chorus. These are the complete lyrics — perform them as written; do not add extra verses or long instrumental breaks. The chorus words must be exactly "{phrase}".]

[Intro – brief]

[Verse 1]
{two short, simple lines}

[Chorus]
{phrase}, {phrase},
{short hook line ending on the phrase}

[Verse 2]
{two short, simple lines}

[Chorus]
{phrase}, {phrase},
{short hook line ending on the phrase}

[Bridge – short, contrasting build]
{two short lines that lift into the final chorus}

[Final Chorus – big, fuller vocals/energy]
{phrase}, {phrase},
{short hook line ending on the phrase}
{phrase}, {phrase}!

[Outro – brief]
{phrase}!
````

## Worked example

Input: *saying "yellow bus" → Latin pop, female voice, he loves yellow school buses.*

````
Catchy, professionally produced Latin pop song — a real Latin pop track, not a kids' song — bright and sunny, ~100 BPM reggaeton-tinged groove, warm acoustic guitar, light brass stabs, shaker and congas, big sing-along hook. Warm, bright young Latina female lead, joyful and playful, in the style of modern bright Latin pop (clean — not explicit). Clean, polished, and modern, with simple lyrics anyone can sing along to. Keep the whole song under ~2 minutes: short intro, get to the first chorus fast, repeat the hook, lift through a short bridge into a big final chorus. These are the complete lyrics — perform them as written; do not add extra verses or long instrumental breaks. The chorus words must be exactly "yellow bus".

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

[Bridge – stripped back, claps building]
Hop on up and find your seat,
Here we go down the street!

[Final Chorus – full band, backing vocals, biggest energy]
Yellow bus, yellow bus,
Come and ride along with us!
Yellow bus, yellow bus,
Yellow bus, yellow bus!

[Outro]
Yellow bus... beep beep!
````

## Important

- **Chat-only. Write no files.** Output the prompt and stop.
- **Real song in the genre, not a kids' song.** Produce an authentic track in whatever genre is asked — a real country song, a real Latin pop song, a real R&B song — never a "kids' [genre]" novelty. The simplicity lives in the *words and the length*, not in dumbing down the production or the voice.
- **Keep it clean.** Family-friendly and non-explicit by default — these come from Shepherd's sayings. Just don't brand or style it as a children's song.
- **The chorus is the user's exact words, verbatim.** Never reword, expand, or "improve" the phrase itself.
- **Verses are tiny** — 2 lines, simple words, fast to the chorus; keep the bridge short too. The point is to NOT give the AI room to make it long and boring.
- **Bridge then big final chorus.** Every song ends with a short bridge after the second chorus that builds into one bigger final chorus, then a brief outro.
- **Default to very short** (~90 sec–2 min). Always state the length cap and the exact structure inside the prompt so Lyra can't sprawl.
- **One single prompt block** — Lyra uses one box. Style directive first, then tagged lyrics. Don't split into separate sections.
- **Keep the words simple but grown-up** — plain, everyday language anyone can sing, not toddler/preschool vocabulary. It should read like a real song in the genre that just happens to be easy to sing.
- **Always specify a vivid singing voice.** Every prompt names the voice with real character — tone/texture, gender, and — where it fits — ethnicity/cultural character, age, and register (e.g., "deep African American male," "raspy 30's female," "pure baritone female"). Never ship a generic "male/female" voice line; if that's all the user gives, ask for the texture and character first.
- **Artist references:** describe the sound and say "in the style of." Never instruct the tool to copy an artist exactly.
- **If you don't have the exact chorus, genre, voice, and subject, ask before drafting.** Don't guess.
