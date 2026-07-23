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

  // ---- Mobile burger (simple toggle of nav-links visibility) ----
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const showing = navLinks.style.display === 'flex';
      navLinks.style.cssText = showing
        ? ''
        : 'display:flex;position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;background:rgba(15,23,42,.97);padding:12px 6vw 20px;gap:2px;';
    });
  }
}
