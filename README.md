# Nairon Website

Official website for Nairon.

## Property PDF Generator

**Route:** `/for/real-estate/property-pdf`

A free tool for real estate brokerages that generates a 5-page luxury property brochure PDF from any Zillow listing URL.

### How It Works

```
User pastes Zillow URL
        ↓
Convex mutation creates job → returns immediately
        ↓
Convex background action runs full pipeline:
        ↓
Firecrawl (scrape) → HTML Parser (extract data)
                          ↓
                    Image URLs + Listing Data
                          ↓
              ┌─────────────────────────┐
              ↓                         ↓
       fal.ai Moondream 3           OpenAI
       (classify all 20 imgs)       gpt-4o-mini
                                    (neighborhood
                                     description)
              ↓                         ↓
              └─────────────────────────┘
                          ↓
                Smart Image Selection
                (best photo per slide)
                          ↓
          Frontend reactively updates via Convex subscription
                          ↓
                @react-pdf/renderer
                (5-page landscape PDF)
```

### Architecture

The pipeline runs as a **Convex background action** — the user never waits synchronously. The frontend subscribes to job status via Convex's reactive queries (no polling).

- **< 25s** — Job completes, user sees download button immediately
- **> 25s** — Email capture appears: *"Leave your email, we'll send the PDF when it's ready"*
- **Email delivery** — Resend sends the PDF link when the job completes

### Pipeline

1. **Create Job** — Frontend calls `createJob` Convex mutation with the Zillow URL. Returns a job ID immediately. The mutation fires off a background action via `ctx.scheduler.runAfter(0, ...)`.

2. **Scrape** — Firecrawl (`/v2/scrape` with `rawHtml` format) fetches the full Zillow page HTML including embedded JSON and script tags. Retries up to 3 times on transient proxy failures.

3. **Parse** — Regex-based extraction pulls listing data from multiple sources in the HTML:
   - JSON-LD structured data (`<script type="application/ld+json">`)
   - OpenGraph meta tags (`og:title`, `og:description`, `og:image`)
   - Embedded JavaScript JSON blobs (`"price"`, `"bedrooms"`, `"bathrooms"`, `"livingArea"`, etc.)
   - URL path parsing as last resort for city/state/zip

4. **Image Extraction** — All `photos.zillowstatic.com/fp/` URLs are collected, grouped by photo hash, and the highest resolution variant is kept for each unique photo (e.g., `cc_ft_1536` over `cc_ft_576`). Up to 20 images are retained.

5. **Image Validation** — Parallel `HEAD` requests filter out any 404'd or access-restricted image URLs.

6. **Image Classification** — [fal.ai](https://fal.ai) Moondream 3 classifies all 20 images sequentially: `exterior`, `living_room`, `kitchen`, `bedroom`, `bathroom`, `dining`, `backyard`, `garage`, `pool`, `aerial`, `floor_plan`, `icon`, or `other`. Non-property images (floor plans, icons, AR markers, agent headshots) are excluded from slide selection.

7. **Neighborhood Description** — OpenAI `gpt-4o-mini` generates a 3-4 sentence human-sounding description of the area. Falls back to a static template if no API key.

9. **Smart Image Selection** — Each PDF slide gets the best-fit photo based on classified tags:
   | Slide | Preferred Tags | Purpose |
   |-------|---------------|---------|
   | Cover | exterior, aerial | Hero shot |
   | Overview | living_room, kitchen, dining | Interior wide |
   | About | dining, kitchen, bedroom | Lifestyle |
   | Highlights | bedroom, bathroom | Features |
   | Location | backyard, pool, aerial, exterior | Outdoor/area |

   Images are deduplicated across slides — no repeats.

10. **PDF Rendering** — `@react-pdf/renderer` generates a 5-page landscape (792x612) PDF client-side with built-in fonts (Times-Bold, Helvetica).

### Cost Per PDF Generation

| Service | Model / Endpoint | What | Unit Price | Units | Cost |
|---------|-----------------|------|------------|-------|------|
| Firecrawl | `/v2/scrape` (rawHtml) | Scrape Zillow listing page | ~$0.002/scrape | 1 | $0.002 |
| fal.ai | Moondream 3 (`moondream3-preview/query`) | Classify each listing photo | ~$0.0002/query | 20 | $0.004 |
| OpenAI | `gpt-4o-mini` | Neighborhood description (~300 tokens) | $0.15/1M input + $0.60/1M output | 1 | $0.001 |
| Convex | Mutations, queries, actions | Job orchestration + real-time subscriptions | Free tier (25K calls/mo) | ~8 | $0.000 |
| Resend | Transactional email | PDF-ready notification (optional) | Free tier (100/mo), then ~$0.001/email | 0–1 | $0.000 |
| **Total** | | | | | **~$0.007/PDF** |

#### At Scale

| Users | PDFs | Firecrawl | fal.ai | OpenAI | Convex | Total |
|-------|------|-----------|--------|--------|--------|-------|
| 100 | 100 | $0.20 | $0.40 | $0.10 | Free tier | **~$0.70** |
| 1,000 | 1,000 | $2.00 | $4.00 | $1.00 | ~$0.50 | **~$7.50** |
| 10,000 | 10,000 | $20.00 | $40.00 | $10.00 | ~$5.00 | **~$75.00** |

> **Note:** Convex is free up to 25K function calls/month. At 1,000+ PDFs/month you'll likely exceed the free tier (~8 function calls per PDF). Resend is free for the first 100 emails/month.

### Environment Variables

```bash
# apps/web/.env (frontend)
VITE_CONVEX_URL=https://...    # Convex deployment URL
VITE_CONVEX_SITE_URL=https://... # Convex site URL

# Convex dashboard (backend — set via `npx convex env set`)
FIRECRAWL_API_KEY=fc-...        # Firecrawl API key (scraping)
OPENAI_API_KEY=sk-proj-...      # OpenAI API key (neighborhood descriptions)
FAL_KEY=...                     # fal.ai API key (image classification)
SLACK_WEBHOOK_URL=...           # Optional: Slack notification on PDF generation
```

### Tech Stack

- **Frontend:** TanStack Start, React 19, TailwindCSS 4
- **Backend:** Convex (reactive BaaS, background actions, real-time subscriptions)
- **PDF:** @react-pdf/renderer (client-side generation)
- **Scraping:** Firecrawl API v2 (JS rendering, anti-bot bypass)
- **Vision AI:** fal.ai Moondream 3 (image classification)
- **Text AI:** OpenAI gpt-4o-mini (neighborhood descriptions)
- **Email:** Resend via @convex-dev/resend (async PDF delivery)
