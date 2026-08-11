#!/usr/bin/env node
// Pull a YouTube video into the academy content collection.
//
//   node scripts/ingest-video.mjs <youtube-url> [--slug custom-slug]
//                                              [--topic ai-fundamentals]
//                                              [--level basic|advanced|expert]
//                                              [--magnet ai-fundamentals]
//                                              [--order 3]
//                                              [--force]
//
// Produces:
//   src/content/academy/<slug>.md      draft lesson (frontmatter + transcript)
//   public/academy-thumbs/<id>.jpg     video thumbnail
//   .ingest/<slug>.txt                 flat transcript for the rewrite pass
//
// The `article` body is left as a TODO marker on purpose — a model rewrites the
// transcript into the article against docs/ARTICLE-TEMPLATE.md. Everything
// mechanical (metadata, captions, thumbnail, slug) is handled here.

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseVtt, toBlocks, renderPlain } from './lib/transcript.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src/content/academy');
const THUMB_DIR = join(ROOT, 'public/academy-thumbs');
// Small grid-card variant (YouTube's own 480x360 hqdefault) — used by LessonCard,
// the homepage rail, and search results instead of the full maxresdefault pull.
// See DECISIONS #57.
const THUMB_SMALL_DIR = join(ROOT, 'public/academy-thumbs-sm');
const WORK_DIR = join(ROOT, '.ingest');

// Series prefix in a video title → the academy topic it belongs to.
const SERIES_TOPIC = [
  [/^AI Fundamentals:\s*/i, 'ai-fundamentals'],
  [/^AI Models Explained:\s*/i, 'ai-models'],
  [/^Claude Explained:\s*/i, 'claude'],
];

const STOPWORDS = new Set(['a', 'an', 'the', 'is', 'are', 'to', 'of', 'in', 'on', 'for', 'and']);

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function parseArgs(argv) {
  const out = { flags: {}, positional: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) out.flags[key] = true;
      else {
        out.flags[key] = next;
        i++;
      }
    } else out.positional.push(a);
  }
  return out;
}

