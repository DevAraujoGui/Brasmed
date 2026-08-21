// Redes Credenciadas page logic - Modern Dynamic Explorer
const networkData = [
  { state: "Acre", uf: "AC", region: "Norte", cities: ["Rio Branco"] },
  { state: "Amapá", uf: "AP", region: "Norte", cities: ["Macapá"] },
  { state: "Amazonas", uf: "AM", region: "Norte", cities: ["Manaus"] },
  { state: "Bahia", uf: "BA", region: "Nordeste", cities: ["Barreiras", "Camaçari", "Ilhéus", "Lauro de Freitas", "Porto Seguro", "Salvador"] },
  { state: "Ceará", uf: "CE", region: "Nordeste", cities: ["Caucaia", "Fortaleza", "Paracuru", "Russas", "Sobral", "São Gonçalo do Amarante"] },
  { state: "Distrito Federal", uf: "DF", region: "Centro-Oeste", cities: ["Brasília", "Taguatinga"] },
  { state: "Espírito Santo", uf: "ES", region: "Sudeste", cities: ["Viana", "Vila Velha"] },
  { state: "Goiás", uf: "GO", region: "Centro-Oeste", cities: ["Aparecida de Goiânia", "Caldas Novas", "Anápolis", "Goiânia", "Valparaíso de Goiás", "Rio Verde"] },
  { state: "Maranhão", uf: "MA", region: "Nordeste", cities: ["Lago da Pedra", "Grajaú"] },
  { state: "Mato Grosso", uf: "MT", region: "Centro-Oeste", cities: ["Campo Verde", "Cuiabá", "Lucas do Rio Verde", "Rio Verde", "Rondonópolis"] },
  { state: "Mato Grosso do Sul", uf: "MS", region: "Centro-Oeste", cities: ["Campo Grande", "Dourados"] },
  { state: "Minas Gerais", uf: "MG", region: "Sudeste", cities: ["Alfenas", "Belo Horizonte", "Capelinha", "Caratinga", "Campo Belo", "Conceição do Mato Dentro", "Contagem", "Coronel Fabriciano", "Curvelo", "Extrema", "Formiga", "Governador Valadares", "Itabira", "Ipatinga", "Itajubá", "Itaúna", "Ituiutaba", "Januária", "Janaúba", "Leopoldina", "Monte Carmelo", "Muriaé", "Paraopeba", "Patos de Minas", "Patrocínio", "Poços de Caldas", "Santa Bárbara", "São João Del Rei", "Teófilo Otoni", "Timóteo", "Três Pontas", "Uberlândia", "Uberaba", "Varginha", "Juiz de Fora"] },
  { state: "Pará", uf: "PA", region: "Norte", cities: ["Ananindeua", "Barcarena", "Belém", "Castanhal", "Marabá", "Parauapebas"] },
  { state: "Paraíba", uf: "PB", region: "Nordeste", cities: ["Campina Grande", "João Pessoa"] },
  { state: "Paraná", uf: "PR", region: "Sul", cities: ["Almirante Tamandaré", "Cascavel", "Capanema", "Curitiba", "Fazenda Rio Grande", "Foz do Iguaçu", "Guarapuava", "Ibiporã", "Londrina", "Maringá", "Ponta Grossa", "Telêmaco Borba", "Toledo"] },
  { state: "Pernambuco", uf: "PE", region: "Nordeste", cities: ["Caruaru", "Cabo de Santo Agostinho", "Goiana", "Olinda", "Paulista", "Petrolina", "Recife"] },
  { state: "Piauí", uf: "PI", region: "Nordeste", cities: ["Teresina", "Picos"] },
  { state: "Rio de Janeiro", uf: "RJ", region: "Sudeste", cities: ["Angra dos Reis", "Barra da Tijuca", "Barra Mansa", "Bonsucesso", "Belford Roxo", "Cabo Frio", "Campos dos Goytacazes", "Macaé", "Maricá", "Nova Iguaçu", "Rio das Ostras", "Rio de Janeiro", "Petrópolis", "Recreio dos Bandeirantes", "Resende", "Rio Bonito", "São Gonçalo", "Teresópolis", "Três Rios", "Volta Redonda"] },
  { state: "Rio Grande do Norte", uf: "RN", region: "Nordeste", cities: ["Mossoró", "Pau dos Ferros"] },
  { state: "Rio Grande do Sul", uf: "RS", region: "Sul", cities: ["Alvorada", "Cachoeirinha", "Canoas", "Caxias do Sul", "Ijuí", "Leopoldo", "Marau", "Passo Fundo", "Pelotas", "Porto Alegre", "Ribeirão das Neves", "Rio Grande", "Santa Cruz do Sul", "Santa Maria"] },
  { state: "Rondônia", uf: "RO", region: "Norte", cities: ["Ji-Paraná", "Vilhena"] },
  { state: "Roraima", uf: "RR", region: "Norte", cities: ["Boa Vista"] },
  { state: "Santa Catarina", uf: "SC", region: "Sul", cities: ["Barra Velha", "Balneário de Camboriú", "Blumenau", "Brusque", "Florianópolis", "Itajaí", "Joinville", "Porto Belo", "São Bento", "São José"] },
  { state: "Sergipe", uf: "SE", region: "Nordeste", cities: ["Aracaju"] },
  { state: "São Paulo (Capital)", uf: "SP-CAP", region: "Sudeste", cities: ["Alphaville", "Canindé", "Centro", "Cidade Dutra", "Ipiranga", "Lapa", "Mooca", "Paraíso", "República", "São Miguel", "Santana", "Tatuapé", "Vila Clementina", "Vila Clementino", "Vila Maria", "Vila Prudente", "Vila Maracanã"] },
  { state: "São Paulo (Interior/Litoral)", uf: "SP", region: "Sudeste", cities: ["Americana", "Amparo", "Andradina", "Araçatuba", "Arujá", "Araras", "Araraquara", "Assis", "Atibaia", "Barretos", "Barueri", "Bastos", "Batatais", "Boituva", "Bauru", "Bragança Paulista", "Cajamar", "Cajati", "Campinas", "Carapicuíba", "Caraguatatuba", "Catanduva", "Cotia", "Embu das Artes", "Franco da Rocha", "Guaratinguetá", "Guarujá", "Guarulhos", "Hortolândia", "Indaiatuba", "Itapetininga", "Itapevi", "Itapeva", "Itaquaquecetuba", "Itatiba", "Itu", "Jaboticabal", "Jacareí", "Jaguariúna", "Jales", "Jandira", "Jundiaí", "Lençóis Paulista", "Limeira", "Lorena", "Marília", "Matão", "Mauá", "Mogi das Cruzes", "Mogi Mirim", "Mogi-Guaçu", "Olímpia", "Osasco", "Pariquera-Açu", "Paulínia", "Pindamonhangaba", "Piracicaba", "Pedreira", "Presidente Prudente", "Registro", "Rio Claro", "Ribeirão Pires", "Ribeirão Preto", "Salto", "Santa Bárbara D'Oeste", "Santa Cruz", "Santana", "Santana do Parnaíba", "Santo Amaro", "Santo André", "Santo Antônio de Posse", "Santos", "São Bernardo do Campo", "São Carlos", "São Jose do Rio Preto", "São José dos Campos", "São Paulo", "São Pedro", "São Roque", "São Sebastião", "Socorro", "Sorocaba", "Sumaré", "Suzano", "Taboão da Serra", "Tatuí", "Taubaté", "Tupã", "Vinhedo", "Votuporanga"] },
  { state: "Tocantins", uf: "TO", region: "Norte", cities: ["Araguaína", "Porto Nacional"] }
];

