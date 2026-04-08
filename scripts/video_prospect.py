#!/usr/bin/env python3
"""
Video Prospect System
---------------------
Paste a business URL. This script:
1. Scrapes the website for key business info
2. Builds a 30-second social proof video production package
3. Drafts a personalized cold email with watermark pitch

Usage:
  python3 scripts/video_prospect.py https://theirbusiness.com
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

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

# Fallback: read from ~/.anthropic_key if env var not set
if not ANTHROPIC_API_KEY:
    key_file = os.path.expanduser("~/.anthropic_key")
    if os.path.exists(key_file):
        with open(key_file) as f:
            ANTHROPIC_API_KEY = f.read().strip()
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "work", "blue-collar-content", "Ben Frank Packs")
MODEL = "claude-sonnet-4-6"

# ── Web Scraper ────────────────────────────────────────────────────────────────

def scrape_website(url: str) -> dict:
    """Fetch and parse a business website. Returns structured raw content."""
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
        print(f"  Warning: Could not fully load {url} — {e}")
        return {"url": url, "text": "", "title": "", "meta_desc": "", "error": str(e)}

    soup = BeautifulSoup(resp.text, "html.parser")

    # Remove noise
    for tag in soup(["script", "style", "nav", "footer", "header", "noscript"]):
        tag.decompose()

    title = soup.find("title")
    title_text = title.get_text(strip=True) if title else ""

    meta = soup.find("meta", attrs={"name": "description"})
    meta_desc = meta.get("content", "") if meta else ""

    # Grab visible text — truncate to avoid token bloat
    body_text = soup.get_text(separator="\n", strip=True)
    body_text = "\n".join(line for line in body_text.splitlines() if len(line.strip()) > 20)
    body_text = body_text[:6000]  # ~1500 tokens max

    # Pull phone numbers
    phone_pattern = r'(\(?\d{3}\)?[\s\-\.]?\d{3}[\s\-\.]?\d{4})'
    phones = list(set(re.findall(phone_pattern, resp.text)))

    # Pull email addresses
    email_pattern = r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}'
    emails = list(set(re.findall(email_pattern, resp.text)))
    emails = [e for e in emails if not any(skip in e for skip in ["example", "sentry", "pixel", "google", "facebook"])]

    domain = urlparse(url).netloc.replace("www.", "")

    return {
        "url": url,
        "domain": domain,
        "title": title_text,
        "meta_desc": meta_desc,
        "body_text": body_text,
        "phones": phones[:3],
        "emails": emails[:3],
    }


# ── Claude Analysis ────────────────────────────────────────────────────────────

def analyze_business(scraped: dict, client: anthropic.Anthropic) -> dict:
    """Use Claude to extract structured business info from raw scraped data."""
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
        # Try to extract JSON block
        match = re.search(r'\{.*\}', raw, re.DOTALL)
        if match:
            return json.loads(match.group())
        raise ValueError(f"Could not parse Claude response as JSON:\n{raw}")


def generate_video_package(biz: dict, client: anthropic.Anthropic) -> str:
    """Generate a complete 30-second video production package."""
    print("  Building video production package...")

    prompt = f"""
You are a video producer creating a 30-second social proof ad for a local business.
This will be produced entirely with AI tools (voiceover AI, stock footage, text overlays).

Business info:
{json.dumps(biz, indent=2)}

Generate a complete production package as clean markdown with these sections:

## Video Concept
One paragraph on the emotional hook and overall feel.

## Script (30 seconds)
The full voiceover script. Mark [PAUSE] where natural breaks go.
Keep it tight — roughly 75-85 words for 30 seconds.

## Text Overlays
A numbered list of the on-screen text that appears over the visuals (not the voiceover).
Include timing cue (e.g., "0:00–0:05 — [Business Name] | [City], [State]").

## Stock Footage Direction
3–4 bullet points describing the visual style and what footage to search for.
Be specific — what scenes, what mood, what colors.

## Voiceover Direction
- Tone: (e.g., warm, confident, trustworthy)
- Pace: (e.g., conversational, measured)
- Suggested AI voice style: (e.g., "male, mid-30s, Southern warmth" for ElevenLabs)

## Music Direction
One sentence on the background music feel + a suggested search term for a royalty-free track.

## Recommended AI Tools
Bullet list of tools to produce this specific video end-to-end.

Keep the entire output focused and practical. This package should be copy-paste ready.
"""

    resp = client.messages.create(
        model=MODEL,
        max_tokens=1200,
        messages=[{"role": "user", "content": prompt}]
    )

    return resp.content[0].text.strip()


def generate_cold_email(biz: dict, client: anthropic.Anthropic) -> str:
    """Draft a cold email pitching the watermarked video sample."""
    print("  Drafting cold email...")

    owner = biz.get("owner_name") or "there"
    salutation = f"Hi {owner.split()[0]}," if owner and owner != "null" else "Hi there,"

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


# ── Output ─────────────────────────────────────────────────────────────────────

def save_output(biz: dict, video_package: str, email_draft: str, scraped: dict) -> str:
    """Save the full prospect package to a markdown file."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    slug = re.sub(r'[^a-z0-9]+', '-', (biz.get("business_name") or scraped["domain"]).lower()).strip('-')
    date_str = datetime.now().strftime("%Y-%m-%d")
    filename = f"{date_str}-{slug}-video-prospect.md"
    filepath = os.path.join(OUTPUT_DIR, filename)

    content = f"""# {biz.get('business_name', scraped['domain'])} — Video Prospect
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

## Video Production Package

{video_package}

---

## Cold Email Draft

{email_draft}

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
        print("Usage: python3 scripts/video_prospect.py <business_url> [--demo]")
        print("       python3 scripts/video_prospect.py --demo   (test without a real URL)")
        sys.exit(1)

    if not ANTHROPIC_API_KEY:
        print("Error: ANTHROPIC_API_KEY not set.")
        print("  Option 1: export ANTHROPIC_API_KEY=sk-ant-...")
        print("  Option 2: echo 'sk-ant-...' > ~/.anthropic_key")
        sys.exit(1)

    if demo_mode:
        url = "https://demo.greenvalleylawn.com"
    else:
        url = args[0]
        if not url.startswith("http"):
            url = "https://" + url

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    print(f"\nVideo Prospect System")
    print(f"{'─' * 40}")
    print(f"Target: {url}\n")

    if demo_mode:
        print("  [DEMO MODE — using mock business data]")
        scraped = {"url": url, "domain": "greenvalleylawn.com", "phones": [], "emails": []}
        biz = DEMO_BIZ
        print(f"  Found: {biz['business_name']} ({biz['city']}, {biz['state']})")
    else:
        # Step 1: Scrape
        scraped = scrape_website(url)

        # Step 2: Analyze
        biz = analyze_business(scraped, client)
    print(f"  Found: {biz.get('business_name', 'Unknown')} ({biz.get('city', '?')}, {biz.get('state', '?')})")

    # Step 3: Video package
    video_package = generate_video_package(biz, client)

    # Step 4: Cold email
    email_draft = generate_cold_email(biz, client)

    # Step 5: Save
    filepath = save_output(biz, video_package, email_draft, scraped)

    print(f"\n{'─' * 40}")
    print(f"Done. Saved to:\n  {filepath}")
    print()

    # Print the email immediately for quick review
    print("COLD EMAIL DRAFT:")
    print("─" * 40)
    print(email_draft)
    print()


if __name__ == "__main__":
    main()
