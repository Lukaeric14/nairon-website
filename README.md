# Nairon Website

Official website for Nairon.

## Local Development

### Prerequisites

- Bun 1.2+
- A Convex account logged in locally

### First-Time Setup

```bash
bun install
./scripts/setup-env.sh
```

`./scripts/setup-env.sh` creates `apps/web/.env.local`, not `apps/web/.env`. The tracked `apps/web/.env.example` is only a template and does not contain a live Convex deployment URL.

### Recommended Startup Flow

Start the backend first so Convex can provision or attach a dev deployment and write the real deployment URLs into the repo root `.env.local`.

Terminal 1:

```bash
cd packages/backend
bun run dev
```

This command intentionally jumps to the repo root and runs Convex against the repo-root `convex/` directory. Do not run a raw `bunx convex dev` inside `packages/backend`, because that creates a second empty Convex project under `packages/backend/convex`.

Wait until Convex prints that functions are ready and root `.env.local` contains real `CONVEX_URL` and `CONVEX_SITE_URL` values.

Terminal 2:

```bash
cd apps/web
bun run dev
```

Open `http://localhost:3001`.

### Single-Command Startup

After the backend has been started at least once, you can also run everything from the repo root:

```bash
bun run dev
```

The web app now runs `scripts/sync-convex-env.mjs` before Vite starts. That script copies the active Convex deployment from the repo root into `apps/web/.env.local`, so the browser does not boot with a placeholder Convex deployment.

### Troubleshooting

- If the frontend ever boots with a placeholder Convex URL, it now fails fast with a direct setup error instead of the old Convex parser crash. Start the backend from `packages/backend`, then restart the web app.
- If Convex says it cannot find `pdfJob:createJob`, you likely started Convex from the wrong directory. Use `cd packages/backend && bun run dev`, not `cd packages/backend && bunx convex dev`.
- `apps/web/.env.local` must contain real `VITE_CONVEX_URL` and `VITE_CONVEX_SITE_URL` values. They should match the `CONVEX_URL` and `CONVEX_SITE_URL` in the repo root `.env.local`.
- The safest manual startup path is always: backend first in `packages/backend`, web second in `apps/web`.

## Property PDF Generator

**Route:** `/for/real-estate/property-pdf`

A free tool for real estate brokerages that generates a 5-page luxury property brochure PDF from any Zillow listing URL.

### How It Works

```mermaid
flowchart TD
    A[User pastes Zillow URL] --> B[Convex mutation createJob]
    B --> C[Convex background action processJob]
    C --> D{Bright Data dataset configured?}
    D -->|Yes| E[Bright Data Zillow dataset scrape]
    D -->|No or scrape fails| F[Fallback HTML scraping chain]
    F --> F1[Firecrawl rawHtml]
    F1 -->|blocked or empty| F2[Jina Reader]
    F2 -->|blocked or empty| F3[Direct fetch]
    E --> G[Structured listing + photo URLs]
    F3 --> H[Parse Zillow HTML]
    G --> I[Validate photo URLs]
    H --> I
    I --> J[Parallel AI enrichment]
    J --> J1[fal.ai classifies listing photos]
    J --> J2[OpenAI generates neighborhood copy]
    J1 --> K[Store completed listing in Convex]
    J2 --> K
    K --> L[Frontend subscribes to job status]
    L --> M[@react-pdf/renderer builds brochure]
    M --> N[Optional email + Slack notification]
```

### Architecture

The pipeline runs as a **Convex background action**. The frontend creates a job immediately, then subscribes to job status via Convex's reactive queries.

The current production preference order is:

1. **Bright Data Zillow dataset** for structured listing data and image URLs
2. **HTML fallback chain** only if Bright Data is unavailable or errors:
   - Firecrawl
   - Jina Reader
   - direct fetch

This matters because Zillow often serves anti-bot pages to generic HTML scrapers. The Bright Data dataset path is now the primary integration for reliability.

- **< 25s** — Job completes, user sees download button immediately
- **> 25s** — Email capture appears: *"Leave your email, we'll send the PDF when it's ready"*
- **Email delivery** — Resend sends the PDF link when the job completes

### Pipeline

1. **Create Job** — Frontend calls `createJob` Convex mutation with the Zillow URL. Returns a job ID immediately. The mutation fires off a background action via `ctx.scheduler.runAfter(0, ...)`.

