# AGENTS.md

Portfolio site for Andry Syva Maldini (Data Scientist/BI). Next.js 14 App Router, TypeScript strict, Tailwind CSS 3, Framer Motion, lucide-react. Deployed to Vercel at andrymldni.dev. No tests, no CI, no ESLint.

## Commands

- `npm run dev` / `npm run build` / `npm start`
- Typecheck (there is no script): `npx tsc --noEmit` — tsconfig already sets `noEmit`.
- `npm run lint` is **broken**: `next lint` needs `eslint`/`eslint-config-next`, which are not in `devDependencies`, and there is no eslint config. Don't rely on it; use the typecheck above.
- Use **npm only**. History removed a stale pnpm lockfile; don't reintroduce pnpm.

## Structure

- `src/app/page.tsx` is a `"use client"` page that lazy-loads all sections via `next/dynamic`. Sections are wrapped in `<Section id title>`; the Hero is intentionally not wrapped. Navbar's scroll-spy (`src/components/layout/Navbar.tsx`) depends on the section ids: `about`, `certifications`, `projects`, `contact` — don't rename them silently.
- Components are grouped by role: `src/components/layout/` (Navbar, Footer, ScrollProgress), `src/components/sections/` (Hero, About, Projects, CertificatesSlider, TechCarousel, Contact), `src/components/ui/` (Section, BackToTop), `src/components/effects/` (Starfield), `src/components/resume/` (Resume). Keep new components in the matching folder.
- `src/lib/data.ts` is the single content source driving Projects, TechCarousel, and CertificatesSlider (`projects`, `tools`, `certifications` arrays). Edit content there, not in components.
- Site-wide identity (email, socials, location, SEO/JSON-LD) is hardcoded across `layout.tsx`, `sections/Contact.tsx`, `sections/About.tsx`, `resume/Resume.tsx` — often duplicated, keep in sync.
- `src/app/cv/page.tsx` re-renders `<Resume />` inline; the downloadable PDF is `/public/Andry_Syva_Maldini_CV.pdf` (referenced only in `Resume.tsx`).

## Stale README claims

- `NEXT_PUBLIC_CONTACT_EMAIL` (README) is **not read anywhere** — no `process.env` usage in `src/`. Email is the hardcoded `EMAIL` const in `Contact.tsx`. Ignore the env var.

## Theming

- Colors are RGB CSS variables (`--bg`, `--fg`, `--muted`, `--brand`, `--brand-2`) defined in `globals.css`. Dark is default; light is `:root[data-theme="light"]`, set pre-paint by an inline script in `layout.tsx` to avoid FOUC.
- Components mostly use white-based Tailwind classes (`text-white`, `bg-white/5`, `border-white/10`) that get remapped for light mode via `!important` overrides at the **bottom** of `globals.css`. Keep that override block last; append new light-mode fixes to it, don't interleave.
- Custom utility classes (`.card`, `.container`, `.cv-download-btn`, `.gradient-text`) are defined in `globals.css` with `@apply`.

## Conventions / gotchas

- Content and UI copy are English; only some code comments are Indonesian. Keep new copy English.
- Smooth scrolling is native: `html { scroll-behavior: smooth; scroll-padding-top: 5.5rem }` in `globals.css` keeps anchored sections clear of the sticky navbar. Motion lives in the sections (Hero entrance choreography, Navbar `layoutId` active pill, scroll-reveal staggers in Projects) and must branch on `useReducedMotion` like the existing code does.
- Mobile performance is an explicit concern: `globals.css` strips `backdrop-filter` on `pointer: coarse` devices and `.card` uses it heavily. Avoid adding heavy blur/paint work; respect `prefers-reduced-motion` (Section/Hero already branch on `useReducedMotion`).
- Assets are static files in `/public` (project images referenced as `/proyek*.jpeg`, certificates as `/certificates/*`). Add new assets there and reference by absolute path.
