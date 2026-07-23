// Main application entry point
import { initNavbar } from './components/navbar.js';
import { initHome } from './pages/home.js';
import { initRede } from './pages/rede-credenciada.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHome();
  initRede();
});
