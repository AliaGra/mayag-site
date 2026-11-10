---
name: MAYAG Fit
description: Fitness platform entry site — Telegram-first, red-signal brand, clear role paths
colors:
  brand-red: "#e30613"
  brand-red-dark: "#b80510"
  brand-red-ink: "#c10512"
  ink: "#0a0a0a"
  text: "#141414"
  muted: "#5c5c5c"
  muted-soft: "#9a9a9a"
  surface: "#f4f4f4"
  surface-warm: "#fbf8f5"
  white: "#ffffff"
  line: "rgba(10, 10, 10, 0.1)"
  telegram: "#229ed9"
  telegram-hover: "#1578a8"
  ink-hover: "#222222"
  cabinet-bg: "#f7f7f7"
  success: "#16803c"
typography:
  display:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(2.35rem, 7vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(1.55rem, 3.5vw, 2.15rem)"
    fontWeight: 800
    lineHeight: 1.2
  title:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(1.65rem, 3.8vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.2
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 600
    letterSpacing: "0.02em"
rounded:
  "2xs": "5px"
  xs: "8px"
  logo: "10px"
  sm: "12px"
  md: "18px"
  pill: "999px"
  full: "50%"
spacing:
  content: "1080px"
  narrow: "680px"
  header: "84px"
components:
  button-primary:
    backgroundColor: "{colors.brand-red}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.35rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.brand-red-dark}"
    textColor: "{colors.white}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  button-telegram:
    backgroundColor: "{colors.telegram}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
  button-telegram-hover:
    backgroundColor: "{colors.telegram-hover}"
    textColor: "{colors.white}"
  card-feature:
    backgroundColor: "{colors.surface-warm}"
    rounded: "{rounded.sm}"
    padding: "1.15rem 1.2rem"
  card-cabinet:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "1.15rem 1.2rem"
---

# Design System: MAYAG Fit

## Overview

**Creative North Star: "The Telegram Gym Floor"**

MAYAG Fit’s public site is a bright, direct handoff into Telegram — not a lifestyle magazine and not a dense SaaS dashboard. Marketing pages (Persuade) lead with brand red, Syne display type, and one primary action: open the bot. Operate surfaces (`cabinet.html`, `coach.html`) keep the same palette but drop marketing nav density so the task (login, readiness, public card) stays scanable.

Confirmed rejections: purple-gradient “AI SaaS” looks; cream-and-terracotta editorial templates; newspaper broadsheet layouts; eyebrow/kicker labels above headings; inset hero media cards; inventing metrics or testimonials.

**Key Characteristics:**
- Brand-first first viewport (MAYAG Fit + one H1 + one CTA)
- Red as signal color; ink for body; warm-off-white as secondary surface
- Full-bleed hero imagery on the homepage
- Pill buttons; soft cards only where interaction or grouping needs a container
- Operate shell is quieter than Persuade shell

## Colors

Signal red on light concrete gray, with a warmer paper tone for feature blocks. Telegram blue is reserved for Telegram-native actions.

### Primary
- **Signal Red** (`#e30613`): Primary fill for CTAs and brand marks. Prefer for solid buttons, not for long body text.
- **Signal Red Dark** (`#b80510`): Primary hover / pressed fill.
- **Signal Red Ink** (`#c10512`): Text and links on light surfaces when red must meet ≥4.5:1 contrast.

### Secondary
- **Telegram Blue** (`#229ed9` / `--telegram`): Contacts / Telegram help actions only. Hover `#1578a8` (`--telegram-hover`) to keep white text ≥4.5:1.
- **Ink Hover** (`#222222` / `--ink-hover`): Dark button hover.
- **Cabinet Surface** (`#f7f7f7` / `--cabinet-bg`): Operate page wash.
- **Success** (`#16803c` / `--success`): Readiness “complete” state.

### Neutral
- **Ink** (`#0a0a0a`): Brand black, dark buttons, strong headings when not red.
- **Body** (`#141414`): Default text.
- **Muted** (`#5c5c5c`): Supporting copy and helper labels.
- **Muted Soft** (`#9a9a9a`): Reserved token; prefer **Muted** for any visible UI text (indices included).
- **Concrete** (`#f4f4f4`): Page background (Persuade).
- **Warm Paper** (`#fbf8f5`): Feature / audience surfaces.
- **White** (`#ffffff`): Cards, operate panels, button text on red/blue.
- **Line** (`rgba(10, 10, 10, 0.1)`): Dividers and quiet borders.

### Named Rules
**The Fill vs Ink Rule.** Use `--red` for fills; use `--red-ink` for text/links on light backgrounds. Never put long body copy in brand fill red.

**The One Primary Action Rule.** On Persuade pages, one red primary CTA carries the Telegram handoff; cabinet/ghost actions stay secondary.

## Typography

**Display Font:** Syne → Manrope → system-ui  
**Body Font:** Manrope (system-ui fallback)

**Character:** Athletic and geometric display paired with a readable, slightly rounded body — confident without shouting. Syne has no Cyrillic; Manrope fills Ukrainian display glyphs before the system face.

### Hierarchy
- **Display** (800, `clamp(2.35rem, 7vw, 4.25rem)`, ~1.05): Hero H1.
- **Headline** (800, `clamp(1.55rem, 3.5vw, 2.15rem)`, 1.2): Section titles.
- **Title** (800, `clamp(1.65rem, 3.8vw, 2.25rem)`, 1.2): Role / feature-block titles (often red-ink).
- **Body** (400–600, ~1.05rem, 1.55): Leads and paragraphs; keep measure comfortable (~40rem max in blocks).
- **Label** (600, ~0.82rem): Cabinet helpers and meta; sentence case, not all-caps eyebrows.

### Named Rules
**The No-Eyebrow Rule.** Do not place a kicker/eyebrow above a heading. The heading carries the weight.

**The Brand Name Rule.** In UI copy, the product is **MAYAG Fit**. Technical IDs (bot username, domain, file names) stay as-is.

## Layout

Content max width `--content: 1080px`; narrow column `--narrow: 680px`. Header height ~84px. Marketing pages use a patterned light background; operate pages (`site-header--app`, `site-footer--app`) drop the marketing pattern and role nav.

Spacing rhythm: tight within a card/group, generous between sections. Breakpoints observed at 980px, 640px, and 380px. Nav collapses to a denser grid on small screens while keeping tap targets usable.

Hero (homepage): full-bleed media plane; brand mark + H1 + lead + one CTA group — no stats, schedule chips, or floating badges on the media.

## Elevation & Depth

Hybrid: mostly tonal surfaces with a soft ambient shadow vocabulary. Depth is quiet, not neon or hard-offset.

### Shadow Vocabulary
- **Panel** (`0 12px 40px rgba(10, 10, 10, 0.08)`): Large panels / elevated blocks.
- **Card** (`0 8px 22px rgba(10, 10, 10, 0.045)`): Feature cards.
- **Button lift** (`0 8px 18px rgba(10, 10, 10, 0.14)`): Hover on buttons (with 1px translateY).

### Named Rules
**The Soft Lift Rule.** Shadows are ambient and offset; no zero-blur colored glow rings as decoration. Focus uses `--focus` red ring.

## Shapes

Soft modern geometry: `2xs 5px` (compact nav chips), `xs 8px` (logo/media corners), `logo 10px` (brand focus hit area), `sm 12px` (feature cards), `md 18px` (cabinet/panels), `pill 999px` (buttons/chips), `full 50%` (round logo crop). Borders stay hairline (`var(--line)` or ~8% black). Avoid nested cards and hard left accent bars.

## Components

Controls feel **direct and athletic**: pill CTAs, clear labels, minimal chrome.

### Buttons
- **Shape:** Pill (`999px`), min-height 48px (lg 56px).
- **Primary:** Signal red fill, white text; hover → brand-red-dark.
- **Ghost:** Transparent + ink border; hover fills ink.
- **Dark:** Ink fill for secondary strong actions (retry, fix-in-Telegram).
- **Telegram:** Telegram blue fill; hover `#1578a8`.
- **Focus:** `--focus` ring (`0 0 0 3px rgba(193, 5, 18, 0.35)`).

### Cards / Containers
- **Feature cards:** Warm paper, light border, soft shadow; used for role grids and contacts — not as hero structure.
- **Cabinet cards:** White on operate surfaces; denser padding; helper labels under titles.
- **Error cards:** Same card shell with error emphasis on the title; always include recovery (retry / Telegram / back).

### Navigation
- **Persuade header:** Logo + compact role links + primary **В TELEGRAM** + ghost **КАБІНЕТ**.
- **Operate header (`site-header--app`):** Logo + short app nav (На сайт, Для тренерів) — no marketing role grid.

### Inputs (cabinet)
- Large touch-friendly fields; red outline on focus; status text under the form for onboarding progress and errors.

### Loading / Empty / Error
- Loading: muted status line + busy indicator (respects `prefers-reduced-motion`).
- Empty: short muted sentence naming what is missing and where to fix it (usually Telegram).
- Error: title + plain-language cause + recovery actions. Long user-generated strings wrap (`cabinet-wrap`); greetings truncate (`cabinet-truncate`).

## Do's and Don'ts

### Do
- Lead Persuade pages with MAYAG Fit as a hero-level brand signal and one Telegram CTA.
- Keep Operate pages quieter: task chrome, denser cards, no marketing slogan strip.
- Prefer colon / period over em-dash in body copy.
- Preserve slogan **РУХАЙСЯ • ДОСЯГАЙ • ЗРОСТАЙ** where the marketing footer/CTA already uses it.

### Don't
- Don’t invent a second accent palette or dark-mode-first marketing look.
- Don’t put detached badges, promo stickers, or stats strips on the hero media.
- Don’t use cards as the default page structure or nest cards inside cards.
- Don’t recreate the full training product on the website — hand off to Telegram.
