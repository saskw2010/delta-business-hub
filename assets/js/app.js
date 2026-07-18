(() => {
  const root = document.documentElement;
  const storageKey = 'dbh-theme';
  const savedTheme = localStorage.getItem(storageKey);
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = savedTheme || (preferredDark ? 'dark' : 'light');

  const updateThemeLabels = () => {
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const dark = root.dataset.theme === 'dark';
      button.setAttribute('aria-label', dark ? 'Switch to light appearance' : 'Switch to dark appearance');
      button.setAttribute('title', dark ? 'Light appearance' : 'Dark appearance');
      button.textContent = dark ? '☀' : '◐';
    });
  };
  updateThemeLabels();

  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, root.dataset.theme);
      updateThemeLabels();
    });
  });

  const nav = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    const target = link.getAttribute('href');
    if (target === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const header = document.querySelector('[data-header]');
  const setHeaderState = () => header?.classList.toggle('scrolled', scrollY > 8);
  setHeaderState();
  addEventListener('scroll', setHeaderState, { passive: true });

  document.querySelectorAll('[data-current-year]').forEach(node => node.textContent = new Date().getFullYear());

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      }), { threshold: 0.12 })
    : null;
  document.querySelectorAll('.reveal').forEach(node => revealObserver ? revealObserver.observe(node) : node.classList.add('visible'));
})();
