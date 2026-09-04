const _ENC_DEST = 'ZGlyZXRvcmlhQGJyYXNtZWRzYXVkZW9jdXBhY2lvbmFsLmNvbS5icg=='; 
export function getProtectedRecipient() {
  try {
    return atob(_ENC_DEST);
  } catch (e) {
    return 'diretoria@brasmedsaudeocupacional.com.br';
  }
}
export function formatEmailContent(formData) {
  const nome = formData.nome || formData.name || 'Cliente';
  const empresa = formData.empresa || formData.company || 'Não informada';
  const email = formData.email || 'Não informado';
  const whatsapp = formData.whatsapp || formData.telefone || 'Não informado';
  const assunto = formData.assunto || formData.exame || 'Contato pelo Site Brasmed';
  const mensagem = formData.mensagem || formData.message || 'Gostaria de solicitar informações/orçamento.';
  const origem = formData.form_origem || 'Website Brasmed';
  const subject = `[Brasmed] Contato de ${nome} - ${assunto}`;
  const body = 
`Olá, equipe Brasmed!
Gostaria de solicitar informações com os seguintes dados:
--------------------------------------------------
DADOS DO CONTATO
--------------------------------------------------
Nome: ${nome}
Empresa: ${empresa}
E-mail: ${email}
WhatsApp: ${whatsapp}
Assunto / Exame: ${assunto}
Origem: ${origem}
--------------------------------------------------
MENSAGEM:
--------------------------------------------------
${mensagem}
--------------------------------------------------
Enviado através do formulário oficial Brasmed.`;
  return { subject, body, nome, empresa, email, whatsapp, assunto };
}
export function openEmailProviderModal(formData, onSuccessCallback) {
  const existingModal = document.getElementById('emailProviderModal');
  if (existingModal) existingModal.remove();
  const recipient = getProtectedRecipient();
  const { subject, body, nome } = formatEmailContent(formData);
  const encodedRecipient = encodeURIComponent(recipient);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const urls = {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedRecipient}&su=${encodedSubject}&body=${encodedBody}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${encodedRecipient}&subject=${encodedSubject}&body=${encodedBody}`,
    yahoo: `https://compose.mail.yahoo.com/?to=${encodedRecipient}&subj=${encodedSubject}&body=${encodedBody}`,
    mailto: `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`
  };
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'emailProviderModal';
  modalOverlay.className = 'email-modal-overlay';
  modalOverlay.setAttribute('role', 'dialog');
  modalOverlay.setAttribute('aria-modal', 'true');
  modalOverlay.setAttribute('aria-label', 'Escolha como enviar seu e-mail');
  modalOverlay.innerHTML = `
    <div class="email-modal-container">
      <div class="email-modal-header">
        <div class="email-modal-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <div class="email-modal-title-group">
          <h3>Como prefere enviar?</h3>
          <p>Sua mensagem está pronta! Escolha seu provedor favorito:</p>
        </div>
        <button type="button" class="email-modal-close" id="closeEmailModal" aria-label="Fechar modal">
          &times;
        </button>
      </div>
      <div class="email-providers-grid">
        <a href="${urls.gmail}" target="_blank" rel="noopener noreferrer" class="provider-card provider-gmail" data-provider="Google Gmail">
          <div class="provider-icon">
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          </div>
          <div class="provider-info">
            <span class="provider-name">Enviar com Google Gmail</span>
            <span class="provider-sub">Abre direto no seu Gmail Web</span>
          </div>
          <span class="provider-arrow">→</span>
        </a>
        <a href="${urls.outlook}" target="_blank" rel="noopener noreferrer" class="provider-card provider-outlook" data-provider="Microsoft Outlook">
          <div class="provider-icon">
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path fill="#0078D4" d="M1 18V6l11-4v20L1 18z"/>
              <path fill="#28A8EA" d="M12 2l11 4v12l-11 4V2z"/>
              <path fill="#0078D4" opacity="0.3" d="M12 2v20l11-4V6L12 2z"/>
              <circle cx="7" cy="12" r="3" fill="#FFFFFF"/>
            </svg>
          </div>
          <div class="provider-info">
            <span class="provider-name">Enviar com Microsoft Outlook</span>
            <span class="provider-sub">Outlook, Hotmail ou Office 365</span>
          </div>
          <span class="provider-arrow">→</span>
        </a>
        <a href="${urls.yahoo}" target="_blank" rel="noopener noreferrer" class="provider-card provider-yahoo" data-provider="Yahoo Mail">
          <div class="provider-icon">
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path fill="#6001D2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 6.2l-2.6 5.8v4.5h-2.4v-4.5L8.2 8.2h2.5l1.5 3.8 1.5-3.8h2.1z"/>
            </svg>
          </div>
          <div class="provider-info">
            <span class="provider-name">Enviar com Yahoo Mail</span>
            <span class="provider-sub">Abre tela de composição Yahoo</span>
          </div>
          <span class="provider-arrow">→</span>
        </a>
        <a href="${urls.mailto}" class="provider-card provider-default" data-provider="App Padrão">
          <div class="provider-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </div>
          <div class="provider-info">
            <span class="provider-name">Aplicativo de E-mail do seu dispositivo</span>
            <span class="provider-sub">Apple Mail, Windows Mail, Thunderbird, etc.</span>
          </div>
          <span class="provider-arrow">→</span>
        </a>
      </div>
      <div class="email-modal-footer">
        <button type="button" class="copy-email-btn" id="copyMessageData">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span id="copyBtnText">Copiar mensagem e e-mail</span>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modalOverlay);
  requestAnimationFrame(() => {
    modalOverlay.classList.add('show');
  });
  function closeModal() {
    modalOverlay.classList.remove('show');
    setTimeout(() => {
      modalOverlay.remove();
    }, 300);
  }
  modalOverlay.querySelector('#closeEmailModal').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });
  const providerCards = modalOverlay.querySelectorAll('.provider-card');
  providerCards.forEach(card => {
    card.addEventListener('click', () => {
      if (typeof onSuccessCallback === 'function') {
        onSuccessCallback(card.dataset.provider);
      }
      setTimeout(closeModal, 800);
    });
  });
  const copyBtn = modalOverlay.querySelector('#copyMessageData');
  const copyBtnText = modalOverlay.querySelector('#copyBtnText');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const fullCopyText = `Para: ${recipient}\nAssunto: ${subject}\n\n${body}`;
      navigator.clipboard.writeText(fullCopyText).then(() => {
        copyBtnText.textContent = 'Copiado para a área de transferência!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtnText.textContent = 'Copiar mensagem e e-mail';
          copyBtn.classList.remove('copied');
        }, 3000);
      }).catch(() => {
        alert('Texto selecionado: copie manualmente.');
      });
    });
  }
}
