# Personal Portfolio

Professional portfolio built with Next.js, TypeScript and Tailwind CSS, showcasing my experience as a Backend Engineer focused on cloud-native systems, REST API design, authentication, payments and PostgreSQL architecture.

## Live Demo

🌐 https://jjalcantara.dev

## Features

* Next.js 16 with App Router & React Compiler
* TypeScript
* Tailwind CSS 4
* Internationalization (Spanish / English)
* Responsive design (mobile-first with bottom navigation)
* WCAG 2.1 AA accessibility
* SEO & AI-crawler optimized (`sitemap.xml`, `robots.txt`, JSON-LD, `llms.txt`, dynamic OpenGraph images)
* Daily logic puzzles with verified single-solution levels
* GDPR / LSSI compliant (no tracking, no third-party requests, no forms)
* Static Site Generation (SSG)
* Deployed on Vercel

## Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript 5
* Tailwind CSS 4

### Infrastructure

* Vercel
* Cloudflare

### Development

* ESLint 9
* LaTeX (`latexmk` for CV generation)
* GitHub
* Git

## Screenshots

### Desktop

<img width="1990" height="1614" alt="imagen" src="https://github.com/user-attachments/assets/f8fa35f3-ec47-44a5-aa61-16713dd7b5a4" />

### Mobile

<img width="546" height="1065" alt="imagen" src="https://github.com/user-attachments/assets/591edd14-595d-47cb-bffb-7fb81cdaaffe" />

## Running Locally

Clone the repository:

```bash
git clone https://github.com/jjalcantara-dev/personal-portfolio.git
cd personal-portfolio
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

Build the project:

```bash
npm run build
```

Run production server locally:

```bash
npm run start
```

## Additional Scripts

```bash
npm run lint            # Run ESLint
npm run puzzles         # Generate daily puzzle library
npm run puzzles:verify  # Verify unique solutions for all puzzle levels
npm run cv              # Compile LaTeX CVs (ES/EN) into public/
```

## Project Structure

```text
app/         # Next.js App Router pages, layouts, metadata & OG image generation
components/  # UI components & interactive daily puzzle boards
content/     # Bilingual dictionaries (es.json, en.json)
cv/          # LaTeX source files for Spanish and English CVs
lib/         # i18n, SEO helpers, design tokens & daily puzzle selector/library
public/      # Static assets, icons, CVs & llms.txt
scripts/     # Deterministic puzzle generators and uniqueness verifiers
```

## Accessibility

This project follows WCAG 2.1 AA guidelines:

* Keyboard navigation
* Screen reader support
* ARIA labels
* Proper contrast ratios
* Reduced motion support

## Internationalization

Supported languages:

* Spanish
* English

Routes:

```text
/es
/en
```

## Privacy & GDPR

The website is designed to comply with GDPR and LSSI requirements:

* No tracking or analytics cookies
* Only one optional technical cookie (`preferred_locale`) to remember language selection
* Self-hosted fonts (`next/font`) with zero third-party requests
* Clear privacy policy available at `/es/privacy` and `/en/privacy`

## Deployment

The application is automatically deployed through Vercel.

## Author

### Jesús Jiménez Alcántara

Backend Engineer

* Website: https://jjalcantara.dev
* GitHub: https://github.com/jjalcantara-dev
* LinkedIn: https://linkedin.com/in/jjalcantara

## License

Personal project for portfolio purposes.
