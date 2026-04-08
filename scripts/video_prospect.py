#!/usr/bin/env python3
"""
Video Prospect System
---------------------
Paste a business URL. This script:
1. Scrapes the website for key business info
2. Builds a 30-second social proof video production package
3. Generates voiceover MP3 via ElevenLabs
4. Downloads stock footage clips via Pexels
5. Drafts a personalized cold email with watermark pitch

Usage:
  python3 scripts/video_prospect.py https://theirbusiness.com
  python3 scripts/video_prospect.py --demo

Required env vars (add to ~/.zshrc):
  export ANTHROPIC_API_KEY="sk-ant-..."
  export ELEVENLABS_API_KEY="..."
  export PEXELS_API_KEY="..."
"""

import sys
import os
import re
import json
from datetime import datetime
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup
import anthropic

# ── Config ────────────────────────────────────────────────────────────────────

def load_key(env_var: str, fallback_file: str = None) -> str:
    val = os.environ.get(env_var, "")
    if not val and fallback_file:
        path = os.path.expanduser(fallback_file)
        if os.path.exists(path):
            with open(path) as f:
                val = f.read().strip()
    return val

ANTHROPIC_API_KEY  = load_key("ANTHROPIC_API_KEY", "~/.anthropic_key")
ELEVENLABS_API_KEY = load_key("ELEVENLABS_API_KEY")
PEXELS_API_KEY     = load_key("PEXELS_API_KEY")

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "work", "blue-collar-content", "Ben Frank Packs")
MODEL = "claude-sonnet-4-6"

# ElevenLabs voice — Adam (warm, professional American male)
ELEVENLABS_VOICE_ID = "pNInz6obpgDQGcFmaJgB"
ELEVENLABS_URL = f"https://api.elevenlabs.io/v1/text-to-speech/{ELEVENLABS_VOICE_ID}"

PEXELS_VIDEO_URL = "https://api.pexels.com/videos/search"

# ── Web Scraper ────────────────────────────────────────────────────────────────

def scrape_website(url: str) -> dict:
    print(f"  Scraping {url}...")
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        )
    }
    try:
        resp = requests.get(url, headers=headers, timeout=15)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"  Warning: Could not load {url} — {e}")
        return {"url": url, "text": "", "title": "", "meta_desc": "", "error": str(e)}

    soup = BeautifulSoup(resp.text, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header", "noscript"]):
        tag.decompose()

    title = soup.find("title")
    title_text = title.get_text(strip=True) if title else ""

    meta = soup.find("meta", attrs={"name": "description"})
    meta_desc = meta.get("content", "") if meta else ""

    body_text = soup.get_text(separator="\n", strip=True)
    body_text = "\n".join(l for l in body_text.splitlines() if len(l.strip()) > 20)
    body_text = body_text[:6000]

    phone_pattern = r'(\(?\d{3}\)?[\s\-\.]?\d{3}[\s\-\.]?\d{4})'
    phones = list(set(re.findall(phone_pattern, resp.text)))

    email_pattern = r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}'
    emails = list(set(re.findall(email_pattern, resp.text)))
    emails = [e for e in emails if not any(s in e for s in ["example", "sentry", "pixel", "google", "facebook"])]

    return {
        "url": url,
        "domain": urlparse(url).netloc.replace("www.", ""),
        "title": title_text,
        "meta_desc": meta_desc,
        "body_text": body_text,
        "phones": phones[:3],
        "emails": emails[:3],
    }


# ── Claude Analysis ────────────────────────────────────────────────────────────

