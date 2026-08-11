#!/usr/bin/env node
// Deterministic slop check over authored prose.
//
//   node scripts/check-slop.mjs [--verbose]
//
// Only the markdown BODY and the authored frontmatter fields (seoTitle,
// description, takeaways) are checked. The `transcript` array is verbatim
// spoken dialogue and is exempt: people say "it's not X, it's Y" out loud all
// the time, and rewriting what someone said would be a lie.
//
// Exit 1 on any hard-ban hit, so this can gate a build.

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '../src/content/academy');
const verbose = process.argv.includes('--verbose');

const HARD = [
  [/[—–]/g, 'em/en dash'],
  [/\bnot just\b[^.!?]{0,60}\bbut\b/gi, '"not just X but Y"'],
  [/\bit'?s not\b[^.!?]{0,50},\s*it'?s\b/gi, '"it\'s not X, it\'s Y"'],
  [/\b(it'?s worth noting|it'?s important to note|importantly|notably|crucially)\b/gi, 'significance flag'],
  [/\b(let'?s (dive|explore)|in this (section|article)|when it comes to|in today'?s .{0,20}world|here'?s the thing)\b/gi, 'throat-clearing'],
  // "to summarise" as a sentence-opening discourse marker is slop; "ask it to
  // summarise a call" is the verb doing real work. Anchor to the marker only.
  [/(^|[.!?]\s+)(in conclusion|to summari[sz]e|to sum up)\b/gim, 'hollow conclusion'],
  [/\b(delve|tapestry|testament|myriad|plethora|multifaceted|paradigm|synergy|holistic|elucidate|embark|encompass|utili[sz]e|facilitate|whilst|ever-evolving|game-changer|revolutionary|cutting-edge|best-in-class|world-class)\b/gi, 'tier-1 vocabulary'],
];

const SOFT = [
  [/\b(robust|comprehensive|seamless|innovative|streamline|empower|foster|enhance|elevate|optimi[sz]e|pivotal|intricate|profound|resonate|underscore|harness|cultivate|bolster|cornerstone)\b/gi, 'tier-2 vocabulary'],
  [/^(Furthermore|Moreover|Additionally)\b/gim, 'transition opener'],
  [/\b(genuinely|truly|really|actually|simply|deeply|precisely) \b/gi, 'intensifier filler'],
];

/** Strip frontmatter down to the authored fields, drop the transcript array. */
function authoredText(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!m) return raw;
  const [, fm, body] = m;
  const authored = fm
    .split('\n')
    .filter((l) => /^(seoTitle|description|\s+-\s"|takeaways)/.test(l) && !/^\s+-\s\{\s*t:/.test(l))
    .join('\n');
  return `${authored}\n${body}`;
}

let hardTotal = 0;
let softTotal = 0;
const offenders = [];

for (const file of readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const text = authoredText(readFileSync(join(DIR, file), 'utf8'));
  const hits = [];

  for (const [re, label] of HARD) {
    const found = text.match(re);
    if (found) {
      hardTotal += found.length;
      hits.push({ level: 'HARD', label, samples: [...new Set(found)].slice(0, 3) });
    }
  }
  for (const [re, label] of SOFT) {
    const found = text.match(re);
    if (found) {
      softTotal += found.length;
      if (verbose) hits.push({ level: 'soft', label, samples: [...new Set(found)].slice(0, 3) });
    }
  }

  if (hits.length) offenders.push({ file, hits });
}

for (const { file, hits } of offenders) {
  console.log(`\n${file}`);
  for (const h of hits) {
    console.log(`  ${h.level === 'HARD' ? '✗' : '·'} ${h.label}: ${h.samples.join(', ')}`);
  }
}

const files = readdirSync(DIR).filter((f) => f.endsWith('.md')).length;
console.log(`\n${files} articles · ${hardTotal} hard-ban hits · ${softTotal} soft hits`);
if (!verbose && softTotal) console.log('(run with --verbose to see soft hits)');

process.exit(hardTotal > 0 ? 1 : 0);