export function initRede() {
  const searchInput = document.getElementById("searchNetwork");
  const stateListContainer = document.getElementById("statePillList");
  const resultsContainer = document.getElementById("networkResults");
  const regionTabs = document.querySelectorAll(".region-tab-btn");
  const totalCitiesBadge = document.getElementById("totalCitiesCount");
  const totalStatesBadge = document.getElementById("totalStatesCount");

  if (!resultsContainer) return;

  let activeRegionFilter = "TODAS";
  let activeStateFilter = "TODOS";
  let searchWord = "";

  // Calculate total counts
  const totalCities = networkData.reduce((acc, curr) => acc + curr.cities.length, 0);
  if (totalCitiesBadge) totalCitiesBadge.textContent = totalCities + "+ Cidades";
  if (totalStatesBadge) totalStatesBadge.textContent = "25+ Estados e DF";

  function normalizeStr(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  // Render Region Tabs Interaction
  if (regionTabs.length) {
    regionTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        regionTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeRegionFilter = tab.getAttribute("data-region");
        activeStateFilter = "TODOS";
        renderPills();
        renderResults();
      });
    });
  }

  // Render filter pills
  function renderPills() {
    if (!stateListContainer) return;
    stateListContainer.innerHTML = "";

    const filteredData = activeRegionFilter === "TODAS" 
      ? networkData 
      : networkData.filter(item => item.region === activeRegionFilter);

    const allPill = document.createElement("button");
    allPill.className = `state-pill ${activeStateFilter === "TODOS" ? "active" : ""}`;
    allPill.textContent = "Todos";
    allPill.addEventListener("click", () => {
      activeStateFilter = "TODOS";
      renderResults();
      renderPills();
    });
    stateListContainer.appendChild(allPill);

    filteredData.forEach(item => {
      const pill = document.createElement("button");
      pill.className = `state-pill ${activeStateFilter === item.uf ? "active" : ""}`;
      pill.textContent = item.uf;
      pill.title = `${item.state} (${item.cities.length} cidades)`;
      pill.addEventListener("click", () => {
        activeStateFilter = item.uf;
        renderResults();
        renderPills();
      });
      stateListContainer.appendChild(pill);
    });
  }

  // Render cards based on criteria with Accordion Drawer Mode
  function renderResults() {
    resultsContainer.innerHTML = "";
    const normalizedQuery = normalizeStr(searchWord);

    const filtered = networkData.filter(item => {
      if (activeRegionFilter !== "TODAS" && item.region !== activeRegionFilter) return false;
      if (activeStateFilter !== "TODOS" && item.uf !== activeStateFilter) return false;
      if (!normalizedQuery) return true;

      const matchesState = normalizeStr(item.state).includes(normalizedQuery) || normalizeStr(item.uf).includes(normalizedQuery);
      const matchesCity = item.cities.some(city => normalizeStr(city).includes(normalizedQuery));
      return matchesState || matchesCity;
    });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="no-results">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <h3>Nenhuma unidade encontrada</h3>
          <p>Não encontramos clínicas credenciadas para o termo "<strong>${searchWord}</strong>".</p>
          <button type="button" class="btn btn-outline" id="clearSearchBtn" style="margin-top: 16px;">Limpar Busca</button>
        </div>
      `;
      const clearBtn = document.getElementById("clearSearchBtn");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          if (searchInput) searchInput.value = "";
          searchWord = "";
          activeStateFilter = "TODOS";
          activeRegionFilter = "TODAS";
          if (regionTabs.length) {
            regionTabs.forEach(t => t.classList.remove("active"));
            regionTabs[0].classList.add("active");
          }
          renderPills();
          renderResults();
        });
      }
      return;
    }

    // Determine limit dynamically based on viewport (3 for mobile <= 640px, 5 for desktop)
    const isMobile = window.innerWidth <= 640;
    const maxInitialCities = isMobile ? 3 : 5;

    filtered.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "state-group-card";

      // Filter visible cities if query is active
      const matchingCities = normalizedQuery 
        ? item.cities.filter(c => normalizeStr(c).includes(normalizedQuery))
        : item.cities;

      const hasMoreCities = matchingCities.length > maxInitialCities && !normalizedQuery;
      const initialDisplayCount = hasMoreCities ? maxInitialCities : matchingCities.length;

      card.innerHTML = `
        <div class="state-group-header">
          <div class="state-title-wrap">
            <span class="state-badge">${item.uf}</span>
            <h3>${item.state}</h3>
            <span class="region-badge">${item.region}</span>
          </div>
          <span class="city-count">${matchingCities.length} ${matchingCities.length === 1 ? 'cidade atendida' : 'cidades atendidas'}</span>
        </div>

        <div class="city-chips-container" id="cityContainer-${index}">
          ${matchingCities.slice(0, initialDisplayCount).map(city => `
            <div class="city-chip">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${city}</span>
            </div>
          `).join('')}
        </div>

        ${hasMoreCities ? `
          <div class="state-card-footer">
            <button type="button" class="btn-toggle-cities" data-expanded="false" data-target="cityContainer-${index}" data-state-index="${index}">
              <span>Ver todas as ${item.cities.length} cidades (+${item.cities.length - maxInitialCities})</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
        ` : ''}
      `;

      resultsContainer.appendChild(card);
    });

    // Attach toggle listeners for expand/collapse
    document.querySelectorAll(".btn-toggle-cities").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const stateIdx = parseInt(btn.getAttribute("data-state-index"));
        const container = document.getElementById(targetId);
        const isExpanded = btn.getAttribute("data-expanded") === "true";
        const stateData = filtered[stateIdx];
        const currentMobile = window.innerWidth <= 640;
        const currentLimit = currentMobile ? 3 : 5;

        if (isExpanded) {
          // Collapse back to 5 (desktop) or 3 (mobile)
          container.innerHTML = stateData.cities.slice(0, currentLimit).map(city => `
            <div class="city-chip">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${city}</span>
            </div>
          `).join('');
          btn.setAttribute("data-expanded", "false");
          btn.innerHTML = `<span>Ver todas as ${stateData.cities.length} cidades (+${stateData.cities.length - currentLimit})</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`;
        } else {
          // Expand all
          container.innerHTML = stateData.cities.map(city => `
            <div class="city-chip">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${city}</span>
            </div>
          `).join('');
          btn.setAttribute("data-expanded", "true");
          btn.innerHTML = `<span>Recolher lista</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: rotate(180deg);"><polyline points="6 9 12 15 18 9"/></svg>`;
        }
      });
    });

    // Map pin synchronization
    syncMapPins(filtered);
  }

  function syncMapPins(filteredList) {
    const activeUFs = new Set(filteredList.map(item => item.uf.replace('-CAP', '')));
    document.querySelectorAll(".map-pin").forEach(pin => {
      const uf = pin.getAttribute("data-uf");
      if (activeUFs.has(uf) || activeStateFilter === "TODOS" && activeRegionFilter === "TODAS") {
        pin.style.opacity = "1";
        pin.style.pointerEvents = "auto";
      } else {
        pin.style.opacity = "0.2";
        pin.style.pointerEvents = "none";
      }
    });
  }

  // Interactive Map Pins Clicking & Tooltip
  const tooltip = document.getElementById("mapTooltip");
  document.querySelectorAll(".map-pin").forEach(pin => {
    const uf = pin.getAttribute("data-uf");
    const stateName = pin.getAttribute("data-state");

    pin.addEventListener("mouseenter", (e) => {
      if (tooltip) {
        tooltip.textContent = `${stateName} (${uf})`;
        tooltip.classList.add("visible");
        const rect = pin.getBoundingClientRect();
        const parentRect = pin.closest(".map-container").getBoundingClientRect();
        tooltip.style.left = `${rect.left - parentRect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - parentRect.top}px`;
      }
    });

    pin.addEventListener("mouseleave", () => {
      if (tooltip) tooltip.classList.remove("visible");
    });

    pin.addEventListener("click", () => {
      activeStateFilter = uf;
      renderPills();
      renderResults();

      // Scroll to results smoothly
      const dashboard = document.querySelector(".dashboard-container");
      if (dashboard) {
        dashboard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Search input with debounce
  if (searchInput) {
    let timeout = null;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        searchWord = e.target.value.trim();
        renderResults();
      }, 150);
    });
  }

  // Initial render
  renderPills();
  renderResults();
}
