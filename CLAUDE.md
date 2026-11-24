# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build (SSG)
npm run start     # Serve production build locally
npm run lint      # Run ESLint
```

No test suite is configured.

## Environment Variables

None. The site is fully static and has no backend services.

## Architecture

**Framework:** Next.js 16 App Router with full SSG. i18n routing is handled by `proxy.ts` (Next 16 proxy): paths without a locale redirect to the `preferred_locale` cookie if set, otherwise to the `Accept-Language` match, falling back to `es`. The cookie is written by `lib/locale-cookie.ts`.

**i18n:** Two locales (`es`, `en`), default is `es`. All routes live under `app/[locale]/`. Content is loaded from `content/es.json` / `content/en.json` via `lib/content.ts` → `getContent(locale)`. The `Content` type is inferred from `es.json` (source of truth for the type).

**Layout chain:** `app/layout.tsx` (bare html shell) → `app/[locale]/layout.tsx` (sets `<html lang>`, wraps with `Header`, `Footer`, `BottomNav`, `StructuredData`). There is no cookie banner: the only cookie is the technical language one, disclosed in a footer note and the privacy policy. Each page receives `params: Promise<{ locale: string }>` and should resolve and validate the locale with `isValidLocale()` from `lib/i18n.ts`.

**Daily Puzzles (`/puzzles`):** Game configs are defined in `lib/games/library.ts` as a `GameLibrary`. `lib/games/selector.ts` picks the daily game deterministically by hashing `YYYY-MM-DD`. Game types: `path-bridge`, `block-slide`, `color-flow`. Game components live in `components/games/`.

**Contact page:** Static list of email, LinkedIn, GitHub and location. There is no contact form and no API route; the privacy policy states the site collects no personal data, so keep it that way unless the policy is updated too.

**Social preview image:** `app/[locale]/opengraph-image.tsx` generates the 1200×630 Open Graph image per locale (`twitter-image.tsx` re-exports it). Pages that define their own `openGraph` metadata replace the layout's, so they must include `images: ogImages(locale)` from `lib/og.ts`.

**Styling:** Tailwind CSS v4 with PostCSS. Global styles in `app/globals.css`. Inter font via `next/font/google`. `@source "../lib/**/*.ts"` is set in `globals.css` so Tailwind scans the constants files.

**Design system constants:**
- `lib/constants/colors.ts` — semantic color tokens (`clr`, `focusRing`, `btnPrimary`, `btnOutline`, `btnGhost`, `externalLink`, `skillTag`). Use these everywhere instead of hardcoded Tailwind color classes.
- `lib/constants/typography.ts` — semantic type scale (`tx`). Use these for all heading/body/label sizes.
- **Rule:** modifier-prefixed classes (e.g. `group-hover:text-gray-800`) must stay hardcoded in components — Tailwind cannot scan dynamic class strings.

**Mobile navigation (`components/BottomNav.tsx`):** Fixed bottom nav, visible only on mobile (`sm:hidden`). Features filled/solid icons for the active section, a persistent pill background on the active item, and labels always visible for all items. The `/collab` page is titled "Compañeros" / "Colleagues".

**CV (`cv/`):** LaTeX source of both CVs: `cv_en.tex`, `cv_es.tex` and the shared layout `cv-style.tex`. `npm run cv` compiles them with latexmk (needs a local TeX Live) and copies the PDFs into `public/`. Both must stay on one A4 page and in sync with the experience on the site; check the page count after every change. The repo is public, so keep private notes out of `.tex` comments.

**Adding content:** Edit `content/es.json` and `content/en.json` in parallel — both must stay in sync.

**Adding a new page:** Create `app/[locale]/your-page/page.tsx`, call `getContent(locale)` for translations, and add nav entries in both JSON files and `components/Navigation.tsx`. Its `generateMetadata` must set `alternates: pageAlternates(locale, "/your-page")` (`lib/seo.ts`); without it the page inherits the home canonical and search engines treat it as a duplicate of home. Add it to `app/sitemap.ts` too.

---

## Portfolio Owner Profile

This is the personal portfolio of **Jesús Jiménez Alcántara**, a Backend Engineer based in Vélez-Málaga, Spain.

### Professional positioning
- **Title:** Backend Engineer
- **Stack:** ASP.NET Core, Azure Functions, PostgreSQL, Redis, MongoDB, CosmosDB, Docker, Next.js, Vercel
- **Most recent role:** AI Engineer, curricular internship at Kaizten Analytics (September – November 2026, remote, part of the UNIR Master's). Keep its description to stack and area only: the work feeds journal articles for a doctoral thesis.
- **Other roles:** Computer Science teacher, temporary post, Junta de Andalucía (June 2026, San Pedro de Alcántara) · Backend Engineer at The Bubble Hub (April 2024 – April 2026)
- **Previous role:** Technology and Security Consultant at Ernst & Young (April 2022 – April 2024)
- **Education:** Bachelor's in Software Engineering, UMA (7.51/10) · Master's in AI, UNIR (in progress, expected March 2027)
- **Languages:** Spanish (native), English (B2)
- **Contact:** jjalcantara.dev@gmail.com (the only email shown publicly: site, privacy policy and CV) · linkedin.com/in/jjalcantara
- **Open to:** New backend engineering opportunities

> **Important:** Jesús is no longer at The Bubble Hub (last day: 30 April 2026). Do NOT use "actualmente en" / "currently at" language anywhere on the site. The Bubble Hub appears only as a past employer with closed dates in the experience timeline.

### Key technical expertise
- REST API design (requirements gathering, use case definition, edge case mapping, OpenAPI/Swagger documentation)
- Authentication & authorization: JWT stateless tokens, RBAC, OAuth 2.0 (Google, Apple)
- Rate limiting with Redis on sensitive endpoints (auth, payments)
- Payment integrations: Stripe (webhooks, idempotency, subscription lifecycle), Apple App Store & Google Play (server-side receipt validation)
- PostgreSQL database architecture: entity modeling, normalization, constraints (PK/FK, unique, check), indexing, cascading deletes
- Gamification systems: points, levels, achievements, leaderboards
- CI/CD pipelines in Azure DevOps
- Testing pyramid: unit → integration → E2E
- SOLID principles and Clean Architecture applied consistently

---

## Pending Improvements by Page

### / — Hero (Home)
- Hero occupies full mobile viewport height (`min-h-[calc(100svh-57px)]`); focus section starts below the fold. ✅
- Headline: "Backend Engineer" / "Ingeniero Backend". ✅
- Subheadline: ASP.NET Core · Azure · REST APIs. ✅
- CTAs: About, Projects, CV download. ✅
- **CV download:** links to `/public/jesus_jimenez_alcantara_cv_{es,en}.pdf`, generated from `cv/` (see CV below).

### /projects — Projects
- **The Bubble Hub products** should be featured prominently:
  - **Prodigy Padel Academy:** Sports training platform for padel players. Backend: gamification system (points, levels, achievements, leaderboards), Stripe payments, App Store & Google Play in-app purchases, PostgreSQL architecture, Redis rate limiting, JWT + RBAC + OAuth 2.0
  - **Koru:** Mobile application. Backend: API design, authentication systems, database architecture
- **Do NOT list** personal bots, Selenium scripts, or BOE scrapers — these are below the level of the professional profile
- Each project card should show: name, description, tech stack tags, and role (Backend Engineer / Lead)
- If linking to GitHub repos, only link if the repo is public and has a proper README

### /about — About Me
- **Do NOT use** generic soft-skill language like "passionate", "team player", "quick learner", "I love challenges"
- **DO use** concrete, technical framing:
  - 4+ years professional backend experience
  - Specialization in cloud-native systems, API design, auth, payments, database architecture
  - Background at EY in enterprise backend and SecDevOps
  - Pursuing Master's in AI at UNIR
- **Professional summary to use (ES):**
  > Ingeniero Backend con más de 4 años de experiencia diseñando y desarrollando sistemas cloud-native escalables con ASP.NET Core, Azure Functions y Java. Especializado en diseño de APIs REST, sistemas de autenticación (JWT, OAuth 2.0, RBAC), integración de pagos (Stripe, App Store, Google Play) y arquitectura de bases de datos PostgreSQL. Experiencia liderando el desarrollo backend de productos con miles de usuarios activos mensuales.
- **Professional summary to use (EN):**
  > Backend Engineer with 4+ years of experience designing and building scalable cloud-native systems using ASP.NET Core, Azure Functions, and Java. Specialized in REST API design, authentication systems (JWT, OAuth 2.0, RBAC), payment integrations (Stripe, App Store, Google Play), and PostgreSQL database architecture. Experience leading backend development across products serving thousands of monthly active users.
- **Skills section:** Group by category, not a flat list:
  - Languages & Frameworks: C#, ASP.NET Core, .NET, Java, Spring, Python, JavaScript, Next.js
  - Cloud & DevOps: Azure (Functions, DevOps, App Service, Table Storage, Blob Storage, CosmosDB), Vercel, Docker, Kubernetes, Jenkins, Redis
  - Databases: PostgreSQL, SQL Server, MongoDB, CosmosDB, Azure Table Storage
  - APIs & Auth: REST API, Swagger/OpenAPI, JWT, OAuth 2.0, Stripe, Postman
  - Testing: Testing pyramid (unit/integration/E2E), JUnit, Selenium
  - Practices: SOLID, Clean Architecture, RBAC, Agile/Scrum, Git, GitHub, Jira, UML
- **Experience timeline:** Kaizten Analytics: September – November 2026. Junta de Andalucía: June 2026. The Bubble Hub: April 2024 – April 2026. EY: April 2022 – April 2024.
- **Education:** UMA + UNIR (in progress)

### /contact — Contact
- No phone number: not appropriate for a public portfolio
- Keep: email, LinkedIn link
- Tone: professional, brief — no "don't hesitate to reach out" filler phrases

### /puzzles — Daily Puzzles
- No changes needed from a content perspective
- Ensure it's clearly presented as a personal side project / fun feature, not a main professional showcase

### /privacy — Privacy Policy
- No changes needed

---

## Content & Tone Guidelines

- **Language:** All content must exist in both `es` and `en` — update both JSON files in every change
- **Tone:** Direct, technical, professional. No generic soft skills, no filler adjectives
- **Keywords to include naturally:** ASP.NET Core, Azure, REST API, PostgreSQL, Redis, JWT, OAuth, RBAC, Stripe, CI/CD, SOLID, Clean Architecture, Backend Engineer
- **Do not include:** phone number on any public-facing page, personal hobbies unrelated to tech, generic "I'm passionate about technology" copy, references to The Bubble Hub as current employer
- **CV download:** `/public/jesus_jimenez_alcantara_cv_es.pdf` and `_en.pdf`, linked from the hero. Never edit the PDFs by hand: change `cv/` and run `npm run cv`
