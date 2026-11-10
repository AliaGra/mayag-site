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

**Обов’язково зберегти:** ім’я MAYAG / MAYAG Fit, колір, тон, меседж «не додаток — Telegram», мови uk/ru, слоган «РУХАЙСЯ • ДОСЯГАЙ • ЗРОСТАЙ».

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
- [ ] `/impeccable document` → `DESIGN.md` (зафіксувати поточну систему **перед** великим візуальним стрибком *або* після затвердження нового напряму — вирішити на старті Етапу 2)

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
- [x] Лого MAYAG light як бренд-сигнал (не замінює заголовок); full-bleed, без inset-панелі
- Контроль: browser verify; detect; critique **31/36** (було 28). Повний dual-subagent critique можна повторити як контрольний прогін.

### Етап 3 — Сторінки ролей
**Закрито 2026-11-10.**
- [x] `solo` / `with-coach` / `coaches` / `clubs`: H1 + один support + note + primary CTA «ВІДКРИТИ В TELEGRAM» у intro
- [x] Єдиний header: лого як на головній; **В TELEGRAM** primary, **КАБІНЕТ** ghost; CTA внизу уніфіковано
- [x] Зменшено em-dash у body copy (uk); ru ще немає на сайті

### Етап 4 — Кабінет / публічна картка
- [ ] `cabinet.html`, `coach.html` — operate-mode: щільність карток, nav, контраст
- [ ] Не змішувати маркетинговий Persuade з task UI кабінету

### Етап 5 — Фінішна якість
- [ ] `/impeccable harden` (стани помилок кабінету, overflow, i18n-готовність)
- [ ] `/impeccable polish` по всьому маркетинговому шару
- [ ] Оновити `DESIGN.md` (`/impeccable document`) як фінальну систему
- [ ] Фінальний critique + detect; оновити цей файл секцією «Після перетворення»

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

---

## 6. Наступна дія (за замовчуванням)

**Етап 4** — кабінет / публічна картка (`cabinet.html`, `coach.html`): operate-mode, щільність, без змішування з marketing Persuade.
