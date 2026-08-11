// Client-side lead delivery for every form on the site.
//
// The endpoint relays into Slack, so the payload is shaped as a Slack incoming
// webhook message: `text` as the notification fallback, `blocks` for the
// rendered message. The raw submitted fields ride along under `lead` so the
// receiving handler can store them without re-parsing prose out of `blocks`.
//
// Delivery is `mode: 'no-cors'`. The endpoint sends no Access-Control-Allow-Origin
// header and 404s on OPTIONS preflight, so a normal CORS request would be blocked
// outright. The cost of no-cors is an opaque response: we cannot read the status,
// so a failed POST is indistinguishable from a successful one. Every caller
// therefore treats delivery as best-effort and never blocks the visitor on it.

export type LeadKind = 'magnet' | 'contact' | 'newsletter';

const LABEL: Record<LeadKind, { title: string; emoji: string }> = {
  magnet: { title: 'Lead magnet download', emoji: ':inbox_tray:' },
  contact: { title: 'Contact form', emoji: ':envelope:' },
  newsletter: { title: 'Newsletter signup', emoji: ':newspaper:' },
};

/** Slack mrkdwn treats these three as control characters. */
const esc = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Form field names are camelCase; Slack readers are people. */
const label = (k: string) =>
  k
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/^./, (c) => c.toUpperCase());

export async function postLead(
  webhook: string,
  kind: LeadKind,
  fields: Record<string, string | undefined>,
): Promise<void> {
  if (!webhook) return;

  const { title, emoji } = LABEL[kind];
  const entries = Object.entries(fields).filter(([, v]) => v != null && String(v).trim() !== '');

  // Slack caps a section at 10 fields; these forms never approach it, but the
  // slice keeps a future long form from silently dropping the whole block.
  const fieldBlocks = entries.slice(0, 10).map(([k, v]) => ({
    type: 'mrkdwn',
    text: `*${esc(label(k))}*\n${esc(String(v))}`,
  }));

  const summary = entries
    .filter(([k]) => k === 'email' || k === 'firstName' || k === 'name')
    .map(([, v]) => v)
    .join(' · ');

  const payload = {
    text: `${emoji} ${title}${summary ? ` — ${summary}` : ''} (naironai.com)`,
    blocks: [
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `${emoji} *${title}* _via naironai.com_` },
      },
      ...(fieldBlocks.length ? [{ type: 'section', fields: fieldBlocks }] : []),
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: [
              `<https://naironai.com${location.pathname}|${location.pathname}>`,
              document.referrer ? `from ${esc(new URL(document.referrer).hostname)}` : 'direct',
              new Date().toISOString(),
            ].join('  ·  '),
          },
        ],
      },
    ],
    // Structured copy for the handler; Slack ignores unknown top-level keys.
    lead: {
      kind,
      ...fields,
      page: location.pathname,
      referrer: document.referrer || null,
      submittedAt: new Date().toISOString(),
    },
  };

  await fetch(webhook, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
