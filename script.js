/**
 * Voicebank Central — Interactive Network Map
 * Cleaned, accessible, and mobile-friendly version
 */

// ---------------------------------------------------------------------------
// Data: Company → Character profiles
// Image paths keep original folder casing (FrstPlace, etc.)
// ---------------------------------------------------------------------------
const companyData = {
  cfm: [
    { name: "Hatsune<br>Miku",   color: "#39C5BB", image: "CFM/Miku.png",          alignX: "center", alignY: "5%",  scale: "210%" },
    { name: "Kagamine<br>Rin",   color: "#FFB11B", image: "CFM/Rin.png",           alignX: "40%",    alignY: "9%",  scale: "210%" },
    { name: "Kagamine<br>Len",   color: "#FFE41B", image: "CFM/Len.png",           alignX: "55%",    alignY: "9%",  scale: "210%" },
    { name: "Megurine<br>Luka",  color: "#FFB1BB", image: "CFM/Luka.png",          alignX: "center", alignY: "6%",  scale: "210%" },
    { name: "KAITO",             color: "#3366CC", image: "CFM/KAITO.png",         alignX: "20%",    alignY: "5%",  scale: "230%" },
    { name: "MEIKO",             color: "#CC0033", image: "CFM/MEIKO.png",         alignX: "60%",    alignY: "3%",  scale: "230%" }
  ],
  ahs: [
    { name: "Hiyama<br>Sora",    color: "#60C0FF", image: "AHS/H-Sora.png",        alignX: "45%",    alignY: "3%",  scale: "250%" },
    { name: "Kizuna<br>Akari",   color: "#FF9999", image: "AHS/Kizuna-Akari.png",  alignX: "25%",    alignY: "1%",  scale: "250%" },
    { name: "Miyamai<br>Moca",   color: "#FFCC33", image: "AHS/Miyamai_Moca.png",  alignX: "55%",    alignY: "1%",  scale: "220%" },
    { name: "SF-A2<br>miki V4",  color: "#FF3366", image: "AHS/SF-A2-miki-V4.png", alignX: "35%",    alignY: "20%", scale: "230%" },
    { name: "Tsurumaki<br>Maki", color: "#FF55BB", image: "AHS/Tsurumaki-Maki.png",alignX: "65%",    alignY: "7%",  scale: "250%" },
    { name: "Yuzuki<br>Yukari",  color: "#A47CD6", image: "AHS/Yuzuki_Yukari.png", alignX: "55%",    alignY: "1%",  scale: "250%" }
  ],
  kamitsubaki: [
    { name: "COKO",  color: "#FF007F", image: "Kamitsubaki/COKO.png",  alignX: "32%", alignY: "1%", scale: "250%" },
    { name: "HARU",  color: "#FF3333", image: "Kamitsubaki/HARU.png",  alignX: "55%", alignY: "1%", scale: "200%" },
    { name: "KAFU",  color: "#00FFFF", image: "Kamitsubaki/KAFU.png",  alignX: "52%", alignY: "3%", scale: "330%" },
    { name: "RIME",  color: "#FFAA00", image: "Kamitsubaki/RIME.png",  alignX: "40%", alignY: "1%", scale: "180%" },
    { name: "SEKAI", color: "#9933FF", image: "Kamitsubaki/SEKAI.png", alignX: "45%", alignY: "0%", scale: "220%" }
  ],
  frstplace: [
    { name: "HIPPI", color: "#FF44aa", image: "FrstPlace/HIPPI.jpg", alignX: "55%",  alignY: "9.8%", scale: "320%" },
    { name: "IA",    color: "#FFCCCC", image: "FrstPlace/IA.png",    alignX: "68%",  alignY: "8%",   scale: "320%" },
    { name: "ONE",   color: "#FF8833", image: "FrstPlace/ONE.png",   alignX: "52%",  alignY: "1%",   scale: "300%" }
  ],
  twindrill: [
    { name: "Kasane<br>Teto", color: "#FF4060", image: "Twindrill/Teto.png", alignX: "53%", alignY: "5%", scale: "235%" }
  ],
  internet: [
    { name: "GUMI",            color: "#33CC33", image: "Internet/Gumi.png",   alignX: "25%", alignY: "3%", scale: "225%" },
    { name: "Lily",            color: "#FFEE00", image: "Internet/Lily.png",   alignX: "35%", alignY: "5%", scale: "255%" },
    { name: "Rosa",            color: "#FF66CC", image: "Internet/Rosa.png",   alignX: "35%", alignY: "3%", scale: "255%" },
    { name: "galaco",          color: "#9933FF", image: "Internet/Galaco.png", alignX: "55%", alignY: "3%", scale: "245%" },
    { name: "CUL",             color: "#FF0033", image: "Internet/Cul.png",    alignX: "59%", alignY: "1%", scale: "245%" },
    { name: "Otomachi<br>Una", color: "#0099FF", image: "Internet/Una.png",    alignX: "59%", alignY: "3%", scale: "245%" }
  ]
};

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------
const canvas          = document.getElementById('universe-canvas');
const galaxyOverlay   = document.getElementById('galaxy-overlay');
const headerElement   = document.getElementById('site-header');
const portraitModal   = document.getElementById('portrait-modal');
const modalCard       = portraitModal.querySelector('.modal-card');
const modalImageFrame = portraitModal.querySelector('.modal-image-frame');
const modalCloseBtn   = portraitModal.querySelector('.modal-close-btn');

