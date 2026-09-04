import { initNavbar } from './components/navbar.js';
import { initWhatsAppFloat } from './components/whatsapp.js';
import { initCookieConsent } from './components/cookies.js';
import { initHome } from './pages/home.js';
import { initRede } from './pages/rede-credenciada.js';
import { initEsocial } from './pages/esocial.js';
import { initNrs } from './pages/nrs.js';
import { submitContactForm } from './api.js';
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWhatsAppFloat();
  initCookieConsent();
  initHome();
  initRede();
  initEsocial();
  initNrs();
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pageTitle = document.title || window.location.pathname;
      submitContactForm(quoteForm, { origem: `Página ${pageTitle}` });
    });
  }
});
