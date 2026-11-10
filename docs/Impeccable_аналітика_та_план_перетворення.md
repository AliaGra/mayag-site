# MAYAG.fit — аналітика та план перетворення сайту

**Дата baseline:** 2026-11-09  
**Статус:** робочий документ до повного перетворення сайту. Не змінювати висновки «заднім числом» — нові прогони додавати секціями / датами.  
**Контекст продукту:** `PRODUCT.md`  
**Знімок critique:** `.impeccable/critique/` (див. останній файл по `index.html`)  
**Detector JSON:** `.impeccable/critique/detect-index-baseline.json`, `detect-site-baseline.json`  
**Workflow нових лендингів:** `.impeccable/config.json` → `"buildPath": "comp"`  
**Live Apply:** не вмикати, поки явно не погоджено.

---

## 1. Мета перетворення

Сайт має допомагати **тренеру** і **користувачу соло**:

1. зрозуміти продукт;  
2. перейти в Telegram-бот;  
3. почати роботу в боті.

**Позиціонування:** MAYAG Fit об’єднує всіх учасників фітнесу в єдину систему, де кожному простіше рухатися вперед.

**Обов’язково зберегти:** ім’я MAYAG Fit / MAYAG Fit, колір, тон, меседж «не додаток — Telegram», мови uk/ru, слоган «РУХАЙСЯ • ДОСЯГАЙ • ЗРОСТАЙ».

---

## 2. Baseline-оцінка (2026-11-09)

### Обсяг цього прогону
- Джерело: код + `npx impeccable detect` (homepage і весь сайт).
- Повний `/impeccable critique` з браузерним overlay **ще не** робився — це наступний контрольний етап після перших правок або перед великим redesign hero.

### Heuristics (homepage, Persuade)
**23 / 36** (H9 n/a). Див. архів critique.

### Сильні сторони
- Впізнаваний бренд (червоний, лого, Syne/Manrope).
- Розведення аудиторій (solo / з тренером / тренери / клуби).
- Меседж про Telegram присутній у hero і «Як це працює».

### Priority issues (беклог до перетворення)

| ID | Pri | Проблема | Наслідок | Орієнтир команди Impeccable |
|----|-----|----------|----------|-----------------------------|
| H1 | P0 | Hero: H1 прихований, домінує лого в панелі | Слабке «зрозуміти продукт» над згином | `/impeccable bolder` або `/impeccable layout` + copy `/impeccable clarify` на hero |
| H2 | P0 | Конкуруючі перші дії: Telegram vs «КАБІНЕТ» у шапці | Ризик невірного першого кліку | `/impeccable distill` header CTAs; кабінет вторинний |
| N1 | P1 | Nav ~10.9px; на мобілі щільна сітка 3×2 | Погана читабельність / tap | `/impeccable typeset` + `/impeccable adapt` header |
| C1 | P1 | Червоний `#e30613` на `#f4f4f4` ≈ 4.4:1 | На межі WCAG AA для дрібного тексту | `/impeccable audit` / точковий contrast fix |
| P1 | P1 | Cramped padding у section / cabinet-card | Текст «прилипає» до країв | `/impeccable layout` / `/impeccable polish` |
| T1 | P2 | Em-dash перенасиченість у copy | «AI cadence» | `/impeccable clarify` |
| T2 | P2 | Блок «фінальне тестування» біля CTA | Може знижувати довіру | `/impeccable clarify` about/CTA |

### Detector (повторювані патерни по сайту)
- `undersized-ui-text` — пункти `.site-nav` на всіх сторінках з хедером.
- `low-contrast` — червоний на світлому bg (advisory / warning залежно від контексту).
- `cramped-padding` — секції та картки кабінету.
- `em-dash-overuse` — advisory на головній.

---

## 3. План етапів (до повного перетворення)

Працювати **по цьому документу**. Кожен етап закривати відміткою і коротким записом «що змінилось / коміт».

### Етап 0 — Фіксація (зроблено 2026-11-09)
- [x] `PRODUCT.md`
- [x] Impeccable install (без Live Apply)
- [x] Baseline аналітика + detector snapshots
- [x] `/impeccable document` → `DESIGN.md` (фінальна система після Етапу 5, 2026-11-10)

