(function () {
  var cfg = window.MAYAG_CONFIG || {};
  var telegramUrl = cfg.telegramUrl || 'https://t.me/MAYAG_fit_Platform_bot';
  var helpTelegramUrl = cfg.helpTelegramUrl || 'https://t.me/help_MAYAG_Fit';
  var phoneHref = cfg.phoneHref || 'tel:+380507887041';
  var phoneDisplay = cfg.phoneDisplay || '+380 50 788 70 41';
  var emailHref = cfg.emailHref || 'mailto:help@mayag.fit';
  var emailDisplay = cfg.emailDisplay || 'help@mayag.fit';

  function ensureHeaderActions() {
    document.querySelectorAll('.site-header .header-actions').forEach(function (actions) {
      var telegram = actions.querySelector('a[data-telegram]');

      if (!telegram) {
        telegram = document.createElement('a');
        telegram.setAttribute('data-telegram', '');
        telegram.textContent = 'В TELEGRAM';
        actions.appendChild(telegram);
      }

      telegram.className = 'btn btn--primary';
      telegram.href = telegramUrl;
      telegram.setAttribute('target', '_blank');
      telegram.setAttribute('rel', 'noopener noreferrer');

      // Cabinet is paused on the public site — remove any leftover markup.
      actions.querySelectorAll('[data-cabinet-link]').forEach(function (node) {
        node.remove();
      });
    });
  }

  ensureHeaderActions();

  function setupNavToggle() {
    document.documentElement.classList.add('js-nav');

    document.querySelectorAll('.site-header').forEach(function (header) {
      var toggle = header.querySelector('.nav-toggle');
      var nav = header.querySelector('#site-nav, .site-nav');
      if (!toggle || !nav) return;

      function setOpen(open) {
        header.classList.toggle('is-nav-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        var label = toggle.querySelector('.nav-toggle__label');
        if (label) label.textContent = open ? 'Закрити' : 'Меню';
      }

      toggle.addEventListener('click', function () {
        setOpen(!header.classList.contains('is-nav-open'));
      });

      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          setOpen(false);
        });
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') setOpen(false);
      });

      window.addEventListener('resize', function () {
        if (window.matchMedia('(min-width: 981px)').matches) setOpen(false);
      });
    });
  }

  setupNavToggle();

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