def analyze_business(scraped: dict, client: anthropic.Anthropic) -> dict:
    print("  Analyzing business...")
    prompt = f"""
You are analyzing a local business website to prepare a video sales prospect sheet.

Website URL: {scraped['url']}
Page title: {scraped['title']}
Meta description: {scraped['meta_desc']}
Phones found: {', '.join(scraped['phones']) or 'none found'}
Emails found: {', '.join(scraped['emails']) or 'none found'}

Page content:
---
{scraped['body_text']}
---

Extract the following as a JSON object:
{{
  "business_name": "...",
  "owner_name": "... or null",
  "industry": "lawn care | HVAC | plumbing | cleaning | roofing | painting | other",
  "city": "...",
  "state": "...",
  "services": ["list", "of", "top", "3-5", "services"],
  "value_props": ["their stated differentiators or selling points, up to 3"],
  "years_in_business": "number or null",
  "phone": "best phone number or null",
  "email": "best email or null",
  "tone": "professional | casual | family-run | premium",
  "has_reviews_mentioned": true/false,
  "notable_quote": "any strong quote or tagline from the site, or null",
  "video_angle": "one sentence on the strongest angle for a 30-sec social proof video for this specific business"
}}

Return only valid JSON. No markdown fences.
"""
    resp = client.messages.create(
        model=MODEL,
        max_tokens=800,
        messages=[{"role": "user", "content": prompt}]
    )
    raw = resp.content[0].text.strip()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        match = re.search(r'\{.*\}', raw, re.DOTALL)
        if match:
            return json.loads(match.group())
        raise ValueError(f"Could not parse Claude response as JSON:\n{raw}")


def generate_video_package(biz: dict, client: anthropic.Anthropic):
    """
    Returns: (markdown_package, clean_voiceover_script, footage_search_terms)
    """
    print("  Building video production package...")
    prompt = f"""
You are a video producer creating a 30-second social proof ad for a local business.
This will be produced with AI voiceover (ElevenLabs), stock footage (Pexels), and edited in Final Cut Pro.

Business info:
{json.dumps(biz, indent=2)}

Generate a complete production package as clean markdown with these sections:

## Video Concept
One paragraph on the emotional hook and overall feel.

## Script (30 seconds)
The full voiceover script. Mark [PAUSE] where natural breaks go.
Keep it tight — roughly 75-85 words for 30 seconds.

## Text Overlays
A numbered list of on-screen text with timing cues (e.g., "0:00–0:05 — Business Name | City, State").

## Stock Footage Direction
3–4 bullet points describing what to search for on Pexels. Be specific — scenes, mood, colors.
At the end of this section, add a line: SEARCH_TERMS: ["term 1", "term 2", "term 3", "term 4"]
(These will be used to auto-download footage — make them short, searchable Pexels queries.)

## Voiceover Direction
- Tone:
- Pace:
- Suggested AI voice style for ElevenLabs:

## Music Direction
One sentence on background music feel + a suggested Uppbeat/Pixabay search term.

Keep the output focused and practical.
"""
    resp = client.messages.create(
        model=MODEL,
        max_tokens=1200,
        messages=[{"role": "user", "content": prompt}]
    )
    package = resp.content[0].text.strip()

    # Extract clean voiceover script (strip [PAUSE] markers and markdown)
    script_match = re.search(r'## Script.*?\n(.*?)(?=\n##|\Z)', package, re.DOTALL)
    raw_script = script_match.group(1).strip() if script_match else ""
    # Remove markdown quote formatting and [PAUSE] tags
    clean_script = re.sub(r'\[PAUSE\]', '', raw_script)
    clean_script = re.sub(r'^>\s*', '', clean_script, flags=re.MULTILINE)
    clean_script = re.sub(r'\*\*(.+?)\*\*', r'\1', clean_script)
    clean_script = clean_script.strip()

    # Extract Pexels search terms
    terms_match = re.search(r'SEARCH_TERMS:\s*(\[.*?\])', package, re.DOTALL)
    footage_terms = []
    if terms_match:
        try:
            footage_terms = json.loads(terms_match.group(1))
        except json.JSONDecodeError:
            pass
    if not footage_terms:
        footage_terms = [biz.get("industry", "lawn care"), "before after yard transformation", "suburban home curb appeal"]

    return package, clean_script, footage_terms


def generate_cold_email(biz: dict, client: anthropic.Anthropic) -> str:
    print("  Drafting cold email...")
    prompt = f"""
You are Nathaniel Lehrer, a video producer based in Spring Hill, Tennessee.
You've created a 30-second social proof video for a local business as a sample.
You're sending it to them with a watermark, offering to sell the finished version for $100.

Business info:
{json.dumps(biz, indent=2)}

Write a short, genuine cold email. Rules:
- Subject line that references their business specifically (not generic)
- 4–6 sentences max in the body. No fluff. No corporate speak.
- Mention you made a sample video specifically for them — it has a watermark
- $100 gets them the full version, ready to post
- Include a soft call to action (reply, call, or text)
- Sign off as Nathaniel, with his phone number as [YOUR PHONE]
- Sound like a real person, not a marketer
- Do NOT mention AI was used to make the video

Format as:
Subject: [subject line]

[email body]
"""
    resp = client.messages.create(
        model=MODEL,
        max_tokens=400,
        messages=[{"role": "user", "content": prompt}]
    )
    return resp.content[0].text.strip()


