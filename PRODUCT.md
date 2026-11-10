# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors of mayag.fit:

1. **Coaches (тренери)** — decide whether MAYAG Fit fits their work, then open the Telegram bot and start working there.
2. **Solo users (користувачі соло)** — understand the product, open the Telegram bot, and begin training/work in the bot.

Secondary audiences present on the site (landing paths exist): people who train with a coach; clubs, studios, and sports schools. The site’s primary job for the named primary users is product understanding → bot entry → start of work in Telegram.

## Product Purpose

MAYAG Fit is a fitness platform that runs in Telegram (not a separate installable app). The website is the public face and entry point: explain the product, route people by role, and send them into the Telegram bot so they can begin work.

Success for a site visit: the visitor understands what MAYAG Fit is, chooses their path if needed, and opens Telegram to start.

## Positioning

MAYAG Fit brings all fitness participants into one system where it is easier for each of them to move forward — coaches, solo trainees, clients with coaches, clubs, studios, and sports schools — in a single Telegram-based workflow rather than a separate fitness app.

## Operating Context

- Public site: https://mayag.fit (static marketing pages; optional Cloudflare Pages Functions for public coach card).
- Primary product surface: Telegram bot (`js/config.js` → `telegramUrl`).
- Coach cabinet on the site: **paused** (no public entry; `cabinet.html` redirects to `coaches.html`). May return later if a clear use case appears.
- Content and UI language on the public site: Ukrainian (`uk`). Russian (`ru`) is a planned expansion, not shipped on mayag.fit yet.

## Capabilities and Constraints

- Site stack: static HTML/CSS/JS; deploy via Cloudflare Pages from git; no SPA framework required.
- Main CTAs point into Telegram; core training workflows live in the bot, not on the marketing site.
- Must preserve the product message: **not an app to install — works in Telegram you already have**.
- Do not invent testimonials, metrics, or partner claims that are not already on the site or supplied by the team.

## Brand Commitments

- **Name:** MAYAG Fit / MAYAG Fit (domain mayag.fit).
- **Slogan:** «РУХАЙСЯ • ДОСЯГАЙ • ЗРОСТАЙ».
- **Color and tone:** keep the existing brand color and voice already on the site; do not invent a new palette or personality unless explicitly redesigning.
- **Message:** «не додаток — Telegram» / not an app — Telegram.
- **Languages:** Ukrainian (`uk`) on the live site; Russian (`ru`) deferred until copy is ready.
- **Assets:** logo and favicon under `assets/` (e.g. `assets/logo-mayag.png`, `assets/favicon.png`, `assets/og-image.jpg`).

## Evidence on Hand

- Live marketing pages: `index.html`, `solo.html`, `with-coach.html`, `coaches.html`, `clubs.html`, `contacts.html`, `oferta.html`; optional `coach.html` public card.
- Shared styles: `css/styles.css`; config: `js/config.js`.
- Brand imagery in `assets/`.
- No fabricated case studies or third-party quotes should be added without real source material.

## Product Principles

1. **Bot-first outcome** — the site’s job is clarity and handoff into Telegram, not recreating the full product on the web.
2. **One system for every role** — speak to coaches, solo users, clients, and venues as parts of one fitness ecosystem.
3. **No install friction** — always reinforce that Telegram is enough; avoid sounding like a native app download funnel.
4. **Preserve brand identity** — name, color, tone, and slogan stay consistent across pages.
5. **Language honesty** — ship Ukrainian as the live site language; do not invent a Russian UI until real copy is provided.

## Accessibility & Inclusion

No additional product-specific accessibility standard was set beyond normal web best practice for a public marketing site (readable contrast, usable mobile layout, clear CTAs).
