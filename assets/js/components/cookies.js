/**
 * Gerenciador Funcional de Cookies & LGPD da Brasmed
 * Exibe modal com bloqueio de navegação até que o usuário faça uma escolha:
 * - "Permitir Todos" ou "Apenas Necessários" para liberar o site.
 * - Botão [X] (recusa total), que redireciona o usuário para fora do site (ex: Google / histórico anterior).
 */

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name, value, days = 180) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function removeCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}

export function initCookieConsent() {
  const CONSENT_COOKIE_KEY = 'brasmed_lgpd_consent';
  const currentConsent = getCookie(CONSENT_COOKIE_KEY) || localStorage.getItem(CONSENT_COOKIE_KEY);

  // Se o visitante já consentiu previamente, aplica as preferências e não bloqueia a navegação
  if (currentConsent) {
    applyConsentPreferences(currentConsent);
    return;
  }

  // Evita duplicação caso o modal já esteja na DOM
  if (document.querySelector('.cookie-banner')) return;

  // 1. Cria o Backdrop Blur Bloqueador
  const overlay = document.createElement('div');
  overlay.className = 'cookie-overlay';
  document.body.appendChild(overlay);

  // 2. Cria o Card Modal do Cookie
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
      Utilizamos cookies para assegurar o funcionamento deste site, analisar o tráfego e personalizar conteúdos de acordo com a LGPD (Lei nº 13.709/2018). Para navegar, selecione uma opção de consentimento ou feche para sair. Saiba mais em nossa <a href="/politica-de-privacidade/">Política de Privacidade</a>.
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

  // Exibe o modal e overlay bloqueando a navegação
  setTimeout(() => {
    overlay.classList.add('show');
    banner.classList.add('show');
  }, 350);

  // Elementos de interação
  const acceptAllBtn = banner.querySelector('#cookieAcceptAll');
  const acceptNecBtn = banner.querySelector('#cookieAcceptNecessary');
  const exitSiteBtn = banner.querySelector('#cookieExitSite');

  function saveConsentAndUnlock(consentType) {
    setCookie(CONSENT_COOKIE_KEY, consentType, 180);
    localStorage.setItem(CONSENT_COOKIE_KEY, consentType);
    setCookie('brasmed_consent_timestamp', new Date().toISOString(), 180);

    applyConsentPreferences(consentType);

    banner.classList.remove('show');
    overlay.classList.remove('show');
    setTimeout(() => {
      banner.remove();
      overlay.remove();
    }, 350);
  }

  // Se clicar no X: Não concorda -> sai do site
  if (exitSiteBtn) {
    exitSiteBtn.addEventListener('click', () => {
      // Se houver histórico anterior seguro, volta; caso contrário, redireciona para o Google
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
  setCookie('brasmed_session_active', '1', 30);

  if (consentType === 'all') {
    setCookie('brasmed_analytics_enabled', 'true', 180);
    setCookie('brasmed_marketing_enabled', 'true', 180);
    
    window.dispatchEvent(new CustomEvent('brasmed_consent_updated', {
      detail: { analytics: true, marketing: true, necessary: true }
    }));
  } else {
    removeCookie('brasmed_analytics_enabled');
    removeCookie('brasmed_marketing_enabled');
    removeCookie('_ga');
    removeCookie('_gid');
    removeCookie('_gat');

    window.dispatchEvent(new CustomEvent('brasmed_consent_updated', {
      detail: { analytics: false, marketing: false, necessary: true }
    }));
  }
}

window.resetBrasmedCookies = function() {
  document.cookie = 'brasmed_lgpd_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  localStorage.removeItem('brasmed_lgpd_consent');
  localStorage.removeItem('brasmed_cookie_consent');
  initCookieConsent();
};
