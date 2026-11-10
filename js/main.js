(function () {
  var cfg = window.MAYAG_CONFIG || {};
  var telegramUrl = cfg.telegramUrl || 'https://t.me/MAYAG_fit_Platform_bot';
  var helpTelegramUrl = cfg.helpTelegramUrl || 'https://t.me/help_MAYAG_Fit';
  var phoneHref = cfg.phoneHref || 'tel:+380507887041';
  var phoneDisplay = cfg.phoneDisplay || '+380 50 788 70 41';
  var emailHref = cfg.emailHref || 'mailto:help@mayag.fit';
  var emailDisplay = cfg.emailDisplay || 'help@mayag.fit';
  var cabinetUrl = cfg.cabinetUrl || 'cabinet.html';

  function ensureHeaderActions() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    var onCabinet = currentPath === 'cabinet.html' || currentPath === 'cabinet';

    document.querySelectorAll('.site-header .header-actions').forEach(function (actions) {
      var cabinet = actions.querySelector('[data-cabinet-link]');
      var telegram = actions.querySelector('a[data-telegram]');

      if (!telegram) {
        telegram = document.createElement('a');
        telegram.setAttribute('data-telegram', '');
        telegram.textContent = 'В TELEGRAM';
        if (cabinet) actions.insertBefore(telegram, cabinet);
        else actions.appendChild(telegram);
      }

      telegram.className = 'btn btn--primary';
      telegram.href = telegramUrl;
      telegram.setAttribute('target', '_blank');
      telegram.setAttribute('rel', 'noopener noreferrer');

      if (!cabinet) {
        cabinet = document.createElement('a');
        cabinet.setAttribute('data-cabinet-link', '');
        cabinet.textContent = 'КАБІНЕТ';
        cabinet.href = cabinetUrl;
        actions.appendChild(cabinet);
      }

      cabinet.className = 'btn btn--ghost';
      cabinet.href = cabinetUrl;
      if (onCabinet) {
        cabinet.classList.add('is-active');
        cabinet.setAttribute('aria-current', 'page');
      } else {
        cabinet.classList.remove('is-active');
        cabinet.removeAttribute('aria-current');
      }
    });
  }

  ensureHeaderActions();

  document.querySelectorAll('[data-telegram]').forEach(function (el) {
    el.setAttribute('href', telegramUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  document.querySelectorAll('[data-help-telegram]').forEach(function (el) {
    el.setAttribute('href', helpTelegramUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  document.querySelectorAll('[data-phone]').forEach(function (el) {
    el.setAttribute('href', phoneHref);
    if (el.childNodes.length <= 1) {
      el.textContent = phoneDisplay;
    }
  });

  document.querySelectorAll('[data-email]').forEach(function (el) {
    el.setAttribute('href', emailHref);
    if (el.childNodes.length <= 1) {
      el.textContent = emailDisplay;
    }
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.reveal').forEach(function (node) {
      io.observe(node);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (node) {
      node.classList.add('is-visible');
    });
  }
})();
