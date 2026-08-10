# MAYAG — сайт mayag.fit

Статична візитка платформи MAYAG. Без реєстрації, кабінету та БД — усі дії в Telegram-боті.

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
Зараз: `https://t.me/FitHad_bot` (поки не переїхали на новий бот).

## Структура

```
index.html      ← сторінка
css/styles.css
js/config.js
js/main.js
assets/         ← логотип, favicon, og-image
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
