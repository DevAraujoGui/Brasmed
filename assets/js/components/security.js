export function sanitizeInput(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function initSecurityFormProtection() {
  const forms = document.querySelectorAll('form');
  if (!forms.length) return;
  forms.forEach(form => {
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
    form.addEventListener('submit', (e) => {
      const hpInput = form.querySelector('input[name="b_website_security_hp"]');
      if (hpInput && hpInput.value.trim() !== '') {
        e.preventDefault();
        console.warn('[Segurança Brasmed] Submissão bloqueada: bot detectado via Honeypot.');
        showSubmitFeedback(form, 'Mensagem recebida com sucesso!');
        return false;
      }
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
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = message;
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = originalText;
    form.reset();
  }, 2500);
}
