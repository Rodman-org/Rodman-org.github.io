(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav-links');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox ? lightbox.querySelector('img') : null;
  const closeButton = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Открыть меню');
    };

    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  if (lightbox && lightboxImage && closeButton) {
    document.querySelectorAll('[data-full]').forEach((button) => {
      button.addEventListener('click', () => {
        lightboxImage.src = button.dataset.full;
        lightboxImage.alt = button.dataset.alt || '';
        if (typeof lightbox.showModal === 'function') {
          lightbox.showModal();
        } else {
          lightbox.setAttribute('open', '');
        }
      });
    });

    const closeLightbox = () => {
      if (typeof lightbox.close === 'function' && lightbox.open) {
        lightbox.close();
      } else {
        lightbox.removeAttribute('open');
      }
    };

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