### Етап 1 — Швидкі якісні виправлення (без зміни бренду)
Фокус: читабельність і ясність дії, зберегти колір/тон. **Закрито 2026-11-10.**
- [x] N1 — збільшити розмір/відступи nav; мобільна навігація (2 кол. ≤980px)
- [x] C1 — контраст: `--red-ink` для тексту на світлому; `--red` для fill-кнопок
- [x] P1 — padding секцій / feature / CTA / contacts / cabinet-card; ширші gutters
- [x] H2 — у хедері primary **В TELEGRAM**, **КАБІНЕТ** → `btn--ghost`; виправлено `js/main.js` (раніше Telegram з хедера знімався)
- Контроль: detect `index.html` → лише advisory em-dash; `cabinet.html` → 0; critique score **28/36** (було 23/36)

### Етап 2 — Hero і перший екран (ключове перетворення)
**Закрито 2026-11-10.**
- [x] H1 — видимий H1 «Тренування в Telegram»; один lead; один CTA «ВІДКРИТИ В TELEGRAM»
- [x] Візуальний якір: комп `docs/comps/hero-comp-stage2.jpg` → фон `assets/hero-bg-stage2.jpg` + HTML
- [x] Лого MAYAG Fit light як бренд-сигнал (не замінює заголовок); full-bleed, без inset-панелі
- Контроль: browser verify; detect; critique **31/36** (було 28). Повний dual-subagent critique можна повторити як контрольний прогін.

### Етап 3 — Сторінки ролей
**Закрито 2026-11-10.**
- [x] `solo` / `with-coach` / `coaches` / `clubs`: H1 + один support + note + primary CTA «ВІДКРИТИ В TELEGRAM» у intro
- [x] Єдиний header: лого як на головній; **В TELEGRAM** primary, **КАБІНЕТ** ghost; CTA внизу уніфіковано
- [x] Зменшено em-dash у body copy (uk); ru ще немає на сайті

### Етап 4 — Кабінет / публічна картка
**Закрито 2026-11-10.**
- [x] Operate-shell: `site-header--app` / `app-nav` (На сайт, Для тренерів) замість маркетингового nav
- [x] Компактніший footer без slogan/рольових лінків; світліший фон без marketing pattern
- [x] Прибрано eyebrow; щільніші картки; labels як helper text; copy без em-dash у hero
- [x] `cabinet.js` welcome/cards без marketing kicker

### Етап 5 — Фінішна якість
**Закрито 2026-11-10.**
- [x] `/impeccable harden` — cabinet/coach: timeout/offline errors, wrap/truncate, busy loading, recovery CTAs
- [x] `/impeccable polish` — CTA label «ВІДКРИТИ В TELEGRAM», em-dash cleanup на index/contacts, telegram hover contrast, radius/color tokens aligned to DESIGN.md
- [x] `DESIGN.md` + `.impeccable/design.json` (North Star: The Telegram Gym Floor)
- [x] Фінальний detect site → **0 findings**; critique dual-subagent homepage **25/36** (див. «Після перетворення»)

---

## 4. Правила роботи по беклогу

1. Не розмивати P0 (H1, H2), поки не закриті або свідомо відкладені записом у цьому файлі.  
2. Будь-який redesign зберігає бренд-зобов’язання з `PRODUCT.md`.  
3. Після змістовного етапу — новий critique snapshot у `.impeccable/critique/` і рядок у «Журнал прогонів» нижче.  
4. Live / Live Apply не використовувати, доки не буде окремого рішення.

---

## 5. Журнал прогонів

| Дата | Що | Score / нотатка |
|------|-----|-----------------|
| 2026-11-09 | Baseline (detect + source review) | 23/36; P0: H1, H2 |
| 2026-11-10 | Етап 1 (H2, N1, C1, P1) | 28/36; P0 лишився H1 (hero); detect index clean крім em-dash |
| 2026-11-10 | Етап 2 (hero bleed + H1) | 31/36; P0 H1 закрито; комп→код |
| 2026-11-10 | Етап 3 (role pages CTA/hierarchy) | intro CTA + unified header; em-dash cleanup |
| 2026-11-10 | Етап 4 (cabinet/coach operate) | app chrome; denser cards; no marketing nav/eyebrow |
| 2026-11-10 | Етап 5 (harden/polish/document) | detect 0; critique 25/36; DESIGN.md shipped |
| 2026-11-10 | Аудит повторний | 15/20 Good; план A/B/C |
| 2026-11-10 | Етап A (P1) | mobile nav toggle; assets; skip-link |
| 2026-11-10 | Етап B (P2) | local fonts; tokens; 44px; trust/labels; PRODUCT uk |
| 2026-11-10 | Етап C (P3) | about balance; design.json; detect 0; ~17/20 |
| 2026-11-10 | Аудит після A–C | **18/20** Excellent; detect 0 |
| 2026-11-10 | Постаудитний пакет | og/hero/typeset/distill/polish |

