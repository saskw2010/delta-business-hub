(() => {
  const overlay = document.querySelector('[data-entry-overlay]');
  const status = document.querySelector('[data-entry-status]');
  document.querySelectorAll('[data-enter]').forEach(link => {
    link.addEventListener('click', event => {
      if (!overlay) return;
      event.preventDefault();
      const destination = link.href;
      const language = link.dataset.enter;
      localStorage.setItem('dbh-language', language);
      if (status) status.textContent = language === 'ar' ? 'جارٍ فتح المنصة…' : 'Entering the hub…';
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      window.setTimeout(() => { window.location.href = destination; }, 720);
    });
  });
})();
