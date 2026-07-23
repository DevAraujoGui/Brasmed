# Contexto do Projeto - Brasmed

Este arquivo resume o estado atual, a estrutura de pastas e as diretrizes de design do site institucional da **Brasmed**.

## 📌 Visão Geral
A **Brasmed** é uma empresa de Medicina e Segurança Ocupacional (Saúde do Trabalho) fundada em 2001.
O site foi estruturado de forma clássica, institucional e moderna, focado em alta legibilidade e performance no frontend (HTML5/CSS3/Vanilla JS em módulos).

---

## 🎨 Design System & Identidade Visual
As cores e o estilo do site foram adaptados diretamente com base na identidade visual da logo da empresa:
- **Verde Medicinal (`--green`)**: `#00875A` (Cor institucional principal)
- **Verde Escuro (`--green-dark`)**: `#005F3F` (Hovers e destaque profundo)
- **Verde Claro (`--green-light`)**: `#00A36C` (Ações secundárias)
- **Verde Suave/Tint (`--green-tint`)**: `#F0FDF4` (Fundo sutil de seções alternadas e menus)
- **Texto Escuro (`--navy` / `--navy-2`)**: `#1E293B` / `#0F172A` (Alta legibilidade)
- **Bordas & Cantos**: Visual limpo com cantos corporativos clássicos (`border-radius: 4px` a `6px`).

---

## 📁 Estrutura de Arquivos do Projeto

```
Brasmed/
├── index.html                 # Página inicial (Apresentação / Home)
├── sobre/
│   └── index.html             # Quem Somos / Apresentação
├── rede-credenciada/
│   └── index.html             # Redes Credenciadas
├── guia-encaminhamento/
│   └── index.html             # Guia de Encaminhamento
├── psicossocial/
│   └── index.html             # Psicossocial
├── gestao-afastados/
│   └── index.html             # Gestão de Afastados
├── saude-ocupacional/
│   ├── index.html             # Landing Saúde Ocupacional
│   ├── pcmso/
│   │   └── index.html         # Subpágina PCMSO
│   └── exames/
│       └── index.html         # Subpágina Exames
├── seguranca-do-trabalho/
│   ├── index.html             # Landing Segurança do Trabalho
│   ├── ppp/
│   │   └── index.html         # Subpágina PPP
│   ├── pgr/
│   │   └── index.html         # Subpágina PGR
│   ├── ltcat/
│   │   └── index.html         # Subpágina LTCAT
│   ├── nrs/
│   │   └── index.html         # Subpágina NRs
│   └── treinamentos/
│       └── index.html         # Subpágina Treinamentos
├── e-social/
│   └── index.html             # e-Social
├── contato/
│   └── index.html             # Página de Contato
│
├── assets/
│   ├── css/
│   │   ├── global.css         # Reset, variáveis e tipografia base
│   │   ├── components.css     # Estilos de botões, navbar e footer
│   │   ├── utilities.css      # Classes utilitárias auxiliares
│   │   └── pages/
│   │       ├── home.css       # Estilos específicos da página inicial
│   │       ├── sobre.css
│   │       └── ...
│   │
│   ├── js/
│   │   ├── main.js            # Ponto de entrada (inicializa módulos)
│   │   ├── api.js
│   │   ├── utils.js
│   │   ├── components/
│   │   │   └── navbar.js      # Menus responsivos e dropdowns
│   │   └── pages/
│   │       └── home.js        # Lógica do carrossel, formulários e máscaras da home
│   │
│   └── images/
│       ├── Logo.png           # Logo oficial da Brasmed
│       └── carrousel/         # Imagens utilizadas no slider principal
│
├── components/                # Componentes HTML reutilizáveis
│   ├── navbar.html
│   ├── footer.html
│   ├── hero.html
│   └── ...
│
└── data/                      # Estruturas de dados em JSON
```

---

## 🛠️ Tecnologias e Implementações
1. **Carrossel do Hero**:
   - Desenvolvido em Vanilla JS com controle de autoplay (6.5s) e pausa ao passar o mouse.
   - Apresentação em duas colunas responsivas (Texto à esquerda e Imagem à direita) com tamanho otimizado (`max-height: 450px`).
   - Imagens utilizadas: `SaudeSeguranca.png`, `SomosReferencia.png`, `ExamesComplementares.png`.
2. **Navbar**:
   - Menu fixo (`sticky`) com logo oficial na esquerda (`Logo.png`, altura `68px`) e links/Contato agrupados na direita.
   - Efeito visual de scroll (encolhimento de padding) e divisor vertical sutil antes da chamada CTA.
3. **Mídia Institucional**:
   - Integração do vídeo do Canva via Iframe na seção "Quem Somos".
4. **Formulários**:
   - Máscara automática de telefone para o campo de WhatsApp.
   - Validações de envio front-end prontas para integração back-end (via PHP na pasta `forms/`).
