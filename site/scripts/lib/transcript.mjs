// VTT → clean, timestamped transcript.
//
// YouTube auto-captions use a rolling two-line window: every cue repeats the
// previous line before appending the new one, and each word carries an inline
// <00:00:05.600><c>…</c> timing tag. Naively concatenating cues triples the
// text. The dedupe below keeps only lines that haven't been emitted yet, which
// collapses the window back into a normal transcript.

const NAME_FIXES = [
  // ASR consistently mangles the two founders and the company name.
  [/\bMoh?amm?ad\b/gi, 'Mahan'],
  [/\bMohamed\b/gi, 'Mahan'],
  [/\bMohan\b/gi, 'Mahan'],
  [/\bMahaan\b/gi, 'Mahan'],
  [/\bMahon\b/gi, 'Mahan'],
  [/\bLuca\b/g, 'Luka'],
  [/\bLucas\b/g, 'Luka'],
  [/\bNairoon\b/gi, 'Nairon'],
  [/\bNyron\b/gi, 'Nairon'],
  [/\bNiron\b/gi, 'Nairon'],
  [/\bNaron\b/gi, 'Nairon'],
  [/\bNeron\b/gi, 'Nairon'],
  [/\bNehron\b/gi, 'Nairon'],
  // "I'm the CMO of Non." — bare Nar/Non only where it stands in for the company.
  [/\bNar\b\.?(?=\s|$)/g, 'Nairon.'],
  [/\b(of|at|call(?:ed)?|join(?:ing)?)\s+Non\b/gi, '$1 Nairon'],
  [/\bthe CM of\b/g, 'the CMO of'],
  // Mahan is the CMO; ASR frequently promotes him to CEO in the cold open.
  [/\bmy name is Mahan\.?\s*I'?m the CEO\b/gi, "my name is Mahan. I'm the CMO"],
  // Product/term spellings.
  [/\bchat GPT\b/gi, 'ChatGPT'],
  [/\bGPT ?3\.5\b/gi, 'GPT-3.5'],
  [/\bclaud\b/gi, 'Claude'],
  [/\bMCP's\b/g, 'MCPs'],
  [/\bLLM's\b/g, 'LLMs'],
];

const HTML_ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
};

function decodeEntities(s) {
  return s.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (m) => HTML_ENTITIES[m] ?? m);
}

export function applyNameFixes(s) {
  return NAME_FIXES.reduce((acc, [re, to]) => acc.replace(re, to), s);
}

function toSeconds(h, m, s) {
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
}

export function formatTimestamp(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

const CUE_RE = /^(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s+-->\s+(\d{2}):(\d{2}):(\d{2})\.(\d{3})/;

/**
 * Parse a WebVTT file into deduplicated `{ t, text }` lines.
 */
export function parseVtt(raw) {
  const lines = raw.split(/\r?\n/);
  const out = [];
  let lastEmitted = null;
  let cueStart = null;

  for (const line of lines) {
    const cue = CUE_RE.exec(line);
    if (cue) {
      cueStart = toSeconds(cue[1], cue[2], cue[3]);
      continue;
    }
    if (cueStart === null) continue;
    if (!line.trim() || line.startsWith('WEBVTT') || line.startsWith('Kind:') || line.startsWith('Language:')) {
      continue;
    }

    // Strip inline word timings (<00:00:05.600>) and <c>…</c> wrappers.
    const text = decodeEntities(line)
      .replace(/<\d{2}:\d{2}:\d{2}\.\d{3}>/g, '')
      .replace(/<\/?c[^>]*>/g, '')
      .replace(/^>>\s*/, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!text) continue;
    if (text === lastEmitted) continue;

    out.push({ t: cueStart, text: applyNameFixes(text) });
    lastEmitted = text;
  }

  return out;
}

/**
 * Group raw caption lines into readable paragraph blocks. Blocks break on
 * sentence punctuation once they pass `minChars`, so each block is a coherent
 * thought rather than an arbitrary line count.
 */
export function toBlocks(lines, { minChars = 220 } = {}) {
  const blocks = [];
  let current = null;

  for (const line of lines) {
    if (!current) current = { t: line.t, parts: [] };
    current.parts.push(line.text);
    const joined = current.parts.join(' ');
    if (joined.length >= minChars && /[.!?]"?$/.test(joined)) {
      blocks.push({ t: current.t, text: joined });
      current = null;
    }
  }
  if (current && current.parts.length) {
    blocks.push({ t: current.t, text: current.parts.join(' ') });
  }
  return blocks;
}

/** Render blocks in the `M:SS` + paragraph format the lesson pages read. */
export function renderTranscript(blocks) {
  return blocks.map((b) => `${formatTimestamp(b.t)}\n${b.text}`).join('\n\n');
}

/** Flatten to plain prose — this is what the rewrite step reads. */
export function renderPlain(lines) {
  return lines.map((l) => l.text).join(' ');
}
