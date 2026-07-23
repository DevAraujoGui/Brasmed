// Redes Credenciadas page logic

const networkData = [
  { state: "Acre", uf: "AC", cities: ["Rio Branco"] },
  { state: "Amapá", uf: "AP", cities: ["Macapá"] },
  { state: "Amazonas", uf: "AM", cities: ["Manaus"] },
  { state: "Bahia", uf: "BA", cities: ["Barreiras", "Camaçari", "Ilhéus", "Lauro de Freitas", "Porto Seguro", "Salvador"] },
  { state: "Ceará", uf: "CE", cities: ["Caucaia", "Fortaleza", "Paracuru", "Russas", "Sobral", "São Gonçalo do Amarante"] },
  { state: "Distrito Federal", uf: "DF", cities: ["Brasília", "Taguatinga"] },
  { state: "Espírito Santo", uf: "ES", cities: ["Viana", "Vila Velha"] },
  { state: "Goiás", uf: "GO", cities: ["Aparecida de Goiânia", "Caldas Novas", "Anápolis", "Goiânia", "Valparaíso de Goiás", "Rio Verde"] },
  { state: "Maranhão", uf: "MA", cities: ["Lago da Pedra", "Grajaú"] },
  { state: "Mato Grosso", uf: "MT", cities: ["Campo Verde", "Cuiabá", "Lucas do Rio Verde", "Rio Verde", "Rondonópolis"] },
  { state: "Mato Grosso do Sul", uf: "MS", cities: ["Campo Grande", "Dourados"] },
  { state: "Minas Gerais", uf: "MG", cities: ["Alfenas", "Belo Horizonte", "Capelinha", "Caratinga", "Campo Belo", "Conceição do Mato Dentro", "Contagem", "Coronel Fabriciano", "Curvelo", "Extrema", "Formiga", "Governador Valadares", "Itabira", "Ipatinga", "Itajubá", "Itaúna", "Ituiutaba", "Januária", "Janaúba", "Leopoldina", "Monte Carmelo", "Muriaé", "Paraopeba", "Patos de Minas", "Patrocínio", "Poços de Caldas", "Santa Bárbara", "São João Del Rei", "Teófilo Otoni", "Timóteo", "Três Pontas", "Uberlândia", "Uberaba", "Varginha", "Juiz de Fora"] },
  { state: "Pará", uf: "PA", cities: ["Ananindeua", "Barcarena", "Belém", "Castanhal", "Marabá", "Parauapebas"] },
  { state: "Paraíba", uf: "PB", cities: ["Campina Grande", "João Pessoa"] },
  { state: "Paraná", uf: "PR", cities: ["Almirante Tamandaré", "Cascavel", "Capanema", "Curitiba", "Fazenda Rio Grande", "Foz do Iguaçu", "Guarapuava", "Ibiporã", "Londrina", "Maringá", "Ponta Grossa", "Telêmaco Borba", "Toledo"] },
  { state: "Pernambuco", uf: "PE", cities: ["Caruaru", "Cabo de Santo Agostinho", "Goiana", "Olinda", "Paulista", "Petrolina", "Recife"] },
  { state: "Piauí", uf: "PI", cities: ["Teresina", "Picos"] },
  { state: "Rio de Janeiro", uf: "RJ", cities: ["Angra dos Reis", "Barra da Tijuca", "Barra Mansa", "Bonsucesso", "Belford Roxo", "Cabo Frio", "Campos dos Goytacazes", "Macaé", "Maricá", "Nova Iguaçu", "Rio das Ostras", "Rio de Janeiro", "Petrópolis", "Recreio dos Bandeirantes", "Resende", "Rio Bonito", "São Gonçalo", "Teresópolis", "Três Rios", "Volta Redonda"] },
  { state: "Rio Grande do Norte", uf: "RN", cities: ["Mossoró", "Pau dos Ferros"] },
  { state: "Rio Grande do Sul", uf: "RS", cities: ["Alvorada", "Cachoeirinha", "Canoas", "Caxias do Sul", "Ijuí", "Leopoldo", "Marau", "Passo Fundo", "Pelotas", "Porto Alegre", "Ribeirão das Neves", "Rio Grande", "Santa Cruz do Sul", "Santa Maria"] },
  { state: "Rondônia", uf: "RO", cities: ["Ji-Paraná", "Vilhena"] },
  { state: "Roraima", uf: "RR", cities: ["Boa Vista"] },
  { state: "Santa Catarina", uf: "SC", cities: ["Barra Velha", "Balneário de Camboriú", "Blumenau", "Brusque", "Florianópolis", "Itajaí", "Joinville", "Porto Belo", "São Bento", "São José"] },
  { state: "Sergipe", uf: "SE", cities: ["Aracaju"] },
  { state: "São Paulo (Capital)", uf: "SP-CAP", cities: ["Alphaville", "Canindé", "Centro", "Cidade Dutra", "Ipiranga", "Lapa", "Mooca", "Paraíso", "República", "São Miguel", "Santana", "Tatuapé", "Vila Clementina", "Vila Clementino", "Vila Maria", "Vila Prudente", "Vila Maracanã"] },
  { state: "São Paulo (Interior/Litoral)", uf: "SP", cities: ["Americana", "Amparo", "Andradina", "Araçatuba", "Arujá", "Araras", "Araraquara", "Assis", "Atibaia", "Barretos", "Barueri", "Bastos", "Batatais", "Boituva", "Bauru", "Bragança Paulista", "Cajamar", "Cajati", "Campinas", "Carapicuíba", "Caraguatatuba", "Catanduva", "Cotia", "Embu das Artes", "Franco da Rocha", "Guaratinguetá", "Guarujá", "Guarulhos", "Hortolândia", "Indaiatuba", "Itapetininga", "Itapevi", "Itapeva", "Itaquaquecetuba", "Itatiba", "Itu", "Jaboticabal", "Jacareí", "Jaguariúna", "Jales", "Jandira", "Jundiaí", "Lençóis Paulista", "Limeira", "Lorena", "Marília", "Matão", "Mauá", "Mogi das Cruzes", "Mogi Mirim", "Mogi-Guaçu", "Olímpia", "Osasco", "Pariquera-Açu", "Paulínia", "Pindamonhangaba", "Piracicaba", "Pedreira", "Presidente Prudente", "Registro", "Rio Claro", "Ribeirão Pires", "Ribeirão Preto", "Salto", "Santa Bárbara D'Oeste", "Santa Cruz", "Santana", "Santana do Parnaíba", "Santo Amaro", "Santo André", "Santo Antônio de Posse", "Santos", "São Bernardo do Campo", "São Carlos", "São Jose do Rio Preto", "São José dos Campos", "São Paulo", "São Pedro", "São Roque", "São Sebastião", "Socorro", "Sorocaba", "Sumaré", "Suzano", "Taboão da Serra", "Tatuí", "Taubaté", "Tupã", "Vinhedo", "Votuporanga"] },
  { state: "Tocantins", uf: "TO", cities: ["Araguaína", "Porto Nacional"] }
];

