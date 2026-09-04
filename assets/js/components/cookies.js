const STORAGE_KEYS = {
  CONSENT: 'brasmed_lgpd_consent',
  TIMESTAMP: 'brasmed_consent_timestamp',
  SESSION: 'brasmed_session_active',
  ANALYTICS: 'brasmed_analytics_enabled',
  MARKETING: 'brasmed_marketing_enabled'
};
function purgeLegacyCookies() {
  const legacyCookies = [
    'brasmed_session_active',
    'brasmed_analytics_enabled',
    'brasmed_marketing_enabled',
    'brasmed_lgpd_consent',
    'brasmed_consent_timestamp'
  ];
  legacyCookies.forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}; SameSite=Strict;`;
  });
}
export function initCookieConsent() {
  purgeLegacyCookies();
  const currentConsent = localStorage.getItem(STORAGE_KEYS.CONSENT);
  if (currentConsent) {
    applyConsentPreferences(currentConsent);
    return;
  }
  if (document.querySelector('.cookie-banner')) return;
  const overlay = document.createElement('div');
  overlay.className = 'cookie-overlay';
  document.body.appendChild(overlay);
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-modal', 'true');
  banner.setAttribute('aria-label', 'Controle de Cookies e Privacidade');
  banner.innerHTML = `
    <button type="button" class="cookie-close-btn" id="cookieExitSite" title="Não aceitar e sair do site" aria-label="Fechar e sair do site">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <div class="cookie-header">
      <div class="cookie-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
          <circle cx="7.5" cy="15.5" r="1.5" fill="currentColor"/>
          <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"/>
        </svg>
      </div>
      <h4>Controle de Privacidade & Cookies</h4>
    </div>
    <p class="cookie-text">
      Utilizamos tecnologias seguras para assegurar o funcionamento deste site, analisar o tráfego e personalizar conteúdos de acordo com a LGPD (Lei nº 13.709/2018). Para navegar, selecione uma opção de consentimento ou feche para sair. Saiba mais em nossa <a href="/politica-de-privacidade/">Política de Privacidade</a>.
    </p>
    <div class="cookie-actions">
      <button type="button" class="cookie-btn cookie-btn-primary" id="cookieAcceptAll">
        Permitir Todos
      </button>
      <button type="button" class="cookie-btn cookie-btn-secondary" id="cookieAcceptNecessary">
        Apenas Necessários
      </button>
    </div>
  `;
  document.body.appendChild(banner);
  setTimeout(() => {
    overlay.classList.add('show');
    banner.classList.add('show');
  }, 350);
  const acceptAllBtn = banner.querySelector('#cookieAcceptAll');
  const acceptNecBtn = banner.querySelector('#cookieAcceptNecessary');
  const exitSiteBtn = banner.querySelector('#cookieExitSite');
  function saveConsentAndUnlock(consentType) {
    localStorage.setItem(STORAGE_KEYS.CONSENT, consentType);
    localStorage.setItem(STORAGE_KEYS.TIMESTAMP, new Date().toISOString());
    applyConsentPreferences(consentType);
    banner.classList.remove('show');
    overlay.classList.remove('show');
    setTimeout(() => {
      banner.remove();
      overlay.remove();
    }, 350);
  }
  if (exitSiteBtn) {
    exitSiteBtn.addEventListener('click', () => {
      if (window.history.length > 1 && document.referrer && !document.referrer.includes(window.location.host)) {
        window.history.back();
      } else {
        window.location.href = 'https://www.google.com.br';
      }
    });
  }
  if (acceptAllBtn) {
    acceptAllBtn.addEventListener('click', () => saveConsentAndUnlock('all'));
  }
  if (acceptNecBtn) {
    acceptNecBtn.addEventListener('click', () => saveConsentAndUnlock('necessary'));
  }
}
function applyConsentPreferences(consentType) {
  localStorage.setItem(STORAGE_KEYS.SESSION, '1');
  if (consentType === 'all') {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, 'true');
    localStorage.setItem(STORAGE_KEYS.MARKETING, 'true');
    window.dispatchEvent(new CustomEvent('brasmed_consent_updated', {
      detail: { analytics: true, marketing: true, necessary: true }
    }));
  } else {
    localStorage.removeItem(STORAGE_KEYS.ANALYTICS);
    localStorage.removeItem(STORAGE_KEYS.MARKETING);
    window.dispatchEvent(new CustomEvent('brasmed_consent_updated', {
      detail: { analytics: false, marketing: false, necessary: true }
    }));
  }
}
window.resetBrasmedCookies = function() {
  purgeLegacyCookies();
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  initCookieConsent();
};
