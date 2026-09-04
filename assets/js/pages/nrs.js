export function initNrs() {
  const searchInput = document.getElementById('nrSearchInput');
  const nrCards = document.querySelectorAll('.nr-card');
  const emptyState = document.getElementById('nrEmptyState');
  if (!searchInput || !nrCards.length) return;
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    let visibleCount = 0;
    nrCards.forEach(card => {
      const nrNum = card.getAttribute('data-nr')?.toLowerCase() || '';
      const text = card.textContent.toLowerCase();
      if (text.includes(term) || nrNum.includes(term)) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
}
