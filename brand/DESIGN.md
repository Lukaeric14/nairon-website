# Nairon — Design System (Phase 1)

Status: **DRAFT — locks at Gate 2 together with the approved moodboard.** After Gate 2, changes only on Luka's explicit instruction.
Decisions source: Rounds 1–2 of the stylescape review, 2026-07-13 (`brand/directions.md`).

```yaml
# ---- machine-readable tokens ----
color:
  paper:        "#FBFAF6"   # page canvas — never pure white
  paper-raised: "#F4F2EC"   # cards, alternating sections
  hairline:     "#E5E3DA"   # all rules and borders, 1px
  ink:          "#16150F"   # primary text — never pure black
  ink-muted:    "#5D5C54"   # secondary text, captions
  lapis-600:    "#1378E6"   # THE accent: CTA fill, links, live values. One filled use per viewport.
  lapis-900:    "#091F40"   # deep surfaces: footer, diagram grounds, dark UI panels
  lapis-300:    "#4A9CFF"   # data details and live states on dark grounds only
  lapis-wash:   "#E9F0FA"   # tinted surface for product/UI-side blocks (cool temperature)
  tan-wash:     "#F3EBDD"   # tinted surface for human/field-side blocks (warm temperature)
  copper:       "#B0713A"   # RATIONED: imagery-echo details only — a rule line, a caption marker.
                            # Never buttons, never surfaces, never running text. Subject to Gate 2 veto.
  dark-hero:    "#0A1322"   # fallback ground under hero video
  success:      "#2E7D4F"
  warning:      "#B7791F"
  error:        "#B3392B"
type:
  display:
    family: "Tiempos Headline"        # licensed target (B2 register). Interim free stand-in: Libre Baskerville.
    weights: [300, 400]
    case: sentence case, max two lines, letter-spacing -0.01em
  body:
    family: "Geist"                   # owned — Hive product continuity
    weights: [400, 500]
    size: 15–16px, line-height 1.6
  data:
    family: "Geist Mono"              # run IDs, small metadata, table numerals
  proof-numerals: display serif, tabular figures, 40–72px   # the $125 → $25 moments
  eyebrow: Geist 500, 11px, uppercase, letter-spacing 0.14em, ink-muted
scale:
  h1: clamp(44px, 6vw, 72px)
  h2: 36px
  h3: 22px
  section-gap: 80px
  container: 1200px
  radius: 2px          # everywhere. No other radius exists.
  shadow: none         # depth = hairlines, washes, and the dark hero plane. Never drop shadows.
motion:
  duration: 300–500ms
  easing: ease-out
  vocabulary: fade + 8px rise, slow crossfade for imagery. No bounce, no parallax, no spring.
```

## The system in one paragraph

Warm paper carries editorial serif; Lapis is the only cool, saturated voice on the page and it speaks once per viewport. The warm/cool story runs: human and field content sits on paper and tan washes with golden imagery; product and platform content sits on lapis washes and deep-lapis grounds. The two temperatures never blend inside one block.

## Usage rules (the decisions, not just the values)

1. **One filled Lapis element per viewport** — the CTA. Everything else interactive is ink text with hairline underline. A second blue button on screen is a bug.
2. **lapis-900 is a surface, lapis-600 is a voice, lapis-300 is a detail.** Never body text in any Lapis. Never lapis-600 as a background tint — that was the "overly blue" failure of the old site.
3. **Serif speaks, sans works.** Display serif for statements, section openers, and proof numerals only. Geist for everything functional: nav, cards, buttons, forms, captions. Never mix families inside one text block.
4. **Proof numerals are display moments:** set large in the serif with tabular figures ($125 → $25, 150 → 250). Small data (run IDs, timestamps, table cells) is Geist Mono.
5. **Washes are section surfaces, not decorations:** tan-wash behind human/field content, lapis-wash behind product/UI content. Max one wash block per two viewports.
6. **Depth without shadows:** the page is flat; the only plane-break is the dark cinematic hero (and dark footer). Hairlines separate; washes group.
7. **Copper is on probation:** allowed only as imagery-echo details (a rule line under a stat, a caption marker) until Gate 2 confirms or vetoes it. If in doubt, use ink.
8. **UI imagery reads as Hive:** product screenshots/abstractions keep the Lapis family and Geist — brand-world (warm, serif) and product-world (cool, sans) stay distinguishable on purpose.

## Imagery doctrine (binding for moodboard, film, and site)

- **Two registers (2026-07-13):** Register A — product daylight (clean sky, neutral true-to-life color, hardware as product photography; the Tesla-moodboard register) is the DEFAULT for website and brand-kit imagery. Register B — cinematic dusk (golden/blue hour, the film grammar) is for the hero film and sparing accents. A brand surface built only from Register B reads as film stills, not a brand kit — proven by moodboard round 1.
- **The moodboard format:** the Studio Outline grid (Tesla/Legora templates): photography in both registers + UI component tiles (built, real content) + graphic tiles (palette blocks, type specimens) + material macros. Assembled in Figma.
- **The Tesla grammar:** real environments, lived-in and warm; hardware and materials shot like product photography; a calm precise element (machinery, panel, UI surface) as the quiet axis of warm human scenes.
- **The Legora close-up grammar:** shallow focus, single subject, generous negative space; specificity in what's shown (a labeled disconnect, a brazed joint, a brass nameplate), anonymity in who's shown.
- **People:** silhouettes, hands, backs, reflections. No identifiable faces. Luka does not appear in site imagery.
- **Light:** golden hour and blue hour; long shadows; warm highlights against cool shadows.
- **Materials vocabulary per property-management sub-niche (2026-08-04 revision, revised again same day — property-management-only canon):** Leasing — front-door thresholds, keys on a ring, a clean move-in-ready unit interior, clipboard/tour materials. Maintenance & Dispatch — a work-order tablet or slip, a tool bag, a mechanical/utility closet, a vendor's van tools (never a branded van itself). Rent & Renewals — a mailroom or mail-slot wall, a lease folder on an oak desk, a brass nameplate, a ledger-style desk.

## NEVER list (visual)

- Never pure white (#FFFFFF) or pure black (#000000) as page grounds or text.
- Never a gradient, a drop shadow, or a radius other than 2px.
- Never stock-photo energy: no smiling-at-camera, no posed hard hats, no "happy man on a jobsite checking things off his iPad."
- Never a second saturated color competing with Lapis (copper exception per rule 7 only).
- Never readable text or the logo inside AI-generated imagery — text-bearing visuals are built.
- Never bold-weight display headlines: the register is light/regular serif, large sizes.
- Never amber-brown washes (#8C6B3F family — rejected in Round 1).
