---
name: messenger-studios-overview
description: Master gear, rack, and signal-flow reference for Messenger Studios — Spring Hill, TN. Covers Control Room, Studio Floor, Production Cart, and Broadcast Room ERK as-built (Q3 2025).
aliases:
  - Messenger Studios
  - MI Studios
  - Nashville Studio
  - Studio Overview
metadata:
  type: reference
  source: "MI Nashville Studio P-426 As-built.pdf (Lux AVL Q3 2025 draft)"
  source_date: 2025
  location: "[[Messenger International]] office, Spring Hill, TN"
---

# Messenger Studios — Studio Overview

Boutique virtual-production studio owned by [[Messenger International]], operated by the [[Video Team]]. Designed for podcasts, commercials, promo content, and short-form cinematic productions. Built around a curved 1.9mm [[Planar]] LED wall driven by [[Unreal Engine]] virtual production.

**Sources of truth (in `gear-and-systems/source-documents/`):**
- `MI Nashville Studio P-426 As-built.pdf` — Lux AVL Inc., Q3 2025 design-development draft (full AS-BUILT plans)
- `Lux AVL Proposal P-426 - Loudspeakers Lighting Curtains Acoustics (2024-09-30).pdf` — initial Lux proposal: $65,785 covering loudspeakers, lighting, curtains, acoustic treatment. **Does NOT cover the video / SDI cable plant** — that scope is in a separate Lux document not yet located.

**⚠️ Missing source document:** A separate Lux proposal/invoice exists for the video system (SDI patch panels CTP_3x2 / CTP_2x2 / CTP_8x8 / DTP_01, BNC pulls SDI A–E, network pulls). Find it — it's where the SDI cable spec (12G vs 3G) would be itemized. Check Asana, email archives, and with [[Andrew McIntosh]].

For LED wall geometry, power, and stage relationship, see [[messenger-studios-led-wall]].

---

## Room Layout

Four functional zones:

| Zone | Purpose |
|---|---|
| **Control Room** | Master Control, server rack, switcher, audio mixer, render node, work stations |
| **Studio Floor** | Curved LED wall, platform stage with podcast table, 4× cameras, lighting grid, tracking |
| **Production Cart** | Mobile director's monitor position for on-floor supervision |
| **Broadcast Room (BCast Rm) ERK** | The main 18-RU equipment rack — lives in the control room |

---

## Master Gear List by Location

### Broadcast Room ERK (18 RU rack)

| RU | Device | Make / Model | Function |
|---|---|---|---|
| 17 | **DTP_01** patch panel | Lux-supplied | Studio-floor termination point — 8× RJ45 + 5× BNC |
| 16 | Net Switch (OFE) | TBD — confirm with IT | LAN backbone for studio devices |
| 15 | Wireless Mic Rx ×2 | [[Shure]] GLXD with SM58 capsules | Wireless mics 1 & 2 |
| 14 | CTP Rack Audio | Lux-supplied | Audio CAT-5 patch (ACAT 1–3 to floor CTP_8x8) |
| 12 | **Audio Mixer** | Allen & Heath CQ18T | Production audio mixing, USB record, LAN control |
| 6 | LED Wall Processor (OFE) | [[Brompton]] | Drives [[Planar]] VP1.9-VX wall (4× LAN to wall) |
| 5 | Amp | [[d&b audiotechnik]] 5d | Drives 16c columns + b8 subs |
| 4 | **Render Node** (OFE) | TBD — Unreal/virtual-production PC | Renders Unreal scenes; 4K SDI out to switcher |

### Control Room (Desk + Server Rack)

