#!/usr/bin/env node
// Re-apply the name dictionary across already-ingested content.
//
// The dictionary in lib/transcript.mjs grows as new ASR manglings turn up
// ("Mohan", "Neron", "Non"). Re-running ingest would clobber written articles,
// so this patches names in place across both the lesson frontmatter transcripts
// and the .ingest source files.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyNameFixes } from './lib/transcript.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TARGETS = [
  { dir: join(ROOT, 'src/content/academy'), ext: '.md' },
  { dir: join(ROOT, '.ingest'), ext: '.txt' },
];

let changed = 0;
for (const { dir, ext } of TARGETS) {
  for (const file of readdirSync(dir).filter((f) => f.endsWith(ext))) {
    const path = join(dir, file);
    const before = readFileSync(path, 'utf8');
    const after = applyNameFixes(before);
    if (after !== before) {
      writeFileSync(path, after);
      changed++;
      console.log(`  fixed ${file}`);
    }
  }
}
console.log(`\n${changed} files updated`);