function yt(args) {
  return execFileSync('yt-dlp', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

/** Classify a video into { topic, bareTitle } from its series prefix. */
function classify(title) {
  for (const [re, topic] of SERIES_TOPIC) {
    if (re.test(title)) return { topic, bareTitle: title.replace(re, '').trim() };
  }
  return { topic: 'ai-briefing', bareTitle: title };
}

/**
 * Slug rule: drop the series prefix, slugify the rest. A one-word remainder
 * ("Claude", "Gemini") is too generic to own a URL, so it gets the topic as a
 * prefix — `ai-models-claude` rather than `claude`.
 */
function deriveSlug(topic, bareTitle) {
  const base = slugify(bareTitle);
  const meaningful = base.split('-').filter((w) => !STOPWORDS.has(w));
  if (meaningful.length <= 1) return `${topic}-${base}`;
  return base;
}

function esc(s) {
  return String(s).replace(/"/g, '\\"');
}

async function main() {
  const { flags, positional } = parseArgs(process.argv.slice(2));
  const url = positional[0];
  if (!url) {
    console.error('usage: node scripts/ingest-video.mjs <youtube-url> [--slug s] [--topic t] [--level l] [--magnet m] [--order n] [--force]');
    process.exit(1);
  }

  mkdirSync(CONTENT_DIR, { recursive: true });
  mkdirSync(THUMB_DIR, { recursive: true });
  mkdirSync(WORK_DIR, { recursive: true });

  console.log('→ fetching metadata');
  const meta = JSON.parse(yt(['--skip-download', '--dump-single-json', '--no-warnings', url]));

  const videoId = meta.id;
  const title = meta.title;
  const { topic: autoTopic, bareTitle } = classify(title);
  const topic = flags.topic || autoTopic;
  const slug = flags.slug || deriveSlug(topic, bareTitle);
  const target = join(CONTENT_DIR, `${slug}.md`);

  if (existsSync(target) && !flags.force) {
    console.error(`✗ ${slug}.md already exists — pass --force to overwrite`);
    process.exit(1);
  }

  // upload_date is YYYYMMDD; the collection schema wants an ISO date.
  const d = meta.upload_date;
  const published = d ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}` : '';

  console.log('→ fetching captions');
  const subDir = join(WORK_DIR, `sub-${videoId}`);
  rmSync(subDir, { recursive: true, force: true });
  mkdirSync(subDir, { recursive: true });
  try {
    yt([
      '--skip-download',
      '--write-auto-subs',
      '--write-subs',
      '--sub-langs',
      'en.*',
      '--sub-format',
      'vtt',
      '--no-warnings',
      '-o',
      join(subDir, '%(id)s'),
      url,
    ]);
  } catch {
    console.warn('  ! caption download failed — continuing without a transcript');
  }

  // Prefer the original English track over machine translations.
  const subFiles = existsSync(subDir) ? readdirSync(subDir).filter((f) => f.endsWith('.vtt')) : [];
  const chosen =
    subFiles.find((f) => f.includes('.en-orig.')) ?? subFiles.find((f) => f.includes('.en.')) ?? subFiles[0];

  let blocks = [];
  let plain = '';
  if (chosen) {
    const lines = parseVtt(readFileSync(join(subDir, chosen), 'utf8'));
    blocks = toBlocks(lines);
    plain = renderPlain(lines);
    console.log(`  captions: ${lines.length} lines → ${blocks.length} blocks (${chosen})`);
  } else {
    console.warn('  ! no caption track found');
  }

  console.log('→ fetching thumbnail');
  const thumbPath = join(THUMB_DIR, `${videoId}.jpg`);
  try {
    const res = await fetch(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);
    const ok = res.ok ? res : await fetch(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
    writeFileSync(thumbPath, Buffer.from(await ok.arrayBuffer()));
  } catch {
    console.warn('  ! thumbnail download failed');
  }

  console.log('→ fetching small thumbnail (grid cards)');
  mkdirSync(THUMB_SMALL_DIR, { recursive: true });
  const thumbSmallPath = join(THUMB_SMALL_DIR, `${videoId}.jpg`);
  try {
    const res = await fetch(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
    const ok = res.ok ? res : await fetch(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`);
    writeFileSync(thumbSmallPath, Buffer.from(await ok.arrayBuffer()));
  } catch {
    console.warn('  ! small thumbnail download failed');
  }

  const frontmatter = [
    '---',
    `title: "${esc(bareTitle)}"`,
    `seoTitle: "${esc(bareTitle)}"`,
    `description: "TODO — 155-char meta description"`,
    `youtubeId: ${videoId}`,
    `topic: ${topic}`,
    `level: ${flags.level || 'basic'}`,
    `order: ${flags.order || 0}`,
    `duration: ${Math.round(meta.duration || 0)}`,
    published ? `publishedAt: ${published}` : null,
    `channel: "${esc(meta.uploader || '')}"`,
    flags.magnet ? `magnet: ${flags.magnet}` : null,
    'takeaways:',
    '  - "TODO"',
    '  - "TODO"',
    '  - "TODO"',
    'transcript:',
    // JSON string literals are valid YAML, so this needs no escaping logic.
    ...blocks.map((b) => `  - { t: ${b.t}, text: ${JSON.stringify(b.text)} }`),
    '---',
  ]
    .filter((l) => l !== null)
    .join('\n');

  const body = `TODO — rewrite the transcript into the article. See docs/ARTICLE-TEMPLATE.md.\n`;
  writeFileSync(target, `${frontmatter}\n\n${body}`);
  writeFileSync(join(WORK_DIR, `${slug}.txt`), plain);
  rmSync(subDir, { recursive: true, force: true });

  console.log(`\n✓ ${slug}`);
  console.log(`  content   src/content/academy/${slug}.md`);
  console.log(`  thumb     public/academy-thumbs/${videoId}.jpg`);
  console.log(`  raw       .ingest/${slug}.txt   (${plain.length} chars)`);
  console.log(`  topic     ${topic} · level ${flags.level || 'basic'} · ${Math.round((meta.duration || 0) / 60)} min`);
  console.log('\n  Next: rewrite the article + takeaways + description in the frontmatter.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
