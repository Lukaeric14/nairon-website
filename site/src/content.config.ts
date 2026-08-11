import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pageSchema = z.object({
  title: z.string(),
  tagline: z.string(),
  intro: z.string(),
  pains: z.array(z.string()),
  useCases: z.array(z.string()),
});

const solutions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/solutions' }),
  schema: pageSchema,
});

// ── AI Academy ────────────────────────────────────────────────────────────
// One lesson = one Nairon YouTube video.
//   • The markdown BODY is the rewritten, blog-worthy article — the thing that
//     ranks. Astro's markdown pipeline renders it.
//   • `transcript` is the cleaned caption track as timestamped blocks — the
//     thing that gives the page depth and long-tail coverage, and lets a reader
//     jump the player.
// scripts/ingest-video.mjs produces everything except the article itself, which
// is written against docs/ARTICLE-TEMPLATE.md.
const LEVELS = ['basic', 'advanced', 'expert'] as const;

const academySchema = z.object({
  title: z.string(),
  // Overrides the <title> tag when the lesson title alone is too terse to rank.
  seoTitle: z.string().optional(),
  description: z.string(),
  youtubeId: z.string(),
  topic: z.string(),
  level: z.enum(LEVELS).default('basic'),
  order: z.number().default(0),
  duration: z.number(), // seconds
  publishedAt: z.coerce.date().optional(),
  channel: z.string().optional(),
  // Slug of a lead magnet in the `magnets` collection. Drives the in-article
  // CTA and the /go funnel page this lesson points at.
  magnet: z.string().optional(),
  takeaways: z.array(z.string()).default([]),
  // Cleaned caption track. `t` is seconds from the start of the video.
  transcript: z.array(z.object({ t: z.number(), text: z.string() })).default([]),
});

const academy = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/academy' }),
  schema: academySchema,
});

const academyTopics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/academy-topics' }),
  schema: z.object({
    label: z.string(),
    description: z.string(),
    order: z.number().default(0),
  }),
});

// A lead magnet is shared across every lesson in its cluster — one asset per
// topic, not one per video. `file` is served from /public.
const magnets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/magnets' }),
  schema: z.object({
    title: z.string(),
    // Funnel-page headline; deliberately different from `title` (offer vs. asset).
    headline: z.string(),
    subhead: z.string(),
    description: z.string(),
    file: z.string(),
    format: z.string().default('PDF'),
    pages: z.number().optional(),
    // Video shown as the VSL at the top of the funnel page.
    youtubeId: z.string(),
    benefits: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
    quote: z.object({ text: z.string(), attribution: z.string() }).optional(),
  }),
});

export const collections = { solutions, academy, academyTopics, magnets };