---

## 6. Після перетворення (2026-11-10)

**Статус плану етапів 0–5:** закрито.

### Що досягнуто
- Persuade: brand-first hero, єдиний Telegram CTA, role pages з intro CTA, контраст/nav/padding.
- Operate: окремий chrome для кабінету/публічної картки; hardened error/loading/overflow.
- Система: `PRODUCT.md` + `DESIGN.md` + sidecar; detector snapshots у `.impeccable/critique/`.

### Фінальний контроль
- Detect (усі ключові сторінки): **0** (`detect-site-e5-final.json`).
- Critique homepage (Assessment A+B, dual subagents): **25/36** (H9 n/a). Baseline був 23 → пік після Stage 2 був 31; фінальний незалежний прогін строгіший на consistency/minimalism/mobile header.

### Беклог після перетворення → план етапів A–C (аудит 2026-11-10, 15/20)

Джерело: повторний `/impeccable audit` після Stage 5.

#### Етап A — P1 (мобільний chrome + вага + a11y bypass)
**Закрито 2026-11-10.**
- [x] M1 — компактний мобільний header: `.nav-toggle` + згортання `.site-nav` @≤980px (JS progressive)
- [x] OPT1 — стиснуто logo/favicon/hero/brand light (favicon ~3KB, hero ~81KB, logo ~52KB)
- [x] A11Y1 — skip-link «До змісту» на всіх сторінках

#### Етап B — P2 (perf / tokens / product gaps)
**Закрито 2026-11-10.**
- [x] OPT2 — self-host Manrope/Syne у `fonts/` (`mayag-fonts.css`), без Google Fonts stylesheet
- [x] TCH1 — `.header-actions .btn` min-height **44px** (desktop + mobile)
- [x] TOK1 — `--telegram`, `--telegram-hover`, `--ink-hover`, `--cabinet-bg`, `--success`; breadcrumbs → `var(--muted)`
- [x] CACHE1 — єдиний `?v=20261110-b` для CSS/JS/fonts
- [x] I18N1 — PRODUCT звужено до live `uk`; `ru` deferred
- [x] T2 — trust copy без «фінальне тестування»
- [x] L1 — audience labels = nav («Тренуйся з тренером», «Для тренерів», «Для клубів…»)
- [x] M2 — dual routing залишено свідомо (header + role picker); labels узгоджені

#### Етап C — P3 (polish)
**Закрито 2026-11-10.**
- [x] TYPE1 — about title скорочено + `text-wrap: balance`; прибрано inline style
- [x] DOC1 — оновлено `.impeccable/design.json` під актуальний `DESIGN.md` (токени A/B, local fonts, nav-toggle)
- [x] polish — `::selection` / `caret-color`; cache `?v=20261110-c`
- [x] повторний detect: static **0**, live URL **0** (`detect-site-stage-c.json`, `detect-url-stage-c.json`)
- Орієнтовний audit після A–C: **~17/20 Good** (було 15/20): perf/theming/responsive підняті; a11y лишається strong-good без AAA claim

### Постаудитний пакет (2026-11-10)
Після аудиту 18/20 виконано разом:
- [x] optimize — `og-image.jpg`, стиснутий `logo-mayag-light.png`, hero `srcset` (800/1280)
- [x] typeset — display stack `Syne, Manrope, system-ui` для кирилиці
- [x] distill — прибрано дубль `page-audience-nav` на role pages (лишився homepage audience picker)
- [x] polish — cache `?v=20261110-d`; прибрано dead CSS

### Наступна дія
Беклог A–C і постаудитний пакет закриті. Далі — лише за новим запитом.
