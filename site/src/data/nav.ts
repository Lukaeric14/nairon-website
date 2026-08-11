// Shared primary-nav model. One array drives the landing hero nav, the subpage
// nav (SubNav.astro), and the mobile menus — edit here to change them everywhere.
export type NavLeaf = { label: string; href: string };
export type NavItem = { label: string; href?: string; items?: NavLeaf[] };

export const NAV: NavItem[] = [
  {
    label: 'Solutions',
    items: [
      { label: 'Revenue & GTM', href: '/solutions/revenue-gtm' },
      { label: 'Customer support', href: '/solutions/customer-support' },
      { label: 'Back office operations', href: '/solutions/back-office-operations' },
      { label: 'Data & research', href: '/solutions/data-research' },
      { label: 'Content & marketing', href: '/solutions/content-marketing' },
      { label: 'Workflow automation', href: '/solutions/workflow-automation' },
    ],
  },
  {
    label: 'AI Training',
    items: [
      { label: 'Workforce AI Training', href: '/workforce-ai-training' },
      { label: 'Executive AI Program', href: '/executive-ai-program' },
    ],
  },
  // Moved on-domain from academy.naironai.com — a subdomain is a separate site
  // to Google, so every link the academy earns was doing nothing for naironai.com.
  { label: 'AI Academy', href: '/academy' },
  { label: 'Docs', href: 'https://docs.naironai.com/overview/what-is-nairon' },
];

// External links (different host) open in a new tab so the marketing site stays put.
export const isExternal = (href?: string): boolean => !!href && /^https?:\/\//.test(href);
