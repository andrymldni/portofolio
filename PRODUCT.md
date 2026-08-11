# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers and recruiters evaluating Andry Syva Maldini for Data Scientist / BI / Data Analyst / Data Engineer roles. Their job is fast screening: quickly assess skills, credentials, and work samples to decide whether he is worth interviewing or contacting.

## Product Purpose

A personal portfolio that presents Andry's data science and business intelligence experience, credentials, and projects in a scannable, trustworthy form. Success means a recruiter or hiring manager can rapidly verify his fit and act on it — download the CV, click through to real projects and certificates, and reach out.

## Positioning

An evidence-backed data portfolio rather than a claims-based one: every project links to its real GitHub repository and demo, every certification links to its verifier or credential page, and a downloadable CV is always one click away. Nothing is asserted that cannot be checked.

## Operating Context

Visitors browse the single-page site (and the `/cv` route) on desktop and mobile. They scan About, the tool marquee, Certifications, Projects, then use Contact to reach out (contact form composes a pre-filled Gmail/mailto message). Downloadable CV: `/public/Andry_Syva_Maldini_CV.pdf` (linked from the Resume/CV views). Light/dark themes with `prefers-reduced-motion` support. Deployed to Vercel at andrymldni.dev.

## Capabilities and Constraints

- Sections: About, Tools & Technologies marquee, Certifications slider, Projects grid, Contact form. Navbar scroll-spy depends on the section ids `about`, `certifications`, `projects`, `contact` — do not rename.
- Content is single-sourced in `src/lib/data.ts` (`projects`, `tools`, `certifications` arrays); edit content there, not in components.
- Site identity (name, email `andrymldni@gmail.com`, phone, location, socials, SEO/JSON-LD) is hardcoded across `layout.tsx`, `Contact.tsx`, `About.tsx`, `Resume.tsx` — keep in sync when changed.
- `NEXT_PUBLIC_CONTACT_EMAIL` (README) is dead — no `process.env` usage anywhere; the email lives in the `EMAIL` const in `Contact.tsx`.
- UI copy is English; some code comments are Indonesian.
- Theme: RGB CSS variables in `globals.css`; light mode is remapped via `!important` overrides that must stay at the bottom of the file.
- Mobile/low-end performance is an explicit concern (backdrop-filter stripped on coarse pointers).
- Assets are static files in `/public` (project images `/proyek*.jpeg`, certificates `/certificates/*`).

## Brand Commitments

- Name: Andry Syva Maldini; handle `andrymldni`.
- Roles: Data Scientist, Business Intelligence, Data Analyst, Data Engineer.
- Location: Jakarta, Indonesia. Domain: andrymldni.dev.
- Email: andrymldni@gmail.com. Socials (fixed): GitHub, LinkedIn, Instagram, Twitter — all `andrymldni`.

## Evidence on Hand

- Real GitHub project repos with links and demos in `src/lib/data.ts` (e.g. FloraScan plant-disease scanner, HR analytics, MLOps pipelines).
- Six certifications with image files in `/public/certificates` and verifier/credential links.
- Downloadable CV PDF at `/public/Andry_Syva_Maldini_CV.pdf`; profile photo `/public/profile.jpeg`.
- No testimonials, press, or fabricated customer claims exist and must not be invented.

## Product Principles

1. Evidence over claims — real repos, verifiable credentials, downloadable CV; never fabricate testimonials, benchmarks, or outcomes.
2. Recruiter efficiency — the page must reward a fast scan: skills, credentials, and work samples reachable in seconds.
3. One source of truth — content in `src/lib/data.ts`, identity kept in sync across the hardcoded components.
4. Preserve the navigation contract — single-page sections with the ids Navbar/Footer anchor to, plus the `/cv` route.
5. Low-end mobile friendliness — keep paint work light (respect the coarse-pointer and reduced-motion rules) so it stays smooth on cheap phones.

## Accessibility & Inclusion

`prefers-reduced-motion` is respected (Section/Hero branch on `useReducedMotion`); `:focus-visible` rings are styled globally; light theme relies on remapped contrast overrides in `globals.css`.