# ── ElevenLabs Voiceover ───────────────────────────────────────────────────────

def generate_voiceover(script: str, output_path: str) -> bool:
    if not ELEVENLABS_API_KEY:
        print("  Skipping voiceover — ELEVENLABS_API_KEY not set")
        return False

    print("  Generating voiceover (ElevenLabs)...")
    payload = {
        "text": script,
        "model_id": "eleven_turbo_v2_5",
        "voice_settings": {
            "stability": 0.60,
            "similarity_boost": 0.75
        }
    }
    headers = {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
    }
    try:
        resp = requests.post(ELEVENLABS_URL, json=payload, headers=headers, timeout=60)
        resp.raise_for_status()
        with open(output_path, "wb") as f:
            f.write(resp.content)
        print(f"  Voiceover saved → {os.path.basename(output_path)}")
        return True
    except requests.RequestException as e:
        print(f"  Voiceover failed: {e}")
        return False


# ── Pexels Footage Download ────────────────────────────────────────────────────

def download_footage(search_terms, footage_dir: str):
    if not PEXELS_API_KEY:
        print("  Skipping footage — PEXELS_API_KEY not set")
        return []

    os.makedirs(footage_dir, exist_ok=True)
    downloaded = []
    headers = {"Authorization": PEXELS_API_KEY}

    for i, term in enumerate(search_terms[:4]):
        print(f"  Downloading footage: \"{term}\"...")
        try:
            resp = requests.get(
                PEXELS_VIDEO_URL,
                headers=headers,
                params={"query": term, "per_page": 1, "size": "medium", "orientation": "landscape"},
                timeout=15
            )
            resp.raise_for_status()
            data = resp.json()
            videos = data.get("videos", [])
            if not videos:
                print(f"    No results for \"{term}\"")
                continue

            # Pick the best quality file under 50MB
            video = videos[0]
            files = sorted(video.get("video_files", []), key=lambda f: f.get("width", 0), reverse=True)
            chosen = next((f for f in files if f.get("width", 0) <= 1920), files[0] if files else None)
            if not chosen or not chosen.get("link"):
                continue

            filename = f"clip_{i+1:02d}_{re.sub(r'[^a-z0-9]+', '_', term.lower())}.mp4"
            filepath = os.path.join(footage_dir, filename)

            video_resp = requests.get(chosen["link"], stream=True, timeout=60)
            video_resp.raise_for_status()
            with open(filepath, "wb") as f:
                for chunk in video_resp.iter_content(chunk_size=1024 * 1024):
                    f.write(chunk)
            print(f"    Saved → {filename}")
            downloaded.append(filepath)

        except requests.RequestException as e:
            print(f"    Failed \"{term}\": {e}")

    return downloaded


# ── Save Output ────────────────────────────────────────────────────────────────

def save_pack(biz: dict, package: str, script: str, email: str, scraped: dict, pack_dir: str) -> str:
    date_str = datetime.now().strftime("%Y-%m-%d")
    filepath = os.path.join(pack_dir, "pack.md")

    content = f"""# {biz.get('business_name', scraped['domain'])} — Ben Frank Pack
**Generated:** {date_str}
**URL:** {scraped['url']}
**Industry:** {biz.get('industry', '—')}
**Location:** {biz.get('city', '—')}, {biz.get('state', '—')}

---

## Business Summary

| Field | Value |
|-------|-------|
| Owner | {biz.get('owner_name') or '—'} |
| Phone | {biz.get('phone') or '—'} |
| Email | {biz.get('email') or '—'} |
| Services | {', '.join(biz.get('services') or [])} |
| Years in Business | {biz.get('years_in_business') or '—'} |
| Tone | {biz.get('tone', '—')} |

**Value Props:** {', '.join(biz.get('value_props') or [])}

**Video Angle:** {biz.get('video_angle', '—')}

---

## Voiceover Script (clean)

{script}

---

## Video Production Package

{package}

---

## Cold Email Draft

{email}

---

## Final Cut Pro Assembly Notes

1. Import all clips from `footage/` — arrange in order matching Text Overlays timing
2. Drop `voiceover.mp3` on audio track — sync to clip start
3. Add text overlays per the timing cues above
4. Color grade: boost green saturation, warm highlights
5. Export at 1080p — add watermark before sending, remove after sale

---

*Generated by video_prospect.py*
"""
    with open(filepath, "w") as f:
        f.write(content)
    return filepath


