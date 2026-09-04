import { submitContactForm } from '../api.js';
export function initHome() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsWrap = document.getElementById('heroDots');
  if (slides.length > 0 && dotsWrap) {
    let current = 0;
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = document.querySelectorAll('.hero-dot');
    function goTo(i){
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }
    const nextSlide = document.getElementById('nextSlide');
    const prevSlide = document.getElementById('prevSlide');
    if (nextSlide) nextSlide.addEventListener('click', () => goTo(current + 1));
    if (prevSlide) prevSlide.addEventListener('click', () => goTo(current - 1));
    let autoplay = setInterval(() => goTo(current + 1), 6500);
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => clearInterval(autoplay));
      heroSection.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => goTo(current + 1), 6500);
      });
    }
  }
  const wpp = document.getElementById('whatsapp');
  if (wpp) {
    wpp.addEventListener('input', () => {
      let v = wpp.value.replace(/\D/g,'').slice(0,11);
      if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      else if (v.length > 0) v = `(${v}`;
      wpp.value = v;
    });
  }
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitContactForm(contactForm, { origem: 'Página Inicial (Home)' });
    });
  }
}
