/**
 * Utilitário de Segurança para Formulários Brasmed
 * - Proteção Honeypot contra Bots e Spam Automatizado
 * - Sanitização de Entradas (Prevenção contra XSS / Injeção)
 * - Rate Limiting no Front-end (Prevenção contra envio repetido em massa)
 */

// Sanitização básica contra injeção de HTML / Script
export function sanitizeInput(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Inicializa a proteção em todos os formulários da página
export function initSecurityFormProtection() {
  const forms = document.querySelectorAll('form');
  if (!forms.length) return;

  forms.forEach(form => {
    // 1. Injeta campo Honeypot se ainda não existir
    if (!form.querySelector('.form-honeypot')) {
      const honeypotWrapper = document.createElement('div');
      honeypotWrapper.className = 'form-honeypot';
      honeypotWrapper.setAttribute('aria-hidden', 'true');
      honeypotWrapper.innerHTML = `
        <label for="form_hp_check">Deixe este campo em branco</label>
        <input type="text" name="b_website_security_hp" id="form_hp_check" tabindex="-1" autocomplete="off" value="">
      `;
      form.prepend(honeypotWrapper);
    }

    // 2. Proteção de Envio (Rate limit + Honeypot Check + Sanitização)
    form.addEventListener('submit', (e) => {
      // Verifica Honeypot (se preenchido, é um bot automático)
      const hpInput = form.querySelector('input[name="b_website_security_hp"]');
      if (hpInput && hpInput.value.trim() !== '') {
        e.preventDefault();
        console.warn('[Segurança Brasmed] Submissão bloqueada: bot detectado via Honeypot.');
        // Simula sucesso para o bot sem processar nada
        showSubmitFeedback(form, 'Mensagem recebida com sucesso!');
        return false;
      }

      // Rate limiting: impede cliques repetidos em menos de 5 segundos
      const formId = form.id || 'default_form';
      const lastSubmitKey = `brasmed_last_submit_${formId}`;
      const lastSubmitTime = localStorage.getItem(lastSubmitKey);
      const now = Date.now();

      if (lastSubmitTime && (now - parseInt(lastSubmitTime, 10)) < 5000) {
        e.preventDefault();
        alert('Por favor, aguarde alguns segundos antes de enviar outra mensagem.');
        return false;
      }

      localStorage.setItem(lastSubmitKey, now.toString());

      // Sanitiza campos de texto antes de prosseguir
      const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
      textInputs.forEach(input => {
        if (input.name !== 'b_website_security_hp') {
          input.value = sanitizeInput(input.value.trim());
        }
      });
    }, true);
  });
}

function showSubmitFeedback(form, message) {
  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;
  const original = btn.textContent;
  btn.textContent = message;
  btn.style.background = 'var(--green-light)';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    form.reset();
  }, 2400);
}
