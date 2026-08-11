# Archive — design reference only

## `legacy-design/`

The Nairon website as it existed before 2026-08: a TanStack Start + React 19 app with
TailwindCSS 4 and shadcn/ui.

**This is kept for one reason: how the site looked.** The components, layouts, animations and
styling are a reference for future design work. That's it.

### Rules

- **Not built.** It is not a Bun workspace, Turborepo ignores it, Vercel never sees it.
- **Not deployed.** Nothing here serves traffic.
- **Do not import from it.** If you want something from here, copy it into `site/` and adapt it
  to Astro — don't reach across.
- **Don't maintain it.** No dependency bumps, no fixes. If it rots, that's fine.

### Where to look

| What | Path |
|---|---|
| Page layouts | `legacy-design/src/routes/` |
| Landing page sections | `legacy-design/src/components/landing-v2/` |
| Design system primitives | `legacy-design/src/components/ui/` |
| Brand kit page | `legacy-design/src/components/brandkit/` |
| Isometric illustration system | `legacy-design/src/components/iso/` |
| Images and video | `legacy-design/public/` |

### Features that were dropped with it

These were live in the old site and were deliberately **not** carried into the Astro site:

- `/download` — Hive desktop download page (`src/routes/download.tsx`)
- Property-PDF generator (`src/routes/signals/`, `src/components/property-pdf/`)
- Careers admin + job application form (`src/routes/admin.careers.tsx`, `src/routes/api.*.ts`)
- `/brandkit` and `/pitch-deck`

If any of these need to come back, they need rebuilding in Astro — the Convex functions behind
the PDF generator and careers form (`convex/pdfJob.ts`, `convex/careerApplications.ts`) are still
in the repo but nothing calls them.
