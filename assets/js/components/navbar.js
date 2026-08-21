// Navbar component logic

export function initNavbar() {
  // ---- Navbar scroll state ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ---- Dropdown toggle (click, accessible) ----
  document.querySelectorAll('.nav-item').forEach(item => {
    const trigger = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown');
    if (!dropdown) return;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
    }
  });

  // ---- Mobile burger (simple toggle of nav-links class) ----
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Ensure mobile CTA button exists inside navLinks
    if (!navLinks.querySelector('.nav-mobile-cta')) {
      const ctaBtn = document.createElement('div');
      ctaBtn.className = 'nav-mobile-cta';
      ctaBtn.innerHTML = '<a href="https://brasmed.prosesmt.com.br/login" target="_blank" class="btn btn-primary">Guia de Encaminhamento</a>';
      navLinks.appendChild(ctaBtn);
    }

    // Close menu when clicking on a direct link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
}
