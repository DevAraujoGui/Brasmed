// Floating WhatsApp Button Component
export function initWhatsAppFloat() {
  if (document.querySelector('.whatsapp-float-container')) return;

  const floatBtn = document.createElement('a');
  floatBtn.href = 'https://wa.me/551149635529?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.';
  floatBtn.target = '_blank';
  floatBtn.rel = 'noopener noreferrer';
  floatBtn.className = 'whatsapp-float-container';
  floatBtn.setAttribute('aria-label', 'Atendimento via WhatsApp');

  floatBtn.innerHTML = `
    <span class="whatsapp-float-label">Fale no WhatsApp</span>
    <div class="whatsapp-float-btn">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.7 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.2-3.5-.8-3-1.2-4.9-4.2-5.1-4.4-.1-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.1.3-.3.5l-.4.5c-.1.2-.3.3-.1.6.2.3.9 1.5 1.9 2.4 1.3 1.2 2.4 1.5 2.7 1.7.3.2.5.1.6-.1l.7-.8c.2-.3.4-.2.7-.1l1.7.8c.2.1.4.2.5.3.1.2.1 1-.1 1.7z"/>
      </svg>
    </div>
  `;

  document.body.appendChild(floatBtn);
}
