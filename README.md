# MAYAG — сайт mayag.fit

Статична візитка платформи MAYAG. Основні дії залишаються в Telegram-боті; сайт також має MVP-вітрину тренера з входом через Telegram.

## Як оновлювати сайт (постійний процес)

1. Змінюєте файли в цій папці (`index.html`, `css/`, тексти тощо).
2. Коміт і пуш у GitHub:
   ```powershell
   cd "D:\MAYAG SITE"
   git add .
   git commit -m "опис змін"
   git push
   ```
3. Cloudflare Pages сам перезбирає сайт за 1–2 хвилини.

Нічого в налаштуваннях хостингу міняти не потрібно — лише дописуєте контент і пушите.

## Посилання на бота

Єдине місце: `js/config.js` → `telegramUrl`  
Зараз: `https://t.me/MAYAG_fit_Platform_bot`

## Кабінет тренера

`cabinet.html` — read-only вітрина тренера. Вхід виконується через Telegram Login Widget, а
серверна перевірка та читання профілю працюють через Cloudflare Pages Functions:

- `functions/api/cabinet/coach.js` — перевірка Telegram і профіль тренера
- `functions/api/public/coach.js` — публічна картка тренера
- `coach.html?id=<telegram_chat_id>` — публічний перегляд

У Cloudflare Pages → Settings → Variables потрібно додати:

- `BOT_TOKEN` — токен основного MAYAG-бота
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` — тільки як серверний secret, не в коді сайту

У BotFather для основного бота потрібно виконати `/setdomain` і вказати `mayag.fit`.

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
cd "D:\MAYAG SITE"
npx --yes serve .
```

## Cloudflare Pages (один раз)

Підключення через **Git** (не Upload):

1. Репозиторій на GitHub з цією папкою.
2. dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Обрати репозиторій MAYAG.
4. Налаштування:
   - Framework preset: **None**
   - Build command: *(порожньо)*
   - Build output directory: `/` або `.`
5. Deploy → потім **Custom domains**: `mayag.fit` і `www.mayag.fit`.

Після цього всі наступні оновлення — тільки через `git push`.