export function initRede() {
  const searchInput = document.getElementById("searchNetwork");
  const stateListContainer = document.getElementById("statePillList");
  const resultsContainer = document.getElementById("networkResults");

  if (!resultsContainer) return;

  let activeStateFilter = "TODOS";
  let searchWord = "";

  // Helper to normalize string for comparison (accents, lowercase)
  function normalizeStr(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  // Render filter pills
  function renderPills() {
    if (!stateListContainer) return;
    stateListContainer.innerHTML = "";

    const allPill = document.createElement("button");
    allPill.className = `state-pill ${activeStateFilter === "TODOS" ? "active" : ""}`;
    allPill.textContent = "Todos os Estados";
    allPill.addEventListener("click", () => {
      activeStateFilter = "TODOS";
      renderResults();
      renderPills();
    });
    stateListContainer.appendChild(allPill);

    networkData.forEach(item => {
      const pill = document.createElement("button");
      pill.className = `state-pill ${activeStateFilter === item.uf ? "active" : ""}`;
      pill.textContent = item.uf;
      pill.title = item.state;
      pill.addEventListener("click", () => {
        activeStateFilter = item.uf;
        renderResults();
        renderPills();
      });
      stateListContainer.appendChild(pill);
    });
  }

  // Render cards based on criteria
  function renderResults() {
    resultsContainer.innerHTML = "";

    const normalizedQuery = normalizeStr(searchWord);

    // Filter matching data
    const filtered = networkData.map(item => {
      // 1. Filter by Active State if applicable
      if (activeStateFilter !== "TODOS" && item.uf !== activeStateFilter) {
        return null;
      }

      // 2. Filter cities by search term
      const matchingCities = item.cities.filter(city => 
        normalizeStr(city).includes(normalizedQuery) || normalizeStr(item.state).includes(normalizedQuery)
      );

      if (normalizedQuery && matchingCities.length === 0) {
        return null; // Search term did not match state name nor any city
      }

      return {
        ...item,
        citiesToDisplay: matchingCities
      };
    }).filter(Boolean);

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="no-results">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
          <p>Nenhuma unidade credenciada encontrada para a busca realizada.</p>
        </div>
      `;
      return;
    }

    // Build the DOM cards
    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "state-group-card";

      const header = document.createElement("div");
      header.className = "state-group-header";
      header.innerHTML = `
        <h2>${item.state} <span class="state-badge">${item.uf}</span></h2>
        <span class="city-count">${item.citiesToDisplay.length} ${item.citiesToDisplay.length === 1 ? "cidade atendida" : "cidades atendidas"}</span>
      `;
      card.appendChild(header);

      const grid = document.createElement("div");
      grid.className = "city-grid";

      item.citiesToDisplay.forEach(city => {
        const itemEl = document.createElement("div");
        itemEl.className = "city-item";
        itemEl.textContent = city;
        grid.appendChild(itemEl);
      });

      card.appendChild(grid);
      resultsContainer.appendChild(card);
    });

    // Update map pins highlight state
    updateMapHighlight();
  }

  // Update visual state of map pins
  function updateMapHighlight() {
    document.querySelectorAll('.map-pin').forEach(pin => {
      const uf = pin.getAttribute('data-uf');
      if (activeStateFilter === uf) {
        pin.classList.add('active');
      } else {
        pin.classList.remove('active');
      }
    });
  }

  // Bind map pins events
  const mapPins = document.querySelectorAll('.map-pin');
  const tooltip = document.getElementById('mapTooltip');
  const mapContainer = document.querySelector('.map-container');

  if (mapPins.length > 0) {
    mapPins.forEach(pin => {
      const uf = pin.getAttribute('data-uf');
      const stateName = pin.getAttribute('data-state');
      
      // Calculate total cities
      const stateObj = networkData.find(item => item.uf === uf);
      const cityCount = stateObj ? stateObj.cities.length : 0;
      const countLabel = `${cityCount} ${cityCount === 1 ? 'cidade' : 'cidades'}`;

      pin.addEventListener('click', () => {
        if (activeStateFilter === uf) {
          activeStateFilter = "TODOS";
        } else {
          activeStateFilter = uf;
        }
        renderResults();
        renderPills();
      });

      pin.addEventListener('mouseenter', () => {
        if (!tooltip) return;
        tooltip.textContent = `${stateName} (${countLabel})`;
        tooltip.classList.add('visible');
      });

      pin.addEventListener('mousemove', (e) => {
        if (!tooltip || !mapContainer) return;
        const rect = mapContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
      });

      pin.addEventListener('mouseleave', () => {
        if (!tooltip) return;
        tooltip.classList.remove('visible');
      });
    });
  }

  // Bind search box input event
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchWord = e.target.value;
      renderResults();
    });
  }

  // Initial render
  renderPills();
  renderResults();
}
