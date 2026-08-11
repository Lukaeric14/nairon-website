# Session handoff

Last session: 2026-08-05 — Favicon fix + SEO/performance audit (DECISIONS #55–58).

## Current state (2026-08-05) — Favicon fixed, audit done, two perf findings open

- **Favicon was broken sitewide since P0**: `favicon.ico`/`favicon.svg` were the untouched Astro
  scaffold default (unrelated gold/magenta icon), never Nairon-branded, despite
  `apple-touch-icon.png`/`site.webmanifest` being correct. Fixed: pulled the proven "n." monogram
  from the old `nairon-website` repo's production favicon set, regenerated `favicon-16x16.png` /
  `favicon-32x32.png` / a real multi-res `favicon.ico`, deleted the wrong `favicon.svg`, fixed
  `site.webmanifest`'s stale "field-services" description. `astro build` clean (74 pages). Local
  changes only — **not deployed** (`vercel deploy --prod` from `site/` needed, per the standing
  no-git-integration note below). See DECISIONS #55.
- **SEO audit: clean.** Scripted a full scan of all 74 built pages — zero missing/duplicate
  title/description/canonical, zero multi-H1 pages, `/go/*` noindex correct, rich structured data
  present sitewide. See DECISIONS #56. Nothing to fix here.
- **Performance audit: 2 findings, both fixed same session (Luka: "both now").** (1) Academy
  thumbnails were the raw YouTube `maxresdefault` (1280×720) shrunk into 480×270/56×32 boxes —
  now use YouTube's own `hqdefault` (480×360) via a new `thumbUrlSmall()` helper; 43 existing
  files backfilled, ingest script fetches both sizes going forward. Academy index page: 6.2MB →
  684KB (89% cut). (2) WhoItsFor's 3 cards + UseCases' 3 panel photos converted from CSS
  `background-image` to `<img loading="lazy">` with real alt text; Section2's pixel-locked
  composited UI mockup left untouched but wrapped in `content-visibility: auto` instead (verified
  safe against its own IntersectionObserver script) to defer its ~900KB without any markup risk.
  UseCases' own wrapper deliberately NOT given content-visibility — its scroll choreography
  script measures descendants live, real risk of stale reads. Full reasoning + what was
  deliberately left alone (and why) in DECISIONS #57.
- **Not screenshot-verified** — no browser-automation/headless-Chrome tool was available this
  session (checked, confirmed absent). Verified instead via clean `astro build`, build-output
  markup inspection, and every touched asset URL returning 200 against a local preview server.
  Recommend a quick visual pass (WhoItsFor carousel + UseCases rows) after deploy.
  Server/CDN layer (compression, caching, HTTP/2, HSTS) already correct — confirmed by curling
  production, no action needed (#58). Also added: `twitter:site` meta tag, and
  `X-Content-Type-Options`/`X-Frame-Options`/`Referrer-Policy`/`Permissions-Policy` headers via
  `vercel.json` (Lighthouse best-practices gaps, zero visual risk). CSP deliberately not added —
  the site relies on several inline `<script>` blocks (GA4, JSON-LD, reveal system); a CSP needs
  a dedicated nonce/hash pass, not a drive-by header.

### SHIPPED TO PRODUCTION 2026-08-05
Committed (`0dd130c`), pushed to `main`, deployed via `vercel deploy --prod` from `site/`,
aliased to naironai.com. Verified live: new favicons 200 (old `favicon.svg` correctly 404s,
file deleted), security headers present, `academy-thumbs-sm` thumbnail confirmed ~14KB
(was 150-220KB) on production.

### Start here next
1. **Do the promised visual pass** — WhoItsFor coverflow and UseCases rows changed their image
   markup; nothing indicates a regression (build clean, assets 200 in prod, CSS reasoned through
   property-by-property) but no screenshot tool was available this session to confirm
   pixel-for-pixel. Worth 2 minutes on a real screenshot next session.
2. Everything from the 2026-08-04 property-management pivot below is unaffected by this session.

## Previous session: 2026-08-04 — TWO VERTICAL PIVOTS IN ONE DAY: SOLAR-ONLY, THEN PROPERTY-MANAGEMENT-ONLY.

## Current state (2026-08-04) — SITE IS PROPERTY-MANAGEMENT-ONLY, 3 SUB-NICHES

**Shipped this session, in two rounds.** Round 1 repositioned the site from 3 industries
(Solar/HVAC/Property Management) to solar-only. Round 2, same session, reversed that and
repositioned to **property-management-only**, with 3 sub-niches: **Leasing, Maintenance &
Dispatch, Rent & Renewals**. The solar-only round is fully superseded — nothing solar-flavored
should remain live. Full rationale in `DECISIONS.md` #51–54.

- **Spec-first, twice:** `brand/STRATEGY.md` (vertical canon, section 3) and `brand/DESIGN.md`
  (materials vocabulary) rewritten first for solar, then rewritten AGAIN for property
  management. Flagship proof number reverted to "Property mgmt: 150 → 250 doors per manager
  (work-order triage + dispatch)," tied to Maintenance & Dispatch.
- **Industries stays dropped as a nav concept** (from round 1, unchanged) — no `/industries/*`
  route, no content collection. Sub-niches live only in `WhoItsFor.astro`'s data array.
- **`WhoItsFor.astro`** rebuilt again: headline "Built for Property Management," 3 cards.
  Leasing reuses the pre-existing approved keys-in-lobby photo
  (`/paper/00QY75TH63W9RRG9RP0QPEPTKS.webp`). Maintenance & Dispatch and Rent & Renewals got
  new hero photos this session (`nairon-brand-imagery` skill, soul_location 0.12cr,
  `brand/images/LEDGER.md` v105–v106 — only 3 of 10 generations were usable; two failure
  modes newly logged: a "diorama/shadowbox" plausibility failure, and desk/paperwork scenes
  reliably rendering legible document text despite explicit negative instructions).
- **`UseCases.astro`** (landing page's pixel-locked 3-card showcase): ALL THREE cards rewritten
  this round (not just 2, since row 1 had been solar-permits since before this session even
  started). Card 1 = Leasing (chat, reused verbatim copy from the pre-solar
  `industryUseCases.ts` git history), card 2 = Maintenance & Dispatch (dispatch, same source),
  card 3 = Rent & Renewals (table, newly written — this exact card never existed before;
  the old table card blended leasing+rent+maintenance together, this round split rent/renewals
  out as its own clean pillar).
- **Copy pass** across Base.astro, about/careers/contact/how-we-work/404/academy-index/
  executive-ai-program, FAQ, Newsletter: every solar-specific line replaced with property-
  management language a second time.
- **29 academy articles + `docs/ARTICLE-TEMPLATE.md` + 6 magnets** re-scrubbed from solar
  examples to property-management examples by a subagent pass (NOT a revert to old HVAC-era
  content — a fresh re-voicing using the new 3 sub-niches), verified against
  `docs/VOICE.md`/`docs/NO-SLOP.md` + `check-slop.mjs` (0 hard-ban hits). Same two articles
  deliberately left untouched for the same reason as round 1 (real client-history facts, not
  vertical framing) — `how-i-plan-to-make-200-videos-month-with-ai-agents.md` and
  `how-to-build-ai-employees-for-smbs.md`.
- Verified: `astro build` clean (74 pages), screenshot-verified WhoItsFor (desktop) and all 3
  UseCases rows render correct property-management copy/data. Committed and pushed to `main`;
  deployed to production via `vercel deploy --prod` (this Vercel project has **no git
  integration** — pushing to GitHub does NOT auto-deploy, a manual `vercel deploy --prod` from
  `site/` is required every time). Verified live on naironai.com.

### Open / start here next
- **Rent & Renewals' WhoItsFor/UseCases photo (`v105-rent-mailroom`) is flagged dim** — ran
  darker/moodier than the standard bright-daylight grade. Two re-roll attempts to fix it both
  failed (one dropped the person, one over-corrected into a fully lit face) — shipped as the
  best available option per the max-2-attempts doctrine. Worth a fresh round if Luka wants it
  brighter.
- Orphaned assets from the multi-industry + solar-only rounds (e.g.
  `site/public/photos/uc-hvac-roof.webp`, `uc-property-building.webp`,
  `whoitsfor-sales-dealers.webp`, `whoitsfor-om-service.webp`, various `/logos/cre-*`,
  `/logos/log-*`, `/logos/fra-*`, `/logos/hea-*`, `/logos/sof-*`) were left on disk across both
  rounds — unused but harmless. Delete deliberately if doing asset cleanup later.
- `DECISIONS.md` #52 flags an undocumented discrepancy from a prior session (commit
  `8b1ab6e` silently re-added 5 placeholder industries after #43 had removed them) —
  worth a habit of `git log` on `site/src/content/` before trusting DECISIONS.md alone
  reflects current repo state.
- **This is the second full vertical pivot in one session.** If a third is coming, the
  playbook is now well-worn: brand spec → WhoItsFor → UseCases (all 3 cards, not just 2,
  unless a future round also starts from a truly blank card 1) → sitewide copy pass →
  academy/magnet re-scrub (delegate to a subagent) → new hero images for whichever sub-niches
  lack an existing approved photo → build/screenshot verify → commit/push → **manual
  `vercel deploy --prod`** (never assume git push deploys on this project) → DECISIONS.md +
  SESSION.md update.

## Previous state (2026-07-26) — ACADEMY: 43 lessons + 6 funnels live in the repo

**Shipped this session.** `site/` went from 29 pages to 82. The academy moved on-domain
(`naironai.com/academy`), the Vite/React SPA is retired, and every one of the 43 videos
across the three YouTube channels has an SEO article and a funnel page behind it.
Decisions #45–50 in `DECISIONS.md` carry the reasoning.

- **Pipeline** — `site/scripts/ingest-video.mjs` takes a YouTube URL and produces topic,
  slug, level, duration, publish date, thumbnail and a deduplicated transcript.
  `lib/transcript.mjs` handles YouTube's rolling two-line caption window (naive
  concatenation triples the text) and carries the ASR name dictionary (Mohan/Neron/Non →
  Mahan/Nairon; Mahan is CMO, not CEO). `scripts/fix-names.mjs` re-applies it in place
  without clobbering written articles. `scripts/backfill.mjs` runs the whole channel set.
- **Pages** — `/academy` (search, levels, resume rail), `/academy/topic/<id>` (4 hubs),
  `/academy/<slug>` (43, Lesson V1 "Legora Classic"), `/go/<magnet>` (6, Funnel V2
  "Centered VSL", noindex + canonical to the lesson + sitemap-excluded).
- **Content** — 39,762 authored words. 0 em dashes, 0 hard-ban slop patterns, 126
  internal cross-links all resolving, 36 articles with comparison tables. Written by a
  122-agent swarm against `docs/VOICE.md` + `docs/NO-SLOP.md` + `docs/ARTICLE-TEMPLATE.md`,
  each article adversarially scored on slop and SEO before acceptance.
- **Checkers** — `node scripts/check-slop.mjs` (exits 1 on hard bans, exempts transcripts).
  `npx astro build` clean at 82 pages.
- **Skill** — `.claude/skills/academy-video/` runs URL → both pages → Vercel preview link.
  `site/` is already linked to the Vercel project, so previews need no git round-trip.

### SHIPPED TO PRODUCTION 2026-07-26
- Merged to `main` (`04bb3c6`, fast-forward) and pushed. Deployed to the `site` Vercel
  project, which owns naironai.com + www. Verified live: `/academy`, all 43 lesson pages,
  4 topic hubs, 6 `/go/` funnels, `noindex` + canonical correct on funnels, sitemap at 75
  URLs with 48 academy and zero `/go/`, VideoObject schema present.
- **`academy` Vercel project deleted.** academy.naironai.com now returns 404 (Luka's call:
  full retirement over a 301, backlink loss accepted and reaffirmed). The SPA source is
  still on disk at `~/.superset/projects/academy` — nothing is unrecoverable.
- Note for anyone deploying: the live project is **`site`**, not `nairon-website`.
  `nairon-website` is a stale Nitro project on `apps/web` from the old site and serves
  nothing. Do not deploy there.

### Lead capture — WIRED AND VERIFIED 2026-07-26
All three forms (contact, newsletter, six magnet funnels) post through one helper,
`site/src/lib/leads.ts`, to Luka's Convex relay, which forwards into Slack.

- Payload is a **Slack incoming-webhook message**: `text` fallback, `blocks` with the
  submitted fields as a two-column section plus a context line (page, referrer,
  timestamp). Raw fields also ride along under `lead` so the handler can store them
  without parsing prose out of `blocks`.
- `PUBLIC_MAGNET_WEBHOOK`, `PUBLIC_CONTACT_WEBHOOK`, `PUBLIC_NEWSLETTER_WEBHOOK` are set
  on the `site` project across production, preview and development. The URL is NOT in
  source control. They are `PUBLIC_` vars, so changing one needs a redeploy, not just an
  env edit.
- Verified end to end: a real submission on the live `/go/ai-fundamentals` was captured
  over CDP and the outgoing POST carried the correct Slack payload.
- **Known limitation, accepted:** the endpoint returns no `Access-Control-Allow-Origin`
  and 404s on `OPTIONS`, so delivery uses `mode: 'no-cors'` and the response is opaque. A
  failed POST is indistinguishable from a successful one. Callers treat delivery as
  best-effort and never block the visitor; the magnet funnels hand over the file
  regardless. If delivery reliability starts to matter, have the Convex endpoint return
  CORS headers and the client can then detect and retry failures.
- **Security note:** a `PUBLIC_` var is baked into the client bundle, so the webhook URL
  is visible in page source and anyone can POST to it. Acceptable for form capture (worst
  case is Slack spam). If that becomes a problem, move the POST behind a Vercel function
  and keep the URL server-side.

### Start here next
1. **The six magnet PDFs are stubs** (`public/magnets/*.pdf`, two-line placeholders).
   Deliberately left as stubs by Luka for now. Contents specced in
   `src/content/magnets/*.md` — each `benefits` list is the promised table of contents.
2. Optional: bottom-of-funnel SEO is still unbuilt. The academy ranks for students
   ("what is a token"); the money queries ("AI answering service for HVAC") belong on the
   industry pages and nobody has written them.
3. Cosmetic: `site/src/components/sections/SubNav.astro` is referenced by zero files —
   dead since the nav rework. Delete deliberately.

## Previous state (2026-07-23) — HERO FILM STORYBOARD

## Current state (2026-07-24) — WEBSITE: industry pages live
- **Three industry pages built** (Luka's spec: structure of the Legora "industry" frame on the Paper Inspiration page — title, wide moodboard hero, the 3 landing use-case sections, industry FAQ, footer, nothing else): `/industries/solar`, `/industries/hvac`, `/industries/property-management`. Template: `site/src/pages/industries/[slug].astro`; per-industry copy/hero/FAQ in `site/src/content/industries/*.md` (schema in content.config.ts). See DECISIONS #43.
- **Industries consolidated to the real three everywhere** — the 7 stale placeholder industries (no HVAC) were removed from the nav dropdown, footer, and content collection. Nav model now lives in `site/src/data/nav.ts` (shared). `Nav.astro` has a `solid` prop for white-top subpages; `FAQ.astro` takes `faqs`/`sub` props (landing defaults unchanged).
- Headlines = the approved WhoItsFor industry descriptions; FAQ answers = landing FAQ + use-case body copy, verbatim. Hero images = the approved landing coverflow card photos (PM is a portrait cropped to the wide band via `heroPosition`).
- **Use cases are per-industry (Luka's follow-up): 3 cards per industry, one of each panel type (chat / dispatch / table).** The card matching the landing section is ported verbatim; the 6 new cards (solar inspections + PTO tracker, HVAC quotes + renewals, PM leasing + vendor dispatch) reuse the same panel formats with industry content. Data: `site/src/data/industryUseCases.ts`; component: `IndustryUseCases.astro` (parameterized copy of UseCases — statuses read from data-s1..s4/data-final; middle row flips via CSS `order`). Landing `UseCases.astro` untouched. New-card photos from already-approved pool only; person cards use `/photos/avatar-engineer.webp` (solar crew lead) and `/photos/avatar-tech.webp` (PM plumber).
- Verified by screenshot desktop 1440 + mobile 390 (all 3 pages), use-case choreography plays, FAQ accordion works, landing intact, `astro build` clean (10 pages).
- **Concurrent work note:** another session extracted the nav into `Nav.astro` (fixed, scroll-aware) + `BookCall.astro` mid-build; integrated with it (industry pages use `<Nav solid />`). `SubNav.astro` is currently UNUSED by the industry pages — that session was still editing it at handoff; delete or repurpose deliberately.
- Open: WhoItsFor "Read more" on the landing doesn't yet link to the industry pages; industry hero images could later swap to purpose-shot wide moodboard frames (0.12 cr Soul lane) if Luka wants unique heroes vs the card photos.

## Current state (2026-07-23)
- **The hero video is now the active workstream.** Storyboard lives on Paper page "Hero Movie Story board" (file 01KXXDWD95NYZ94ANGBQA0W8JK, page 5-0): Luka's Legora scene-by-scene reference row on top, the Nairon film row below it, candidate variants stacked in columns under each scene caption.
- **FILM SCOPE established** (STYLE-BIBLE.md section + DECISIONS #40): six stills rules stripped for film only (greenery/aerials, anonymity/faces, smiling-models, vehicle avoids, hands-close-ups, Block B as film lane); binding set unchanged (text rule, sunrise recipe, humble-father, never-up camera, bare-headed, phone-screen grammar, plausibility). UI beats = glass-plate technique: generated textless glass plates (soul_cinematic — genre routing note) + built type composited in Paper; approved by Luka ("looks like its real liquid").
- **Scene verdicts are now formalized: `video/SHOT-LIST.md` is the film's spec artifact** (Luka's green-dot + verbal pass, 2026-07-24; DECISIONS #41). Eleven scenes LOCKED (0,1,2,3,4,5,6,7,11,12,13-ok-for-now); THREE OPEN: S8 redo (front of ringing phone face-up on toolkit, camera down — awaits Luka's drawing in the column-08 frame), S9 + S10 redesign on the phone-shaped glass pane motif from Scene 06 V2 (AI answer transcription → job booked → ~$300 earned). Scenes 14–16 not yet reviewed, 17 unwritten. Read SHOT-LIST.md before any film work.
- **Delivery**: all keepers in ~/Downloads/nairon-moodboard/ (v80–v95 prefixed); every generation round logged in brand/images/LEDGER.md.
- **Page layout (Luka's cleanup instruction, 2026-07-24: "i need things to follow the storyboard so i can overview everything")**: the storyboard page 5-0 holds ONLY the Legora reference row + caption row + variant tile columns. All 15 full-size 1920×1080 UI comp artboards (the editable sources for the UI tiles — V1/V2/V3 per scene) live on their own page **"Hero Film — UI Comps" (6-0)**, gridded one column per scene (03/06/09/10/14/15/16), V1 top row y=100, V2 y=1400, S03 V3 y=2700. Scene 09 V1 was recovered from the Inspiration page (active-page-drift bug) during this move. Never place full-size comps back on 5-0.
- **Open**: Scene 17 ending unwritten (Legora ends on humans talking); scenes 18+ (Legora has 24 beats, ours 18); recurring-face identity locks at stage-2 reference-model pass (v82/v87/v92 evidence — mandatory before clips); video-clip generation needs Luka's per-run cost approval; 16:9 vs 3:2 test at first film-frame round.
- **Pipeline agreed**: Soul blueprint (done for 0–16) → Luka verdicts per column → stage-2 reference/upscale pass (costed approval) → motion (AE/gen-video split per beat).
- **Known Paper issue (2026-07-24): tile image assets can die silently.** paper-asset uploads sometimes don't persist server-side — tiles then show a grey missing-file placeholder on Luka's next load (17 tiles hit at once: all 8 v95 + 9 older incl. six UI composites). Detection: `find_nodes` filter `background-image` ~ `*data:image/svg+xml*` on page 5-0. Fix: re-apply `backgroundImage` via `update_styles` ONE node per call (bulk write_html is where uploads failed), sourcing files from the session scratchpad only — the Paper server cannot read `~/Downloads` (macOS privacy), copy into scratchpad first. UI composite sources are re-exportable anytime from their full-size artboards (y=3200/4500 rows).

## Current state (2026-07-19)
- **Nairon brand imagery generation now runs as a skill: `nairon-brand-imagery`** (`.claude/skills/nairon-brand-imagery/SKILL.md`). Invoke it — or just ask for more brand imagery — to continue the exact recipe, registers, and delivery workflow built up across rounds v16–v56.
- **Doctrine and full round-by-round history live in `brand/images/`:** `brand/images/STYLE-BIBLE.md` (frozen blocks, registers, standing rules — the live spec, edited spec-first before every calibration) and `brand/images/LEDGER.md` (every round v1–v56: verdict quotes, keeps/flags, kills, learnings, cost). Read both before generating anything new.
- **Generation lane: Higgsfield MCP direct, soul_location ONLY at 0.12 cr** for all brand frames (CLAUDE.md cost cap). Playwriter/hf-unlimited lane retired; CLI banned.
- **Current reference grade (as of v56): the balanced true-summer-blue DOC block** — whites bright but textured, sky unmistakably blue (deepest at top, softening down, never navy, never washed white), navy wardrobe + glass as blue reinforcement. Reference frames: v49-piggyback-blue / v49-shoulders-blue / v49-hall-race-blue (scenes), v52-copper-oak (object close-ups).
- **All curation happens in ~/Downloads/nairon-moodboard/** — ~211 candidates delivered across v16–v56: worker/HVAC/solar scenes, PM lived-in-family scenes, and single-object close-ups (Register 5).
- **Next:** Luka curates the folder item by item → winners toward his Figma moodboard (frame 9:63 in SFYeeTbVlZ04yIDq8Podp4) → Gate 2.
- **Open note:** the rejected v34-*.png files (the dark composited-figure register Luka killed with "no these look really really bad") are still sitting in ~/Downloads/nairon-moodboard/ — ask Luka whether to pull them.
- Total spend across v16–v56: running estimate ~30 cr of 3,000 — see brand/images/LEDGER.md for exact per-round costs.

## Done
- PROCESS.md + CLAUDE.md written (the operating system). Artifact one-pager published (court-filter rewrite v2).
- Skills installed: `brand-discovery`, `brand-visual-identity` (project-level, .claude/skills + .agents/skills).
- **Phase 0 interview complete.** All 8 discovery modules written to `brand/discovery/modules/`, state.json closed out.
- `brand/STRATEGY.md` drafted from the brandbook.

## In flight (updated end of 2026-07-13)
- **Working Figma file is now Luka's own:** https://www.figma.com/design/SFYeeTbVlZ04yIDq8Podp4/Nairon-New-Website — frame "Nairon Moodboard" (node 9:63). My draft file (prRLDv1sXNrzQrZOK8UhA7) is superseded; do not work there.
- All 15 template slots were swapped to Nairon photos; **Luka then deleted 8** (all soft/dusk/still-life frames) and kept 7 crisp daylight shots + doorway silhouette. Verbatim: the deleted ones "seem like good scenes for the video... tesla and legora are much sharper."
- STYLE-BIBLE Block A amended: sharpness terms in, film grain out. Register A model = nano_banana_pro at 4k (>10MB PNGs — convert to JPEG q90 via sips before Figma upload, 10MB limit).
- **Replacement loop running, one candidate at a time, delivered loose right of his frame (x≈5024, y≈-10038):** #1 = a04b-heat-pump-nbp (node 18:2) — sharp, but reads as battery cabinet, no fan grille; awaiting his verdict. Board still missing: HVAC representation, material macro, and 5 more slots he emptied.

## Previous state
- **Phase 1: moodboard v1 assembled in Figma, awaiting Luka's curation.** File: "Nairon Moodboard" https://www.figma.com/design/prRLDv1sXNrzQrZOK8UhA7 (board node 2:2). Contents: 10 Register A daylight photos (`brand/moodboard/candidates-a/`) + 8 built UI/graphic tiles (`brand/moodboard/tiles/`, source tiles.html) + 3 Register B dusk accents from round 1. Round 1 (16 cinematic frames, `candidates/`) reclassified as film-scene candidates for Phase 5.
- Imagery doctrine is now two-register (STYLE-BIBLE blocks A + B). Luka's verdict on round 1: video scenes, not brand-kit imagery.
- Higgsfield credits: ~1.9 of 5 remain (26 generations at 0.12 each so far).

## Start here next
0. **Working mode (Luka's instruction, 2026-07-13): the moodboard is curated by Luka one item at a time.** Do not assemble or rearrange the board. Respond to single-item requests only (one re-roll, one new subject, one tile edit per request). See memory: feedback_taste-steps-one-by-one.
0b. **Figma access issue:** file lives in Drafts of "Luka Eric's team" (luka.eric.2000@gmail.com — the account the Figma MCP is authenticated as). Luka got ERR_FILE_NOT_FOUND — likely logged into a different Figma account. Unresolved at session end; resolve before curation.
1. Luka curates the Figma moodboard (delete/rearrange/request re-rolls). Apply requests: re-rolls use the matching STYLE-BIBLE block verbatim; tiles edit via tiles.html → re-screenshot (serve dir on localhost, playwriter can't open file:// URLs) → re-upload via upload_assets with nodeId to swap fills.
2. **Gate 2 = his sign-off on the Figma board + v3 system sheet.** On approval: mark DESIGN.md + STYLE-BIBLE.md LOCKED, copy approved images into brand/moodboard/ as anchors, strike Phase 1 in PROCESS.md Progress + the process artifact, then open Phase 2 (outline & copy) and Phase 4 (film brief) in parallel.
3. Copper is on probation — get explicit keep/veto at Gate 2.
4. Keep the strikethrough progress current in PROCESS.md and the process artifact (Luka's standing instruction).

## Open questions
- HVAC: featured with zero proof/pipeline — accepted by Luka for now.
- Rushed-agent story (one concrete example) — collect during Phase 2 copywriting.
- Higgsfield MCP disconnected mid-session on 2026-07-13 — reconnect before Phase 1 generation work.
