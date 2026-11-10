# MAYAG Fit — сайт mayag.fit

Статична візитка платформи MAYAG Fit. Основні дії залишаються в Telegram-боті. Кабінет тренера на сайті тимчасово вимкнено (немає входу з меню).

## Як оновлювати сайт (постійний процес)

1. Змінюєте файли в цій папці (`index.html`, `css/`, тексти тощо).
2. Коміт і пуш у GitHub:
   ```powershell
   cd "D:\MAYAG Fit SITE"
   git add .
   git commit -m "опис змін"
   git push
   ```
3. Cloudflare Pages сам перезбирає сайт за 1–2 хвилини.

Нічого в налаштуваннях хостингу міняти не потрібно — лише дописуєте контент і пушите.

## Посилання на бота

Єдине місце: `js/config.js` → `telegramUrl`  
Зараз: `https://t.me/MAYAG_fit_Platform_bot`

## Кабінет тренера (пауза)

Публічний вхід у кабінет знято з меню. `cabinet.html` редіректить на `coaches.html`.

Залишилось для можливого повернення / публічної картки:

- `functions/api/public/coach.js` — публічна картка тренера
- `coach.html?id=<telegram_chat_id>` — публічний перегляд
- `functions/api/cabinet/*`, `js/cabinet.js` — код кабінету на паузі

Якщо кабінет знову вмикатимуть, у Cloudflare Pages → Variables знадобляться `BOT_TOKEN`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, і в BotFather — `/setdomain` → `mayag.fit`.

## Структура

```
index.html      ← сторінка
css/styles.css
js/config.js
js/main.js
assets/         ← логотип, favicon, og-image
functions/      ← серверна перевірка Telegram і read-only API кабінету
robots.txt
sitemap.xml
_redirects      ← www → mayag.fit
_headers
```

## Локальний перегляд

```powershell
cd "D:\MAYAG Fit SITE"
npx --yes serve .
```

## Cloudflare Pages (один раз)

Підключення через **Git** (не Upload):

1. Репозиторій на GitHub з цією папкою.
2. dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Обрати репозиторій MAYAG Fit.
4. Налаштування:
   - Framework preset: **None**
   - Build command: *(порожньо)*
   - Build output directory: `/` або `.`
5. Deploy → потім **Custom domains**: `mayag.fit` і `www.mayag.fit`.

Після цього всі наступні оновлення — тільки через `git push`.
