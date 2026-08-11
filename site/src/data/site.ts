// Central site config — contact details, form webhooks, socials. One source of
// truth so pages/schema/forms stay consistent. Webhooks are read from public
// env vars (set them in Vercel → Project → Settings → Environment Variables);
// they fall back to empty, in which case forms show a graceful "not configured"
// state instead of silently failing.
export const SITE = {
  name: 'Nairon',
  legalName: 'Nairon, Inc.',
  // TODO(Luka): confirm the real inbound address — placeholder for now.
  email: 'hello@naironai.com',
  url: 'https://naironai.com',
  address: {
    street: '2125 Biscayne Blvd',
    city: 'Miami',
    region: 'FL',
    postalCode: '33137',
    country: 'US',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/nairon',
    x: 'https://x.com/nairon',
  },
  // Public form endpoints (client-side POST to a catch webhook — Zapier/Make/n8n/etc.)
  newsletterWebhook: import.meta.env.PUBLIC_NEWSLETTER_WEBHOOK ?? '',
  contactWebhook: import.meta.env.PUBLIC_CONTACT_WEBHOOK ?? '',
  // Lead-magnet captures from the /go funnel pages. Falls back to the contact
  // webhook so a new magnet page still delivers leads before Mahan wires up a
  // dedicated endpoint.
  magnetWebhook:
    import.meta.env.PUBLIC_MAGNET_WEBHOOK ?? import.meta.env.PUBLIC_CONTACT_WEBHOOK ?? '',
};
