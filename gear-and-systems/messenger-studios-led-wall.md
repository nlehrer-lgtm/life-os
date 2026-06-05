---
name: messenger-studios-led-wall
description: Full reference spec for the curved LED wall in Messenger Studios — dimensions, power, mounting, computed arc geometry, and stage-relationship notes
aliases:
  - LED Wall
  - Messenger Studios LED Wall
  - Studio LED Wall
metadata:
  type: reference
  source: "MESSENGER INTL - POWER_SIGNAL WIRING - AS BUILT 14JAN2025.pdf"
  source_date: 2025-01-14
  location: "Messenger Studios — [[Messenger International]] office, Spring Hill, TN"
---

# Messenger Studios — Curved LED Wall

Primary virtual-production display owned by [[Video Team]] and used for [[Get REC'D]] shoots, [[Messenger Cup]] content, and event playback. Wall is curved, ground-supported, and lives in the studio bay.

Source of truth: `MESSENGER INTL - POWER_SIGNAL WIRING - AS BUILT 14JAN2025.pdf` (in Downloads as of intake). Move that PDF into this folder if you want it permanently archived.

---

## Wall — Physical Dimensions

| Spec | Value (Imperial) | Value (Metric) |
|---|---|---|
| Chord width (face) | **21'-9 1/2"** (261.5") | 6,642.49 mm |
| Sagitta (curve depth from chord to apex) | **3'-4 13/16"** (40.81") | 1,036.51 mm |
| Cabinet stack height | **118"** (9'-10") — six cabinets vertical | 2,997 mm |
| Cabinet depth (added to wall plane) | **+3"** | 76 mm |
| Ground support / floor stand depth (added behind cabinets) | **+32"** | 813 mm |
| Total height w/ ground support stands | **123.5" ± 1"** (10'-3.5") | 3,137 mm |
| Inter-cabinet curve angle | **5.00°** between adjacent panels | — |
| **First-pixel height above concrete floor** | **5"** | 127 mm |

## Wall — Computed Arc Geometry

Derived from chord + sagitta. Useful for any object that has to follow or offset from the curve.

| Computed Value | Result |
|---|---|
| Curve radius (R) | **≈ 229.85"** (19.15') / 5,838 mm |
| Total subtended arc angle | **≈ 69.3°** |
| Half-arc angle from centerline | **≈ 34.66°** |
| Arc length along face | **≈ 277.9"** (23.16') |

These match the stated 5° inter-cabinet angle (≈13–14 cabinet joints across the arc).

## Wall — Power & Weight

| System | Wall Power | Wall Weight |
|---|---|---|
| Per spec @ MAX | **12,180 W / 41,560 BTU/hr** | **1,970 lbs / 895.5 kg** |
| Cabinets only | — | 1,512 lbs / 687.3 kg |
| Mounts only | — | 458 lbs / 208.2 kg |

**Processing rack:**
- Power: 200 W / 682 BTU/hr @ MAX
- Rack space: 6 RU
- Rack weight: 33 lbs / 15 kg

## Mounting

Ground-supported via floor stands. Stands add 32" of depth behind the wall plane — keep this clear for service access and ventilation.

---

## Relationship to the Production Stage Build

The 7" modular production stage sits in front of this wall. Key interface dimensions:

- **First pixel at 5" above concrete** → stage top (7") is 2" above first pixel. Bottom 2" of LED is below stage-top height; with the 12" upstage gap, this is fine for eye-level cameras but may show in low-angle shots — frame accordingly or block with stage skirting.
- **Stage upstage edge offset: 12" from wall face** at every point along the curve.
- **Stage upstage edge radius: ≈ 217.85"** (wall R minus 12").
- **Stage width: 20'** — wall extends ~10.75" past the stage on each side.
- See blueprint: `gear-and-systems/messenger-studios-stage-blueprint.svg`.

---

## Open Questions / TODOs

- [ ] Confirm exact LED cabinet model and pixel pitch (not in the AS-BUILT wiring doc — likely on a separate spec sheet)
- [ ] Document the 6 RU processor — make, model, network address, DMX mapping
- [ ] Photograph the back of the wall + rack and add to this folder
- [ ] Calibration / color-profile notes once production starts
- [ ] Move the source PDF from `~/Downloads/` into this folder for archival
