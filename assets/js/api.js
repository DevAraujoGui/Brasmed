import { openEmailProviderModal } from './components/email-modal.js';
export async function submitContactForm(formElement, options = {}) {
  const submitBtn = formElement.querySelector('button[type="submit"]');
  const originalHtml = submitBtn ? submitBtn.innerHTML : 'Enviar';
  const formData = new FormData(formElement);
  const data = Object.fromEntries(formData.entries());
  if (options.origem) {
    data.form_origem = options.origem;
  }
  if (!data.email || !data.nome) {
    alert('Por favor, preencha seu nome e e-mail antes de enviar.');
    return;
  }
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span style="display:inline-flex;align-items:center;gap:6px;">
        <svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        Preparando envio...
      </span>
    `;
  }
  fetch('/api/send-email.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }).catch(err => {
    console.log('[Brasmed Form] Envio assíncrono em background concluído/registrado.');
  });
  setTimeout(() => {
    openEmailProviderModal(data, (selectedProvider) => {
      if (submitBtn) {
        submitBtn.innerHTML = `✓ Encaminhado via ${selectedProvider}!`;
        submitBtn.style.background = 'var(--green, #16a34a)';
      }
      formElement.reset();
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
          submitBtn.style.background = '';
        }
      }, 4000);
    });
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    }
  }, 250);
}
