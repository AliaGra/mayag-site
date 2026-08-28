(function () {
  var cfg = window.MAYAG_CONFIG || {};
  var telegramUrl = cfg.telegramUrl || 'https://t.me/MAYAG_fit_Platform_bot';
  var helpTelegramUrl = cfg.helpTelegramUrl || 'https://t.me/help_MAYAG_Fit';
  var phoneHref = cfg.phoneHref || 'tel:+380507887041';
  var phoneDisplay = cfg.phoneDisplay || '+380 50 788 70 41';
  var emailHref = cfg.emailHref || 'mailto:help@mayag.fit';
  var emailDisplay = cfg.emailDisplay || 'help@mayag.fit';
  var cabinetUrl = cfg.cabinetUrl || 'cabinet.html';

  function addCabinetLinks() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-header .header-actions').forEach(function (actions) {
      var telegramButton = actions.querySelector('[data-telegram]');
      if (telegramButton) telegramButton.remove();
      if (actions.querySelector('[data-cabinet-link]')) return;
      var link = document.createElement('a');
      link.className = 'btn btn--primary';
      link.href = cabinetUrl;
      link.textContent = 'КАБІНЕТ';
      link.setAttribute('data-cabinet-link', '');
      if (currentPath === 'cabinet.html' || currentPath === 'cabinet') {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
      actions.appendChild(link);
    });
  }

  addCabinetLinks();

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
