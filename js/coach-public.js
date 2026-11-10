(function () {
  var cfg = window.MAYAG_CONFIG || {};
  var apiUrl = (cfg.cabinetApiUrl || '').replace(/\/$/, '');

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function byId(id) {
    return document.getElementById(id);
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

  function friendlyNetworkError(error) {
    if (!navigator.onLine) {
      return 'Немає з’єднання з інтернетом. Перевір мережу і спробуй ще раз.';
    }
    var message = error && error.message ? String(error.message) : '';
    if (/Failed to fetch|NetworkError|Load failed|fetch/i.test(message)) {
      return 'Сервер тимчасово недоступний. Спробуй ще раз за хвилину.';
    }
    return message || 'Не вдалося завантажити картку.';
  }

  function showError(text) {
    byId('coach-card-loading').classList.add('is-hidden');
    byId('coach-card').classList.add('is-hidden');
    byId('coach-card-error-text').textContent = text;
    byId('coach-card-error').classList.remove('is-hidden');
  }

  function render(profile) {
    var name = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Тренер';
    var location = [profile.city, profile.oblast, profile.district].filter(Boolean).join(', ');
    var isPreview = new URLSearchParams(window.location.search).get('preview') === '1';
    var links = [];
    if (profile.instagram) {
      links.push('<a href="' + escapeHtml(profile.instagram) + '" target="_blank" rel="noopener noreferrer">Instagram</a>');
    }
    if (profile.telegramUsername && !isPreview) {
      links.push('<a href="https://t.me/' + encodeURIComponent(profile.telegramUsername) + '" target="_blank" rel="noopener noreferrer">Написати в Telegram</a>');
    }
    var venues = Array.isArray(profile.venues) ? profile.venues : [];
    var venueHtml = venues.length
      ? '<ul class="cabinet-venues">' + venues.map(function (venue) {
        var address = [venue.city, venue.address].filter(Boolean).join(', ');
        return '<li><strong class="cabinet-wrap">' + escapeHtml(venue.name || 'Заклад') + '</strong>' +
          (address ? '<span class="cabinet-wrap">' + escapeHtml(address) + '</span>' : '') + '</li>';
      }).join('') + '</ul>'
      : '<p class="cabinet-muted">Інформація про заклади не додана.</p>';
    var contactButton = profile.telegramUsername && !isPreview
      ? '<a class="btn btn--dark" href="https://t.me/' + encodeURIComponent(profile.telegramUsername) + '" target="_blank" rel="noopener noreferrer">НАПИСАТИ ТРЕНЕРУ В TELEGRAM</a>'
      : '';

    byId('coach-card').innerHTML =
      '<h2 class="cabinet-public-card__name cabinet-wrap">' + escapeHtml(name) + '</h2>' +
      '<p class="cabinet-card__label">Публічна картка тренера</p>' +
      (location ? '<p class="cabinet-preview__line cabinet-wrap">' + escapeHtml(location) + '</p>' : '') +
      (profile.trainingTypes && profile.trainingTypes.length ? '<p class="cabinet-preview__line cabinet-wrap">' + escapeHtml(profile.trainingTypes.join(', ')) + '</p>' : '') +
      (profile.birthDate ? '<p class="cabinet-preview__line">' + escapeHtml(formatDate(profile.birthDate)) + '</p>' : '') +
      (links.length ? '<p class="cabinet-links">' + links.join(' · ') + '</p>' : '') +
      '<h3>Де тренує</h3>' + venueHtml +
      (profile.documentsCount ? '<p class="cabinet-documents">Документи про освіту: ' + escapeHtml(profile.documentsCount) + ' шт.</p>' : '') +
      '<div class="cabinet-public-card__actions">' + contactButton +
        '<a class="btn btn--primary" data-telegram href="' + escapeHtml(cfg.telegramUrl || 'https://t.me/MAYAG_fit_Platform_bot') + '">ВІДКРИТИ В TELEGRAM</a>' +
      '</div>';
    byId('coach-card').querySelectorAll('[data-telegram]').forEach(function (link) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
    byId('coach-card-loading').classList.add('is-hidden');
    byId('coach-card-error').classList.add('is-hidden');
    byId('coach-card').classList.remove('is-hidden');
  }

  async function load() {
    var id = new URLSearchParams(window.location.search).get('id') || '';
    if (!id.trim()) {
      showError('У посиланні немає id тренера. Відкрий картку з кабінету або з Telegram.');
      return;
    }
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = null;
    if (controller) {
      timer = window.setTimeout(function () {
        controller.abort();
      }, 20000);
    }
    try {
      var response = await fetch(apiUrl + '/api/public/coach?id=' + encodeURIComponent(id), controller ? { signal: controller.signal } : undefined);
      var result = null;
      try {
        result = await response.json();
      } catch (_) {
        result = null;
      }
      if (!response.ok) throw new Error((result && result.message) || 'Картку не знайдено.');
      if (!result || !result.profile) throw new Error('Картку не знайдено.');
      render(result.profile);
    } catch (error) {
      if (error && error.name === 'AbortError') {
        showError('Час очікування відповіді вичерпано. Онови сторінку і спробуй ще раз.');
        return;
      }
      showError(friendlyNetworkError(error));
    } finally {
      if (timer) window.clearTimeout(timer);
    }
  }

  document.addEventListener('DOMContentLoaded', load);
})();
