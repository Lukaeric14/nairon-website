#!/usr/bin/env node
// Batch-ingest every video from the three Nairon channels.
//
//   node scripts/backfill.mjs [--dry] [--only <slug-fragment>] [--limit n]
//
// Ordering comes from the channel listing (newest first), reversed so the
// oldest video in a series is lesson 01 — the order someone should actually
// watch them in. Levels are assigned per series; the AI Briefing channels have
// no curriculum order and get level `basic` with order 0.

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const CHANNELS = [
  { handle: 'NaironAI', label: 'Nairon AI' },
  { handle: 'luka-nairon', label: 'Luka Eric' },
  { handle: 'mahan-nairon', label: 'Mahan Salehi' },
];

// Lessons past the introductory block are conceptually harder; the split
// mirrors how the original academy graded them.
const ADVANCED = new Set([
  'what-is-an-orchestrator',
  'what-is-a-harness',
  'what-is-a-skill',
  'what-is-an-mcp',
  'what-is-a-vector-database',
  'what-is-agent-autonomy',
  'what-are-ai-frameworks',
  'what-is-effort-in-ai',
]);

// Every AI Fundamentals lesson hands off the same field guide.
const MAGNET_BY_TOPIC = { 'ai-fundamentals': 'ai-fundamentals' };

function parseArgs(argv) {
  const out = { flags: {} };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) out.flags[key] = true;
    else {
      out.flags[key] = next;
      i++;
    }
  }
  return out;
}

function listChannel(handle) {
  const raw = execFileSync(
    'yt-dlp',
    ['--flat-playlist', '--no-warnings', '--print', '%(id)s\t%(title)s', `https://www.youtube.com/@${handle}/videos`],
    { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
  );
  return raw
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [id, ...rest] = line.split('\t');
      return { id, title: rest.join('\t') };
    });
}

const { flags } = parseArgs(process.argv.slice(2));

// Build the work list first so ordering is decided before anything is written.
const work = [];
for (const channel of CHANNELS) {
  process.stderr.write(`· listing @${channel.handle}\n`);
  // Channel pages list newest first; oldest-first is curriculum order.
  const videos = listChannel(channel.handle).reverse();

  // `order` counts within a series, not within the channel.
  const seriesCounter = new Map();
  for (const v of videos) {
    const m = /^(AI Fundamentals|AI Models Explained|Claude Explained):\s*/i.exec(v.title);
    const series = m ? m[1] : 'briefing';
    const n = (seriesCounter.get(series) ?? 0) + 1;
    seriesCounter.set(series, n);
    work.push({ ...v, channel: channel.handle, order: n });
  }
}

const filtered = work
  .filter((w) => (flags.only ? w.title.toLowerCase().includes(String(flags.only).toLowerCase()) : true))
  .slice(0, flags.limit ? Number(flags.limit) : undefined);

console.log(`\n${filtered.length} videos to ingest\n`);

let done = 0;
let skipped = 0;
let failed = 0;

for (const v of filtered) {
  const args = [
    join(ROOT, 'scripts/ingest-video.mjs'),
    `https://www.youtube.com/watch?v=${v.id}`,
    '--order',
    String(v.order),
  ];

  // The ingest script derives topic + slug; we only need to pass what it can't
  // infer. Level and magnet depend on the derived slug, so run it first, then
  // patch — except we can predict both cheaply from the title.
  const bare = v.title.replace(/^(AI Fundamentals|AI Models Explained|Claude Explained):\s*/i, '');
  const guessSlug = bare
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (ADVANCED.has(guessSlug)) args.push('--level', 'advanced');

  const topic = /^AI Fundamentals:/i.test(v.title)
    ? 'ai-fundamentals'
    : /^AI Models Explained:/i.test(v.title)
      ? 'ai-models'
      : /^Claude Explained:/i.test(v.title)
        ? 'claude'
        : 'ai-briefing';
  if (MAGNET_BY_TOPIC[topic]) args.push('--magnet', MAGNET_BY_TOPIC[topic]);
  args.push('--force');

  if (flags.dry) {
    console.log(`DRY  ${topic.padEnd(16)} ${String(v.order).padStart(2)}  ${v.title}`);
    continue;
  }

  try {
    execFileSync('node', args, { stdio: 'pipe', encoding: 'utf8' });
    console.log(`✓ ${topic.padEnd(16)} ${String(v.order).padStart(2)}  ${v.title}`);
    done++;
  } catch (err) {
    const msg = String(err.stdout || err.stderr || err.message).trim().split('\n').pop();
    console.log(`✗ ${v.title}\n    ${msg}`);
    failed++;
  }
}

console.log(`\n${done} ingested · ${skipped} skipped · ${failed} failed`);
if (!flags.dry) {
  console.log('\nEvery lesson now has TODO article/description/takeaways — rewrite each one');
  console.log('against docs/ARTICLE-TEMPLATE.md before shipping.');
}