| Item | Make / Model | Notes |
|---|---|---|
| **Video Switcher** | **[[Blackmagic]] Television Studio HD8 ISO** | Current production switcher — 1080p only, see [Switcher Upgrade](#switcher-upgrade-under-active-evaluation) below |
| Cloud Store | [[Blackmagic]] Cloud Store 20TB | Bundled storage / Dropbox sync — **underutilized** (team records to local drives) |
| Master Control | Operator position | — |
| Video Monitors | Dell U3223QE ×2 (32" 4K) | Vid Mon 1 + Vid Mon 2 — switcher MV HDMI + HDMI |
| Work Station A6000 PC | TBD inventory | Edit/playback workstation |
| Unreal Workstation | TBD inventory | Unreal Engine virtual-production driver |
| Work Stations ×2 | TBD inventory | Brompton/general |

### Studio Floor

| Item | Make / Model | Notes |
|---|---|---|
| **LED Wall** | [[Planar]] VP1.9-VX (1.9mm pitch) | Curved, ground-supported, see [[messenger-studios-led-wall]] |
| Cameras ×4 | [[Blackmagic]] | 4K / 12G-SDI-capable — feed switcher via SDI A–E pulls |
| Camera Tracking | [[HTC Vive]] Mars Tracker | For Unreal virtual-production camera moves |
| Podcast Table | On platform stage | Centered on wall arc |
| Platform Stage | 7" modular | 12" upstage gap from wall face |
| L/R Speakers | [[d&b audiotechnik]] 16c columns | Driven from d&b 5d amp in ERK U5 |
| Sub Speakers | [[d&b audiotechnik]] b8 ×2 | Beam-mounted above main beam |
| SDI/XLR Patch Bay | Stage-side patch | Camera + audio termination on floor |
| Floor Connector Plates | CTP_3x2, CTP_2x2, CTP_8x8 | Wall-plate terminations to ERK DTP_01 |
| Lighting | Aputure P600 + P300 + Infinibars + grip | Full grid + grip per pricing sheet |

### Production Cart

| Item | Make / Model | Notes |
|---|---|---|
| Director's Monitor | TBD | On-floor director position |

---

## Cable Plant — Studio Floor ⇄ BCast Rm ERK

All terminations land at **DTP_01** in ERK U17.

### SDI (BNC)

| Cable | Floor Side | ERK Side (DTP_01) | Carries |
|---|---|---|---|
| SDI A | CTP_3x2 | PORT 19 | Camera return / camera feed |
| SDI B | CTP_3x2 | PORT 20 | Camera return / camera feed |
| SDI C | CTP_3x2 | PORT 21 | Camera return / camera feed |
| SDI D | CTP_2x2 | PORT 22 | Camera return / camera feed |
| SDI E | CTP_2x2 | PORT 23 | Camera return / camera feed |

**⚠️ Open question: are these 5 BNC pulls 12G-SDI rated (RG-6 / RG-11) or only 3G (RG-59)?** Lux spec sheet: RG-6 carries 12G to 235ft, RG-59 only to ~190ft. This is the gating question for the [[switcher upgrade]] — see below.

### Network (RJ45 — all shielded ACAT)

| Cable | Floor Side | ERK Side | Carries |
|---|---|---|---|
| NET A | CTP_3x2 | DTP_01 PORT 12 | LAN to studio device |
| NET B | CTP_3x2 | DTP_01 PORT 13 | LAN |
| NET C | CTP_3x2 | DTP_01 PORT 14 | LAN |
| NET D | CTP_2x2 | DTP_01 PORT 15 | LAN |
| NET E | CTP_2x2 | DTP_01 PORT 16 | LAN |
| NET F | CTP_8x8 | DTP_01 PORT 17 | LAN |
| NET G | CTP_8x8 | DTP_01 PORT 18 | LAN |
| ACAT 1–3 | CTP_8x8 (03/07/A-PORT) | CTP_Rack Aud (U14) 03/07/A-PORT | Audio LAN trunk to rack |

### Video Wall LAN (Brompton path)

| Cable | Floor Side | ERK Side |
|---|---|---|
| VidWall1–4 | OFE VidWall (4 LAN ports) | OFE VW Proc (Brompton) — ERK U6 |

### Audio (XLR/Term)

- A&H CQ18T mixer outputs 1–4 feed amp inputs and switcher Audio 1–2
- Mixer Output 5 → Vid Sw Audio1, Output 6 → Vid Sw Audio2
- Amp LS1–LS4 → Main L/R + Sub 1/2 speaker terminals

### Cable-path notes (from Lux notes)

- Rack ERK → studio: cable runs **free-aired above the drop ceiling**
- Rack ERK → desk: cable runs **free across the ground and loomed**
- Wall rack mounted with bottom at +32" A.F.F.

---

## Signal Flow Summary

```
Cameras (Blackmagic, 4K-capable, studio floor)
  ↓ SDI A–E via stage patch + floor CTP plates
DTP_01 patch panel (ERK U17)
  ↓ BNC patch
Video Switcher (HD8 ISO — current bottleneck)
  ↓ PGM SDI → cloud store / record drives
  ↓ Streaming engine → live stream
  ↓ MV SDI/HDMI → desk monitors

Audio:
Mics (Shure GLXD) + on-floor → A&H CQ18T → embed via switcher + d&b 5d amp → 16c L/R + b8 subs

LED Wall content path:
Render Node (ERK U4, Unreal Engine) → 4K SDI to switcher (or direct)
Brompton VW Proc (ERK U6) → 4× LAN → Planar VP1.9 wall
HTC Vive Mars Tracker → render node (USB/network) for camera tracking

Storage:
Currently: drives plugged directly into HD8 USB
Cloud Store 20TB: bundled, underutilized
```

---

## Switcher Upgrade — Under Active Evaluation

**Status (as of 2026-06-10):** Direction set, one verification step before ordering.

### Why
HD8 caps at 1080p. Cameras are already 12G-SDI 4K. Switcher is the bottleneck. Cloud Store / Dropbox sync — one of HD8's bundled features — is unused. But built-in streaming and ISO record ARE used regularly.

### Direction
**[[Blackmagic]] ATEM Television Studio 4K8** as the HD8's direct replacement. Reasoning:
- 8× 12G-SDI in matches current input count and camera spec
- 8× ISO record at 2160p (same record-to-attached-drive paradigm as HD8)
- Built-in streaming engine (H.264 + SRT) — required by current workflow
- Same ATEM Software Control UI the team already knows
- ~$2,995 USD

### Decoupled option considered and ruled out
Pairing a smaller M/E switcher with DeckLink capture cards in dedicated PCs was considered. Ruled out because:
- New capture PCs would be net-new capital expense
- Constellation 4K switchers don't include a streaming engine — would need to add one
- HD8 → TS 4K8 is a near-drop-in; decoupled is a workflow rebuild

### Open questions before ordering

- [ ] **Cable plant verification** — confirm with Lux AVL whether SDI A–E pulls are 12G-rated (RG-6 / RG-11) or 3G-only (RG-59). The 2024-09-30 Lux proposal covers loudspeakers/lighting/curtains/acoustics only — no video line items. **First step: locate the separate Lux video proposal** (probably a later phase or change order). If not findable, email Lux with the AS-BUILT in hand and ask "What gauge/type was actually pulled for SDI A–E between Studio Floor and BCast Rm ERK? Are those runs rated for 12G-SDI (4K) or only 3G-SDI (1080p)?" If 3G-only at full length, factor in repull cost/timeline.
- [ ] Confirm USB-C SSD spec is fast enough for 8× 2160p ISO record (HD8 record media will not keep up)
- [ ] Confirm streaming bitrate targets — TS 4K8 H.264 vs. SRT
- [ ] Decide future of [[Blackmagic]] Cloud Store 20TB — keep as archival/transfer storage, sell, or repurpose

### What stays the same
- Vive Mars + Unreal render path → unaffected
- Audio routing via A&H CQ18T → unaffected (switcher audio inputs stay embedded)
- All studio-floor wall plates and ERK rack layout → unaffected

---

## Open Questions / TODOs

- [ ] Inventory all OFE (Owner Furnished Equipment) items the as-built marks as "?" — render node spec, network switch make/model, video wall processor exact model
- [ ] Confirm exact Blackmagic camera model(s) currently in use on stage
- [ ] Document studio-floor electrical (duplex/quadplex/junction box locations from sheet 1)
- [ ] Add photos of ERK front + back, studio floor wide, control room wide
- [ ] Decide booking/rate-card distribution — internal-only or public-facing? See [[messenger-studios-pricing]].
- [ ] Move final approved AS-BUILT (not the draft) into `source-documents/` once Lux issues it

---

## Related Files

- [[messenger-studios-led-wall]] — Full LED wall spec
- [[messenger-studios-pricing]] — Studio rate card for external bookings
- `gear-and-systems/messenger-studios-stage-blueprint.svg` — Stage + wall blueprint
- `gear-and-systems/source-documents/MI Nashville Studio P-426 As-built.pdf` — Source as-built (Lux AVL)
