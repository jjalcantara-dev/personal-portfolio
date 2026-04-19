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

Copy `.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY` — Resend API key for sending contact form emails
- `UPSTASH_REDIS_REST_URL` — Upstash Redis REST URL for rate limiting
- `UPSTASH_REDIS_REST_TOKEN` — Upstash Redis REST token

## Architecture

**Framework:** Next.js 16 App Router with full SSG. No middleware — i18n routing is handled via `next.config.ts` redirects that rewrite `/` → `/es` and bare paths → `/es/:path*`.

**i18n:** Two locales (`es`, `en`), default is `es`. All routes live under `app/[locale]/`. Content is loaded from `content/es.json` / `content/en.json` via `lib/content.ts` → `getContent(locale)`. The `Content` type is inferred from `es.json` (source of truth for the type).

**Layout chain:** `app/layout.tsx` (bare html shell) → `app/[locale]/layout.tsx` (sets `<html lang>`, wraps with `Header`, `Footer`, `CookieBanner`, `ReCaptchaProvider`, `StructuredData`). Each page receives `params: Promise<{ locale: string }>` and should resolve and validate the locale with `isValidLocale()` from `lib/i18n.ts`.

**Daily Puzzles (`/puzzles`):** Game configs are defined in `lib/games/library.ts` as a `GameLibrary`. `lib/games/selector.ts` picks the daily game deterministically by hashing `YYYY-MM-DD`. Game types: `path-bridge`, `block-slide`, `color-flow`. Game components live in `components/games/`.

**Contact Form:** Uses a Next.js API route (`app/api/contact/route.ts`). Emails sent via Resend. Rate limited server-side with Upstash Redis (3 req/10 min per IP). GDPR-compliant: explicit consent checkbox required before submission.

**Styling:** Tailwind CSS v4 with PostCSS. Global styles in `app/globals.css`. Inter font via `next/font/google`.

**Adding content:** Edit `content/es.json` and `content/en.json` in parallel — both must stay in sync.

**Adding a new page:** Create `app/[locale]/your-page/page.tsx`, call `getContent(locale)` for translations, and add nav entries in both JSON files and `components/Navigation.tsx`.

---

## Portfolio Owner Profile

This is the personal portfolio of **Jesús Jiménez Alcántara**, a Backend Engineer based in Vélez-Málaga, Spain.

### Professional positioning
- **Title:** Backend Engineer
- **Stack:** ASP.NET Core, Azure Functions, PostgreSQL, Redis, MongoDB, CosmosDB, Docker, Next.js, Vercel
- **Current role:** Backend Engineer at The Bubble Hub (April 2024 – Present)
- **Previous role:** Technology and Security Consultant at Ernst & Young (April 2022 – April 2024)
- **Education:** Bachelor's in Software Engineering, UMA (7.51/10) · Master's in AI, UNIR (in progress, expected March 2027)
- **Languages:** Spanish (native), English (B2)
- **Contact:** jesusjimalc98@gmail.com · linkedin.com/in/jjalcantara
- **Open to:** New backend engineering opportunities

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
- **Headline:** Should clearly state "Backend Engineer" as the primary identity — not "Software Engineer" or generic "Developer"
- **Subheadline:** Should mention ASP.NET Core, Azure, and REST APIs as core stack
- **CTAs:** Primary CTA should link to /about or download CV. Secondary CTA to /projects
- **Tone:** Professional, direct, technical — no buzzwords like "passionate" or "enthusiastic"
- **CV download:** Add a downloadable PDF CV link (filename: `jesus_jimenez_alcantara_cv.pdf`). Place in `/public/`

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
  - Current role at The Bubble Hub
  - Background at EY in enterprise backend and SecDevOps
  - Pursuing Master's in AI at UNIR
- **Professional summary to use (ES):**
  > Ingeniero Backend con más de 4 años de experiencia diseñando y desarrollando sistemas cloud-native escalables con ASP.NET Core, Azure Functions y Java. Especializado en diseño de APIs REST, sistemas de autenticación (JWT, OAuth 2.0, RBAC), integración de pagos (Stripe, App Store, Google Play) y arquitectura de bases de datos PostgreSQL. Actualmente en The Bubble Hub, liderando el desarrollo backend de dos productos con miles de usuarios activos mensuales.
- **Professional summary to use (EN):**
  > Backend Engineer with 4+ years of experience designing and building scalable cloud-native systems using ASP.NET Core, Azure Functions, and Java. Specialized in REST API design, authentication systems (JWT, OAuth 2.0, RBAC), payment integrations (Stripe, App Store, Google Play), and PostgreSQL database architecture. Currently at The Bubble Hub, leading backend development across two products serving thousands of monthly active users.
- **Skills section:** Group by category, not a flat list:
  - Languages & Frameworks: C#, ASP.NET Core, .NET, Java, Spring, Python, JavaScript, Next.js
  - Cloud & DevOps: Azure (Functions, DevOps, App Service, Table Storage, Blob Storage, CosmosDB), Vercel, Docker, Kubernetes, Jenkins, Redis
  - Databases: PostgreSQL, SQL Server, MongoDB, CosmosDB, Azure Table Storage
  - APIs & Auth: REST API, Swagger/OpenAPI, JWT, OAuth 2.0, Stripe, Postman
  - Testing: Testing pyramid (unit/integration/E2E), JUnit, Selenium
  - Practices: SOLID, Clean Architecture, RBAC, Agile/Scrum, Git, GitHub, Jira, UML
- **Experience timeline:** Show The Bubble Hub and EY with correct dates and descriptions (see professional profile above)
- **Education:** UMA + UNIR (in progress)

### /contact — Contact
- Remove phone number if currently displayed — not appropriate for a public portfolio
- Keep: email, LinkedIn link, optional contact form
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
- **Do not include:** phone number on any public-facing page, personal hobbies unrelated to tech, generic "I'm passionate about technology" copy
- **CV download:** The CV PDF should be available at `/public/jesus_jimenez_alcantara_cv.pdf` and linked from both the hero and the about page