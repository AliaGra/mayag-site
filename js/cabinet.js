(function () {
  var cfg = window.MAYAG_CONFIG || {};
  var apiUrl = (cfg.cabinetApiUrl || '').replace(/\/$/, '');
  var loginStorageKey = 'mayag.telegram.login';
  var onboardingStorageKey = 'mayag.cabinet.onboarding';
  var onboardingPollTimer = null;

  function byId(id) {
    return document.getElementById(id);
  }

  function show(id, visible) {
    var node = byId(id);
    if (node) node.classList.toggle('is-hidden', !visible);
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatDate(value) {
    if (!value) return '';
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  function setLoginVisible(visible) {
    show('cabinet-login', visible);
    show('cabinet-loading', !visible);
    if (visible) {
      show('cabinet-error', false);
      show('cabinet-view', false);
    }
  }

  function showError(title, text) {
    show('cabinet-login', false);
    show('cabinet-loading', false);
    show('cabinet-view', false);
    byId('cabinet-error-title').textContent = title;
    byId('cabinet-error-text').textContent = text;
    show('cabinet-error', true);
  }

  function renderReadiness(profile) {
    var checks = [
      { label: 'Ім’я в профілі', ok: Boolean((profile.firstName || '').trim()) },
      { label: 'Місто', ok: Boolean((profile.city || '').trim()) },
      { label: 'Instagram', ok: Boolean((profile.instagram || '').trim()) },
      { label: 'Типи тренувань', ok: Array.isArray(profile.trainingTypes) && profile.trainingTypes.length > 0 },
      { label: 'Де треную', ok: Array.isArray(profile.venues) && profile.venues.length > 0 }
    ];
    return checks.map(function (check) {
      return '<li class="' + (check.ok ? 'is-complete' : '') + '">' +
        '<span aria-hidden="true">' + (check.ok ? '✓' : '○') + '</span>' +
        '<span>' + escapeHtml(check.label) + '</span>' +
        '<strong>' + (check.ok ? 'Заповнено' : 'Доповнити в Telegram') + '</strong>' +
        '</li>';
    }).join('');
  }

  function renderVenues(venues) {
    if (!Array.isArray(venues) || !venues.length) {
      return '<p class="cabinet-muted">Заклади ще не додані до публічної картки.</p>';
    }
    return '<ul class="cabinet-venues">' + venues.map(function (venue) {
      var line = [venue.city, venue.address].filter(Boolean).join(', ');
      return '<li><strong>' + escapeHtml(venue.name || 'Заклад') + '</strong>' +
        (line ? '<span>' + escapeHtml(line) + '</span>' : '') +
        '</li>';
    }).join('') + '</ul>';
  }

  function renderProfile(profile) {
    var name = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Тренер';
    var publicHref = profile.publicId
      ? 'coach.html?id=' + encodeURIComponent(profile.publicId) + '&preview=1'
      : '';
    var links = [];
    if (profile.instagram) {
      links.push('<a href="' + escapeHtml(profile.instagram) + '" target="_blank" rel="noopener noreferrer">Instagram</a>');
    }
    if (profile.telegramUsername) {
      links.push('<a href="https://t.me/' + encodeURIComponent(profile.telegramUsername) + '" target="_blank" rel="noopener noreferrer">Telegram</a>');
    }
    var location = [profile.city, profile.oblast, profile.district].filter(Boolean).join(', ');
    var venueReady = Array.isArray(profile.venues) && profile.venues.length > 0;
    var publicLink = venueReady && publicHref
      ? '<a class="btn btn--ghost" href="' + publicHref + '">ВІДКРИТИ ПУБЛІЧНУ КАРТКУ</a>'
      : '<p class="cabinet-muted">Публічне посилання з’явиться після додавання закладу в Telegram.</p>';

    byId('cabinet-view').innerHTML =
      '<div class="cabinet-welcome cabinet-card">' +
        '<div><p class="eyebrow">MAYAG · ВІТРИНА ТРЕНЕРА</p>' +
        '<h2>Привіт, ' + escapeHtml(profile.firstName || 'тренере') + '!</h2>' +
        '<p>Це твоя публічна картка — так її бачать клієнти та користувачі MAYAG.</p></div>' +
        '<a class="btn btn--primary" data-telegram href="' + escapeHtml(cfg.telegramUrl || 'https://t.me/MAYAG_fit_Platform_bot') + '">ВІДКРИТИ MAYAG У TELEGRAM</a>' +
      '</div>' +
      '<section class="cabinet-grid" aria-label="Вітрина тренера">' +
        '<article class="cabinet-card cabinet-preview">' +
          '<p class="cabinet-card__label">ПУБЛІЧНА КАРТКА</p>' +
          '<h2>' + escapeHtml(name) + '</h2>' +
          (location ? '<p class="cabinet-preview__line">⌖ ' + escapeHtml(location) + '</p>' : '') +
          (profile.trainingTypes && profile.trainingTypes.length ? '<p class="cabinet-preview__line">💪 ' + escapeHtml(profile.trainingTypes.join(', ')) + '</p>' : '') +
          (links.length ? '<p class="cabinet-links">' + links.join(' · ') + '</p>' : '<p class="cabinet-muted">Instagram та Telegram ще не додані.</p>') +
          '<h3>Де треную</h3>' + renderVenues(profile.venues) +
          (profile.documentsCount ? '<p class="cabinet-documents">📄 Документи про освіту: ' + escapeHtml(profile.documentsCount) + ' шт.</p>' : '') +
          '<div class="cabinet-preview__actions">' + publicLink + '</div>' +
        '</article>' +
        '<article class="cabinet-card">' +
          '<p class="cabinet-card__label">ГОТОВНІСТЬ ВІТРИНИ</p>' +
          '<h2>Що побачать клієнти</h2>' +
          '<ul class="cabinet-checklist">' + renderReadiness(profile) + '</ul>' +
          '<a class="btn btn--dark btn--block" data-telegram href="' + escapeHtml(cfg.telegramUrl || 'https://t.me/MAYAG_fit_Platform_bot') + '">ВИПРАВИТИ В TELEGRAM</a>' +
        '</article>' +
      '</section>' +
      '<section class="cabinet-next cabinet-card">' +
        '<p class="cabinet-card__label">РОБОТА</p>' +
        '<h2>У Telegram — усе необхідне</h2>' +
        '<div class="cabinet-next__items"><span>Клієнти та інвайти</span><span>Розклад і записи</span><span>Тренування та плани</span><span>Звіти й розсилка</span></div>' +
      '</section>' +
      '<div class="cabinet-logout"><button id="cabinet-logout" class="btn btn--ghost" type="button">ВИЙТИ З КАБІНЕТУ</button></div>';
    byId('cabinet-logout').addEventListener('click', function () {
      sessionStorage.removeItem(loginStorageKey);
      setLoginVisible(true);
    });
    byId('cabinet-view').querySelectorAll('[data-telegram]').forEach(function (link) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
    show('cabinet-login', false);
    show('cabinet-loading', false);
    show('cabinet-error', false);
    show('cabinet-view', true);
  }

  async function loadProfile(auth) {
    if (!auth || !auth.id || !auth.hash) {
      setLoginVisible(true);
      return;
    }
    setLoginVisible(false);
    try {
      var response = await fetch(apiUrl + '/api/cabinet/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auth)
      });
      var result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Не вдалося відкрити кабінет.');
      }
      if (!result.profile) throw new Error('Профіль тренера не отримано.');
      sessionStorage.setItem(loginStorageKey, JSON.stringify(auth));
      renderProfile(result.profile);
    } catch (error) {
      showError('Кабінет недоступний', error.message);
    }
  }

  function setOnboardingStatus(text) {
    var node = byId('cabinet-onboarding-status');
    if (node) node.textContent = text || '';
  }

  async function pollOnboarding(token) {
    if (!token) return;
    setLoginVisible(false);
    var loading = document.querySelector('#cabinet-loading .cabinet-status');
    if (loading) loading.textContent = 'Чекаємо підтвердження та завершення профілю в Telegram…';
    try {
      var response = await fetch(apiUrl + '/api/cabinet/onboarding?token=' + encodeURIComponent(token), {
        cache: 'no-store'
      });
      var result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Запит реєстрації не знайдено.');
      if (result.status === 'completed' && result.profile) {
        sessionStorage.removeItem(onboardingStorageKey);
        renderProfile(result.profile);
        return;
      }
      if (result.status === 'completed') {
        sessionStorage.removeItem(onboardingStorageKey);
        showError('Кабінет недоступний', result.message || 'Профіль тренера не отримано.');
        return;
      }
      if (result.status === 'expired') {
        sessionStorage.removeItem(onboardingStorageKey);
        showError('Час очікування завершився', 'Повернись на сайт і створи новий запит на реєстрацію.');
        return;
      }
      if (onboardingPollTimer) window.clearTimeout(onboardingPollTimer);
      onboardingPollTimer = window.setTimeout(function () {
        pollOnboarding(token);
      }, 3000);
    } catch (error) {
      showError('Не вдалося перевірити реєстрацію', error.message);
    }
  }

  async function startOnboarding(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var phone = byId('cabinet-phone');
    var submit = form.querySelector('button[type="submit"]');
    if (!phone || !phone.value.trim()) return;
    if (submit) submit.disabled = true;
    setOnboardingStatus('Створюємо одноразове посилання…');
    try {
      var response = await fetch(apiUrl + '/api/cabinet/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.value.trim() })
      });
      var result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Не вдалося створити запит.');
      sessionStorage.setItem(onboardingStorageKey, result.token);
      setOnboardingStatus('Відкриваємо Telegram. Надішли контакт і заверши анкету тренера.');
      var opened = window.open(result.telegramUrl, '_blank', 'noopener,noreferrer');
      if (!opened) window.location.href = result.telegramUrl;
      pollOnboarding(result.token);
    } catch (error) {
      setOnboardingStatus(error.message);
      if (submit) submit.disabled = false;
    }
  }

  window.onTelegramAuth = function (user) {
    loadProfile(user);
  };

  document.addEventListener('DOMContentLoaded', function () {
    var onboardingForm = byId('cabinet-phone-form');
    if (onboardingForm) onboardingForm.addEventListener('submit', startOnboarding);
    var retry = byId('cabinet-retry');
    if (retry) retry.addEventListener('click', function () {
      sessionStorage.removeItem(loginStorageKey);
      var pending = sessionStorage.getItem(onboardingStorageKey);
      if (pending) {
        pollOnboarding(pending);
        return;
      }
      setLoginVisible(true);
    });
    try {
      var pendingOnboarding = sessionStorage.getItem(onboardingStorageKey);
      if (pendingOnboarding) {
        pollOnboarding(pendingOnboarding);
        return;
      }
      var stored = sessionStorage.getItem(loginStorageKey);
      loadProfile(stored ? JSON.parse(stored) : null);
    } catch (_) {
      loadProfile(null);
    }
  });
})();