2. **Primary Zillow Data Fetch** — If `BRIGHTDATA_API_KEY` is configured in Convex, the backend calls Bright Data’s Zillow dataset scraper (`/datasets/v3/scrape`) and maps the structured response into the internal `ZillowListing` shape.

3. **Fallback Zillow HTML Fetch** — If Bright Data is unavailable or errors, the backend falls back to HTML scraping. It tries Firecrawl first, then Jina Reader, then a direct fetch. If a response looks like an anti-bot page, that source is rejected and the chain continues.

4. **HTML Parse Fallback** — For HTML-based fallbacks, regex-based extraction pulls listing data from JSON-LD, OpenGraph tags, embedded JSON blobs, and Zillow image URLs.

5. **Image Validation** — Parallel `HEAD` requests filter out invalid or access-restricted photo URLs before downstream AI work.

6. **Image Classification + Neighborhood Description** (run in parallel via `Promise.all`):
   - **Classification** — [fal.ai](https://fal.ai) Moondream 3 classifies listing photos into `exterior`, `living_room`, `kitchen`, `bedroom`, `bathroom`, `dining`, `backyard`, `garage`, `pool`, `aerial`, `floor_plan`, `icon`, or `other`. Non-property images are excluded from slide selection. Progress is reported to the frontend after each image.
   - **Neighborhood Description** — OpenAI `gpt-4o-mini` generates a 3-4 sentence neighborhood blurb. Falls back to a static template if no API key.

7. **Smart Image Selection** — Each PDF slide gets the best-fit photo based on classified tags:
   | Slide | Preferred Tags | Purpose |
   |-------|---------------|---------|
   | Cover | exterior, aerial | Hero shot |
   | Property Overview | living_room, kitchen, dining | Interior wide |
   | About This Property | dining, kitchen, bedroom, living_room | Lifestyle |
   | Features / At a Glance | bedroom, bathroom | Features |
   | Location & Neighborhood | backyard, pool, aerial, exterior | Outdoor/area |

   Images are deduplicated across slides — no repeats. Falls back to unused raw images in order if no tag match. Location slide has an Unsplash stock fallback.

8. **PDF Rendering** — `@react-pdf/renderer` generates a 5-page landscape (792×612) PDF client-side.

9. **Notifications** (post-completion):
   - **Email** — If the user left their email (appears after 25s), Resend sends a link to download the PDF.
   - **Slack** — If `SLACK_WEBHOOK_URL` is set, posts listing address, price, and URL to Slack.

### Verification Commands

Use the direct Bright Data probe when you want to verify the upstream Zillow extractor itself:

```bash
BRIGHTDATA_API_KEY=... bun run probe:zillow:brightdata:dataset
```

Use the end-to-end job smoke test when you want to verify the actual Convex pipeline after `BRIGHTDATA_API_KEY` has been set in Convex:

```bash
bun run verify:zillow
```

### Environment Variables

```bash
# repo root .env.local (written by Convex dev)
CONVEX_URL=https://...
CONVEX_SITE_URL=https://...

# apps/web/.env.local (frontend runtime)
VITE_CONVEX_URL=https://...    # Convex deployment URL
VITE_CONVEX_SITE_URL=https://... # Convex site URL

# Convex dashboard (backend — set via `npx convex env set`)
BRIGHTDATA_API_KEY=...          # Primary Zillow dataset scraper
BRIGHTDATA_DATASET_ID=gd_lfqkr8wm13ixtbd8f5  # Optional override; defaults to Zillow dataset ID in code
FIRECRAWL_API_KEY=fc-...        # Optional HTML fallback scraper
OPENAI_API_KEY=sk-proj-...      # OpenAI API key (neighborhood descriptions)
FAL_KEY=...                     # fal.ai API key (image classification)
SLACK_WEBHOOK_URL=...           # Optional: Slack notification on PDF generation
```

### Tech Stack

- **Frontend:** TanStack Start, React 19, TailwindCSS 4
- **Backend:** Convex (reactive BaaS, background actions, real-time subscriptions)
- **PDF:** @react-pdf/renderer (client-side generation)
- **Primary data source:** Bright Data Zillow dataset scraper
- **Fallback scrapers:** Firecrawl API v2, Jina Reader, direct fetch
- **Vision AI:** fal.ai Moondream 3 (image classification)
- **Text AI:** OpenAI gpt-4o-mini (neighborhood descriptions)
- **Email:** Resend via @convex-dev/resend (async PDF delivery)
