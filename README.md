# Nairon Website

Official website for Nairon.

## Property PDF Generator

**Route:** `/for/real-estate/property-pdf`

A free tool for real estate brokerages that generates a 5-page luxury property brochure PDF from any Zillow listing URL in seconds.

### How It Works

```
Zillow URL → Firecrawl (scrape) → HTML Parser (extract data)
                                        ↓
                                  Image URLs + Listing Data
                                        ↓
                              ┌─────────┴──────────┐
                              ↓                    ↓
                     fal.ai Moondream 3      OpenAI gpt-4o-mini
                     (classify images)    (neighborhood description)
                              ↓                    ↓
                              └─────────┬──────────┘
                                        ↓
                              Smart Image Selection
                              (best photo per slide)
                                        ↓
                              @react-pdf/renderer
                              (5-page landscape PDF)
```

### Pipeline

1. **Scrape** — Firecrawl (`/v2/scrape` with `rawHtml` format) fetches the full Zillow page HTML including embedded JSON and script tags. Retries up to 3 times on transient proxy failures.

2. **Parse** — Regex-based extraction pulls listing data from multiple sources in the HTML:
   - JSON-LD structured data (`<script type="application/ld+json">`)
   - OpenGraph meta tags (`og:title`, `og:description`, `og:image`)
   - Embedded JavaScript JSON blobs (`"price"`, `"bedrooms"`, `"bathrooms"`, `"livingArea"`, etc.)
   - URL path parsing as last resort for city/state/zip

3. **Image Extraction** — All `photos.zillowstatic.com/fp/` URLs are collected, grouped by photo hash, and the highest resolution variant is kept for each unique photo (e.g., `cc_ft_1536` over `cc_ft_576`). Up to 20 images are retained.

4. **Image Validation** — Parallel `HEAD` requests filter out any 404'd or access-restricted image URLs.

5. **Image Classification** — [fal.ai](https://fal.ai) Moondream 3 (tiny vision model) classifies each image in parallel: `exterior`, `living_room`, `kitchen`, `bedroom`, `bathroom`, `dining`, `backyard`, `garage`, `pool`, `aerial`, or `other`.

6. **Neighborhood Description** — OpenAI `gpt-4o-mini` generates a 3-4 sentence human-sounding description of the area based on the listing's location and property details. Falls back to a static template if no API key.

7. **Smart Image Selection** — Each PDF slide gets the best-fit photo based on classified tags:
   | Slide | Preferred Tags | Purpose |
   |-------|---------------|---------|
   | Cover | exterior, aerial | Hero shot |
   | Overview | living_room, kitchen, dining | Interior wide |
   | About | kitchen, dining, living_room | Lifestyle |
   | Highlights | bedroom, bathroom | Features |
   | Location | backyard, pool, aerial, exterior | Outdoor/area |

   Images are deduplicated across slides — no repeats.

8. **PDF Rendering** — `@react-pdf/renderer` generates a 5-page landscape (792×612) PDF client-side with built-in fonts (Times-Bold, Helvetica).

### Cost Per PDF Generation

| Service | What | Cost |
|---------|------|------|
| Firecrawl | 1 scrape (rawHtml) | ~$0.002 |
| fal.ai Moondream 3 | ~20 image classifications | ~$0.007 |
| OpenAI gpt-4o-mini | 1 neighborhood description | ~$0.001 |
| **Total** | | **~$0.01 per PDF** |

At scale (1,000 PDFs): ~$10 total.

### Environment Variables

```bash
# apps/web/.env
FIRECRAWL_API_KEY=fc-...        # Firecrawl API key (scraping)
OPENAI_API_KEY=sk-proj-...      # OpenAI API key (neighborhood descriptions)
FAL_KEY=...                     # fal.ai API key (image classification)
SLACK_WEBHOOK_URL=...           # Optional: Slack notification on PDF generation
```

### Tech Stack

- **Frontend:** TanStack Start, React 19, TailwindCSS 4
- **PDF:** @react-pdf/renderer (client-side generation)
- **Scraping:** Firecrawl API v2 (JS rendering, anti-bot bypass)
- **Vision AI:** fal.ai Moondream 3 (image classification)
- **Text AI:** OpenAI gpt-4o-mini via AI SDK (neighborhood descriptions)
- **Caching:** In-memory Map with 1-hour TTL (saves API credits during dev)
