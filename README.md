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
              ┌───────────┼───────────┐
              ↓           ↓           ↓
       fal.ai Moondream  fal.ai    OpenAI
       (classify 10 imgs) Thera   gpt-4o-mini
                         (upscale  (neighborhood
                          5 imgs)  description)
              ↓           ↓           ↓
              └───────────┼───────────┘
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

6. **Image Classification** — [fal.ai](https://fal.ai) Moondream 3 classifies a sample of 10 images (from front, middle, and end of the array) in parallel: `exterior`, `living_room`, `kitchen`, `bedroom`, `bathroom`, `dining`, `backyard`, `garage`, `pool`, `aerial`, or `other`. Sampling ensures coverage of exterior shots (front), interior rooms (middle), and outdoor/aerial views (end).

7. **Image Upscaling** — [fal.ai](https://fal.ai) Thera upscales the 5 selected slide images to 2x resolution for print quality.

8. **Neighborhood Description** — OpenAI `gpt-4o-mini` generates a 3-4 sentence human-sounding description of the area. Falls back to a static template if no API key.

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

| Service | What | Cost |
|---------|------|------|
| Firecrawl | 1 scrape (rawHtml) | ~$0.002 |
| fal.ai Moondream 3 | ~10 image classifications | ~$0.004 |
| fal.ai Thera | 5 image upscales (2x) | ~$0.015 |
| OpenAI gpt-4o-mini | 1 neighborhood description | ~$0.001 |
| **Total** | | **~$0.022 per PDF** |

At scale (1,000 PDFs): ~$22 total.

### Environment Variables

```bash
# apps/web/.env (frontend)
VITE_CONVEX_URL=https://...    # Convex deployment URL
VITE_CONVEX_SITE_URL=https://... # Convex site URL

# Convex dashboard (backend — set via `npx convex env set`)
FIRECRAWL_API_KEY=fc-...        # Firecrawl API key (scraping)
OPENAI_API_KEY=sk-proj-...      # OpenAI API key (neighborhood descriptions)
FAL_KEY=...                     # fal.ai API key (classification + upscaling)
SLACK_WEBHOOK_URL=...           # Optional: Slack notification on PDF generation
```

### Tech Stack

- **Frontend:** TanStack Start, React 19, TailwindCSS 4
- **Backend:** Convex (reactive BaaS, background actions, real-time subscriptions)
- **PDF:** @react-pdf/renderer (client-side generation)
- **Scraping:** Firecrawl API v2 (JS rendering, anti-bot bypass)
- **Vision AI:** fal.ai Moondream 3 (image classification), fal.ai Thera (image upscaling)
- **Text AI:** OpenAI gpt-4o-mini (neighborhood descriptions)
- **Email:** Resend via @convex-dev/resend (async PDF delivery)
