# Guia de Navegação e Estilos do Projeto (Brasmed)

Este arquivo serve como referência rápida para desenvolvimento e modificações no projeto.

---

## 🎨 Cores Principais (CSS Variables em `/assets/css/global.css`)
- **Verde Medicinal Principal (`--green`)**: `#00875A`
- **Verde Escuro Hovers (`--green-dark`)**: `#005F3F`
- **Verde Claro Ações (`--green-light`)**: `#00A36C`
- **Verde Suave Fundos (`--green-tint`)**: `#F0FDF4`
- **Texto Principal (`--navy`)**: `#1E293B`
- **Texto Escuro Destaque (`--navy-2`)**: `#0F172A`
- **Fundos Alternativos (`--grey-bg`)**: `#F8FAFC`
- **Bordas (`--grey-line`)**: `#E2E8F0`

---

## 📂 Mapeamento de Páginas e Estilos

| Página / Rota | HTML | CSS Específico |
| :--- | :--- | :--- |
| **Página Inicial** | [index.html](/index.html) | [/assets/css/pages/home.css](/assets/css/pages/home.css) |
| **Quem Somos** | [sobre/index.html](/sobre/index.html) | [/assets/css/pages/sobre.css](/assets/css/pages/sobre.css) |
| **Rede Credenciada** | [rede-credenciada/index.html](/rede-credenciada/index.html) | [/assets/css/pages/rede-credenciada.css](/assets/css/pages/rede-credenciada.css) |
| **Guia de Encaminhamento**| [guia-encaminhamento/index.html](/guia-encaminhamento/index.html) | [/assets/css/pages/guia-encaminhamento.css](/assets/css/pages/guia-encaminhamento.css) |
| **Contato** | [contato/index.html](/contato/index.html) | [/assets/css/pages/contato.css](/assets/css/pages/contato.css) |
| **Política de Privacidade** | [politica-de-privacidade/index.html](/politica-de-privacidade/index.html) | [/assets/css/pages/politica.css](/assets/css/pages/politica.css) |

---

## 🧩 Componentes Globais (Reutilizáveis)
- **Estilos Globais**: [/assets/css/global.css](/assets/css/global.css) (Reset, fontes e variáveis)
- **Estilos de Componentes**: [/assets/css/components.css](/assets/css/components.css) (Navbar, Footer, Botões)
- **Utilitários**: [/assets/css/utilities.css](/assets/css/utilities.css) (Classes rápidas)

### 1. Header (Navbar)
O Header deve ser idêntico em todas as páginas para manter a consistência de navegação. 
- **Estrutura HTML**: `<header class="navbar" id="navbar">`
- **Lógica e responsividade**: [/assets/js/components/navbar.js](/assets/js/components/navbar.js)

### 2. Footer
O Footer padrão com logo, links rápidos, informações de contato e endereço.
- **Estrutura HTML**: `<footer>`

---

## ⚡ Inicialização de Scripts (`/assets/js/main.js`)
O script principal inicializa os módulos na página.
- [/assets/js/main.js](/assets/js/main.js)