// All interactive elements that can trigger navigation
const navButtons  = document.querySelectorAll('.nav-btn');
const hubButtons  = document.querySelectorAll('.center-hub');

// ---------------------------------------------------------------------------
// Camera / Zoom engine
// ---------------------------------------------------------------------------
function moveCamera(x, y, zoom) {
  const clampedZoom = Math.min(Math.max(zoom, 0.3), 3.0);
  const offsetX = (1000 - x) * clampedZoom;
  const offsetY = (1000 - y) * clampedZoom;
  canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${clampedZoom})`;
}

function isMobileView() {
  return window.innerWidth <= 768;
}

// ---------------------------------------------------------------------------
// Character nodes
// ---------------------------------------------------------------------------
function expandCharacters(container) {
  const companyId = container.id; // already lowercase
  const characters = companyData[companyId] || [];
  const total = characters.length;
  if (total === 0) return;

  const radius = isMobileView() ? 125 : 170;

  characters.forEach((char, index) => {
    const angle = (index * 2 * Math.PI) / total;
    const x = Math.round(radius * Math.cos(angle));
    const y = Math.round(radius * Math.sin(angle));

    const node = document.createElement('button');
    node.type = 'button';
    node.className = 'character-node';
    node.setAttribute('aria-label', `View portrait of ${char.name.replace(/<br>/g, ' ')}`);

    node.style.setProperty('--x', `${x}px`);
    node.style.setProperty('--y', `${y}px`);
    node.style.setProperty('--glow-color', char.color);
    node.style.backgroundImage = `url('${char.image}')`;
    node.style.setProperty('--char-x', char.alignX || 'center');
    node.style.setProperty('--char-y', char.alignY || '20%');
    node.style.setProperty('--char-scale', char.scale || '145%');

    const label = document.createElement('span');
    label.className = 'node-label';
    label.innerHTML = char.name;
    node.appendChild(label);

    node.addEventListener('click', (e) => {
      e.stopPropagation();
      openPortrait(char);
    });

    container.appendChild(node);

    // Trigger the expand animation on next frame
    requestAnimationFrame(() => {
      node.style.transform = `translate(${x}px, ${y}px) scale(1)`;
    });
  });
}

function retractAllCharacters() {
  const activeNodes = document.querySelectorAll('.character-node');
  activeNodes.forEach(node => {
    node.style.transform = 'translate(0, 0) scale(0)';
    // Clean up after transition
    setTimeout(() => {
      if (node.parentNode) node.remove();
    }, 550);
  });

  // Reset aria-expanded on all hubs
  hubButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
}

// ---------------------------------------------------------------------------
// Portrait modal
// ---------------------------------------------------------------------------
function openPortrait(char) {
  modalCard.style.setProperty('--modal-glow', char.color);
  modalImageFrame.style.backgroundImage = `url('${char.image}')`;
  modalImageFrame.setAttribute('aria-label', `Full artwork of ${char.name.replace(/<br>/g, ' ')}`);
  portraitModal.showModal();
}

function closePortrait() {
  if (portraitModal.open) {
    portraitModal.close();
  }
  // Clear image after close animation
  setTimeout(() => {
    modalImageFrame.style.backgroundImage = '';
  }, 280);
}

modalCloseBtn.addEventListener('click', closePortrait);

portraitModal.addEventListener('click', (e) => {
  // Click on the backdrop (the dialog itself) closes it
  if (e.target === portraitModal) closePortrait();
});

portraitModal.addEventListener('cancel', (e) => {
  // Allow Escape key to close
  e.preventDefault();
  closePortrait();
});

// ---------------------------------------------------------------------------
// Theme & particle system
// ---------------------------------------------------------------------------
function spawnCompanyParticles(companyId) {
  const layer = document.getElementById('particle-canvas');
  if (!layer) return;

  layer.innerHTML = '';
  const characters = companyData[companyId] || [];
  if (characters.length === 0) return;

  const totalShapes = 14;
  for (let i = 0; i < totalShapes; i++) {
    const randomChara = characters[i % characters.length];
    const themeColor = randomChara.color;

    const shape = document.createElement('div');
    shape.className = 'floating-shape';
    shape.style.setProperty('--shape-glow', themeColor);
    shape.style.backgroundColor = themeColor;

    const size = Math.random() * 14 + 7;
    shape.style.width  = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.left   = `${Math.random() * 100}vw`;

    // Staggered animation timings
    shape.style.animationDuration =
      `${(Math.random() * 6 + 11).toFixed(1)}s, ` +
      `${(Math.random() * 2 + 5).toFixed(1)}s, ` +
      `${(Math.random() * 2 + 3.5).toFixed(1)}s`;
    shape.style.animationDelay =
      `${(Math.random() * -14).toFixed(1)}s, ` +
      `${(Math.random() * -7).toFixed(1)}s, ` +
      `${(Math.random() * -4).toFixed(1)}s`;

    layer.appendChild(shape);
  }
}

function updateScrollerBackground(companyId) {
  const bgLayer = document.getElementById('gradient-bg-layer');
  if (!bgLayer) return;

  // Reset classes
  bgLayer.className = 'gradient-scroller';

  if (companyId && companyId !== 'home') {
    bgLayer.classList.add(`bg-${companyId}`);
    spawnCompanyParticles(companyId);
  } else {
    const layer = document.getElementById('particle-canvas');
    if (layer) layer.innerHTML = '';
  }
}

// ---------------------------------------------------------------------------
// Navigation handler
// ---------------------------------------------------------------------------
function navigateTo(targetId) {
  // Retract any open characters first
  retractAllCharacters();
  galaxyOverlay.classList.remove('active');

  // Small delay so retraction animation can start
  setTimeout(() => {
    const mobile = isMobileView();

    if (targetId === 'home') {
      if (headerElement) headerElement.classList.remove('hidden');
      updateScrollerBackground('home');
      const baselineZoom = mobile ? 0.45 : 1.0;
      moveCamera(1000, 1000, baselineZoom);
      return;
    }

    // Focus on a specific company
    if (headerElement) headerElement.classList.add('hidden');
    updateScrollerBackground(targetId);

    const targetCompany = document.getElementById(targetId);
    if (!targetCompany) return;

    const posX = parseInt(targetCompany.style.left, 10);
    const posY = parseInt(targetCompany.style.top, 10);
    const focusZoom = mobile ? 0.82 : 1.55;

    moveCamera(posX, posY, focusZoom);

    // Expand characters after the camera has mostly settled
    setTimeout(() => {
      expandCharacters(targetCompany);
      galaxyOverlay.classList.add('active');

      // Accessibility: mark the corresponding hub as expanded
      const hubBtn = targetCompany.querySelector('.center-hub');
      if (hubBtn) hubBtn.setAttribute('aria-expanded', 'true');
    }, 920);
  }, 80);
}

// Wire up nav buttons
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    if (target) navigateTo(target);
  });
});

// Wire up center hub buttons
hubButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const company = btn.getAttribute('data-company');
    if (company) navigateTo(company);
  });
});

// ---------------------------------------------------------------------------
// Initialisation
// ---------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  const mobile = isMobileView();
  moveCamera(1000, 1000, mobile ? 0.45 : 1.0);
  updateScrollerBackground('home');
});

// Optional: re-center on orientation / resize changes (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Only re-apply baseline if we are currently at home overview
    if (!headerElement.classList.contains('hidden')) {
      const mobile = isMobileView();
      moveCamera(1000, 1000, mobile ? 0.45 : 1.0);
    }
  }, 200);
});
