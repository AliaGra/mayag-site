# Підключення MAYAG через Git (один раз, далі лише дописуємо)

Мета: сайт живе в GitHub → Cloudflare сам оновлює після кожного `git push`.
Upload ZIP більше не потрібен.

---

## Частина A. GitHub-репозиторій (один раз)

### A1. Створити порожній репозиторій на GitHub

1. Відкрийте https://github.com/new
2. **Repository name:** наприклад `mayag-site` (або `mayag-fit`)
3. **Public** (для Cloudflare Pages зручніше) або Private — обидва працюють.
4. **НЕ** ставте галочки:
   - Add a README
   - Add .gitignore
   - Choose a license  
   (у нас файли вже є локально)
5. Натисніть **Create repository**.
6. Скопіюйте URL репозиторію, наприклад:  
   `https://github.com/ВАШ_ЛОГІН/mayag-site.git`

### A2. Відправити код з комп’ютера

Відкрийте PowerShell:

```powershell
cd "D:\MAYAG SITE"
git remote add origin https://github.com/ВАШ_ЛОГІН/mayag-site.git
git branch -M main
git push -u origin main
```

Якщо GitHub попросить увійти — увійдіть у браузері / через токен.

Перевірте на github.com: файли `index.html`, `css/`, `assets/` мають з’явитись.

---

## Частина B. Cloudflare Pages ← Git (один раз)

1. https://dash.cloudflare.com/ → увійдіть.
2. **Workers & Pages** → **Create** → вкладка **Pages**.
3. **Connect to Git** (підключити GitHub).
4. Дозвольте Cloudflare доступ до репозиторію `mayag-site`.
5. Оберіть репозиторій → **Begin setup**.
6. Налаштування збірки:
   - **Project name:** `mayag-fit` (або як зручно)
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** залиште порожнім
   - **Build output directory:** `/` або `.` (корінь)
7. **Save and Deploy**.
8. Дочекайтесь статусу Success. Відкриється `….pages.dev`.

### Домен

У проєкті Pages → **Custom domains**:
1. Додайте `mayag.fit`
2. Додайте `www.mayag.fit`

Домен уже в Cloudflare — DNS підтягнеться сам. Зачекайте кілька хвилин → відкрийте https://mayag.fit

---

## Частина C. Як далі лише дописувати (завжди так)

```powershell
cd "D:\MAYAG SITE"
# ...редагуєте сайт...
git add .
git commit -m "коротко: що змінили"
git push
```

Через 1–2 хвилини зміни на mayag.fit.

---

## Якщо застрягнете

Напишіть, на якому кроці (A1 / A2 / B) і що бачите на екрані — підкажу далі.
