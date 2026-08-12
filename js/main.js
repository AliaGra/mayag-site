(function () {
  var cfg = window.MAYAG_CONFIG || {};
  var telegramUrl = cfg.telegramUrl || 'https://t.me/MAYAG_fit_Platform_bot';
  var phoneHref = cfg.phoneHref || 'tel:+380507887041';
  var phoneDisplay = cfg.phoneDisplay || '+380 50 788 70 41';
  var emailHref = cfg.emailHref || 'mailto:help@mayag.fit';
  var emailDisplay = cfg.emailDisplay || 'help@mayag.fit';

  document.querySelectorAll('[data-telegram]').forEach(function (el) {
    el.setAttribute('href', telegramUrl);
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
