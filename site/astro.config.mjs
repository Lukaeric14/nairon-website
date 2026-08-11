// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://naironai.com',
  integrations: [
    react(),
    mdx(),
    // /go/* are noindex lead-magnet funnels — they must not appear in the
    // sitemap, or we'd be asking Google to crawl pages we've told it to skip.
    sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/go/') }),
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
