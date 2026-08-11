#!/usr/bin/env node
// Assign each lesson to one of the six shared lead magnets.
//
// Six magnets, not forty-three. A magnet per video means forty-three assets to
// write, host, deliver and keep current, which nobody has time for. Grouping by
// the reader's job means each magnet is worth building properly and every video
// in a cluster drives the same asset.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '../src/content/academy');

// slug → magnet. Anything unlisted falls through to the topic default.
const BY_SLUG = {
  // Cost & pricing: what actually drives an AI bill.
  'what-is-a-token': 'ai-cost',
  'what-is-a-context-window': 'ai-cost',
  'subscription-vs-usage': 'ai-cost',
  'what-is-effort-in-ai': 'ai-cost',

  // Prompting: everything about instructing a model.
  'what-is-a-prompt': 'ai-prompting',
  'what-is-a-system-prompt': 'ai-prompting',
  'what-is-prompt-engineering': 'ai-prompting',

  // Agents: the build-an-agent cluster.
  'what-is-an-ai-agent': 'ai-agents',
  'ai-agents-vs-automations': 'ai-agents',
  'what-is-a-tool-call': 'ai-agents',
  'what-is-agent-memory': 'ai-agents',
  'what-is-agent-autonomy': 'ai-agents',
  'what-is-a-skill': 'ai-agents',
  'what-is-a-harness': 'ai-agents',
  'what-is-an-orchestrator': 'ai-agents',
  'what-is-an-mcp': 'ai-agents',
  'what-is-a-vector-database': 'ai-agents',
  'what-are-ai-frameworks': 'ai-agents',
  'what-is-rag': 'ai-agents',
  'what-is-ai-reasoning': 'ai-agents',

  // Rollout: the "what do I actually do on Monday" cluster.
  'how-to-build-ai-employees-for-smbs': 'ai-rollout',
  'how-i-plan-to-make-200-videos-month-with-ai-agents': 'ai-rollout',
};

const BY_TOPIC = {
  'ai-fundamentals': 'ai-fundamentals',
  'ai-models': 'ai-models',
  claude: 'ai-models',
  'ai-briefing': 'ai-rollout',
};

let changed = 0;
const counts = {};

for (const file of readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '');
  const path = join(DIR, file);
  const raw = readFileSync(path, 'utf8');
  const topic = /^topic:\s*(\S+)/m.exec(raw)?.[1] ?? '';
  const magnet = BY_SLUG[slug] ?? BY_TOPIC[topic] ?? 'ai-fundamentals';
  counts[magnet] = (counts[magnet] ?? 0) + 1;

  const next = /^magnet:\s*\S+$/m.test(raw)
    ? raw.replace(/^magnet:\s*\S+$/m, `magnet: ${magnet}`)
    : raw.replace(/^(channel:.*)$/m, `$1\nmagnet: ${magnet}`);

  if (next !== raw) {
    writeFileSync(path, next);
    changed++;
  }
}

console.log(`${changed} lessons re-pointed\n`);
for (const [m, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${m.padEnd(18)} ${n}`);
}