# ── Main ───────────────────────────────────────────────────────────────────────

DEMO_BIZ = {
    "business_name": "Green Valley Lawn & Landscape",
    "owner_name": "Mike Hargrove",
    "industry": "lawn care",
    "city": "Spring Hill",
    "state": "TN",
    "services": ["Lawn mowing", "Fertilization", "Weed control", "Mulching"],
    "value_props": ["Family-owned since 2009", "Same crew every week", "Free estimates"],
    "years_in_business": "15",
    "phone": "(615) 555-0182",
    "email": "mike@greenvalleylawn.com",
    "tone": "family-run",
    "has_reviews_mentioned": True,
    "notable_quote": "We treat your yard like our own.",
    "video_angle": "A warm 30-second spot showing real Tennessee yards before and after, anchored by their 15-year family-run reputation."
}


def main():
    demo_mode = "--demo" in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith("--")]

    if not args and not demo_mode:
        print("Usage: python3 scripts/video_prospect.py <business_url>")
        print("       python3 scripts/video_prospect.py --demo")
        sys.exit(1)

    if not ANTHROPIC_API_KEY:
        print("Error: ANTHROPIC_API_KEY not set.")
        print("  Add to ~/.zshrc: export ANTHROPIC_API_KEY='sk-ant-...'")
        sys.exit(1)

    url = "https://demo.greenvalleylawn.com" if demo_mode else args[0]
    if not url.startswith("http"):
        url = "https://" + url

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    print(f"\nBen Frank Pack Generator")
    print(f"{'─' * 40}")
    print(f"Target: {url}\n")

    # ── Scrape + Analyze ──
    if demo_mode:
        print("  [DEMO MODE]")
        scraped = {"url": url, "domain": "greenvalleylawn.com", "phones": [], "emails": []}
        biz = DEMO_BIZ
    else:
        scraped = scrape_website(url)
        biz = analyze_business(scraped, client)

    print(f"  Found: {biz.get('business_name', 'Unknown')} ({biz.get('city', '?')}, {biz.get('state', '?')})")

    # ── Generate Content ──
    package, clean_script, footage_terms = generate_video_package(biz, client)
    email = generate_cold_email(biz, client)

    # ── Create Pack Folder ──
    slug = re.sub(r'[^a-z0-9]+', '-', (biz.get("business_name") or scraped["domain"]).lower()).strip('-')
    date_str = datetime.now().strftime("%Y-%m-%d")
    pack_dir = os.path.join(OUTPUT_DIR, f"{date_str}-{slug}")
    os.makedirs(pack_dir, exist_ok=True)

    # ── Save Markdown Pack ──
    pack_path = save_pack(biz, package, clean_script, email, scraped, pack_dir)

    # ── Voiceover ──
    vo_path = os.path.join(pack_dir, "voiceover.mp3")
    generate_voiceover(clean_script, vo_path)

    # ── Footage ──
    footage_dir = os.path.join(pack_dir, "footage")
    clips = download_footage(footage_terms, footage_dir)

    # ── Summary ──
    print(f"\n{'─' * 40}")
    print(f"Pack saved to: {pack_dir}")
    print(f"  pack.md       ✓")
    print(f"  voiceover.mp3 {'✓' if os.path.exists(vo_path) else '✗ (add ELEVENLABS_API_KEY)'}")
    print(f"  footage/      {len(clips)} clips {'✓' if clips else '✗ (add PEXELS_API_KEY)'}")
    print()
    print("COLD EMAIL:")
    print("─" * 40)
    print(email)
    print()


if __name__ == "__main__":
    main()
