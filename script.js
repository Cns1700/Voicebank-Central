/**
 * Voicebank Central — Interactive Network Map
 * Cleaned, accessible, and mobile-friendly version
 * Uses optimized WebP images for fast loading
 *
 * Per-character framing controls (edit these values):
 *   alignX  → background-position-x  (e.g. "center", "40%", "65%")
 *   alignY  → background-position-y  (e.g. "0%", "10%", "25%")
 *   scale   → background-size        (e.g. "100%", "130%", "180%")
 */

// ---------------------------------------------------------------------------
// Data: Company → Character profiles
// image     = full portrait for the modal (*.webp)
// nodeImage = small circular crop for the map nodes (*-node.webp)
// alignX / alignY / scale = framing controls for the node
// ---------------------------------------------------------------------------
const companyData = {
  cfm: [
    { name: "Hatsune<br>Miku",   color: "#39C5BB", image: "CFM/Miku.webp",          nodeImage: "CFM/Miku-node.webp",          alignX: "center", alignY: "15%", scale: "120%" },
    { name: "Kagamine<br>Rin",   color: "#FFB11B", image: "CFM/Rin.webp",           nodeImage: "CFM/Rin-node.webp",           alignX: "center", alignY: "15%", scale: "120%" },
    { name: "Kagamine<br>Len",   color: "#FFE41B", image: "CFM/Len.webp",           nodeImage: "CFM/Len-node.webp",           alignX: "center", alignY: "15%", scale: "120%" },
    { name: "Megurine<br>Luka",  color: "#FFB1BB", image: "CFM/Luka.webp",          nodeImage: "CFM/Luka-node.webp",          alignX: "center", alignY: "15%", scale: "120%" },
    { name: "KAITO",             color: "#3366CC", image: "CFM/KAITO.webp",         nodeImage: "CFM/KAITO-node.webp",         alignX: "center", alignY: "15%", scale: "120%" },
    { name: "MEIKO",             color: "#CC0033", image: "CFM/MEIKO.webp",         nodeImage: "CFM/MEIKO-node.webp",         alignX: "center", alignY: "15%", scale: "120%" }
  ],
  ahs: [
    { name: "Hiyama<br>Sora",    color: "#60C0FF", image: "AHS/H-Sora.webp",        nodeImage: "AHS/H-Sora-node.webp",        alignX: "center", alignY: "15%", scale: "120%" },
    { name: "Kizuna<br>Akari",   color: "#FF9999", image: "AHS/Kizuna-Akari.webp",  nodeImage: "AHS/Kizuna-Akari-node.webp",  alignX: "center", alignY: "15%", scale: "120%" },
    { name: "Miyamai<br>Moca",   color: "#FFCC33", image: "AHS/Miyamai_Moca.webp",  nodeImage: "AHS/Miyamai_Moca-node.webp",  alignX: "center", alignY: "15%", scale: "120%" },
    { name: "SF-A2<br>miki V4",  color: "#FF3366", image: "AHS/SF-A2-miki-V4.webp", nodeImage: "AHS/SF-A2-miki-V4-node.webp", alignX: "center", alignY: "15%", scale: "120%" },
    { name: "Tsurumaki<br>Maki", color: "#FF55BB", image: "AHS/Tsurumaki-Maki.webp",nodeImage: "AHS/Tsurumaki-Maki-node.webp",alignX: "center", alignY: "15%", scale: "120%" },
    { name: "Yuzuki<br>Yukari",  color: "#A47CD6", image: "AHS/Yuzuki_Yukari.webp", nodeImage: "AHS/Yuzuki_Yukari-node.webp", alignX: "center", alignY: "15%", scale: "120%" }
  ],
  kamitsubaki: [
    { name: "COKO",  color: "#FF007F", image: "Kamitsubaki/COKO.webp",  nodeImage: "Kamitsubaki/COKO-node.webp",  alignX: "center", alignY: "15%", scale: "120%" },
    { name: "HARU",  color: "#FF3333", image: "Kamitsubaki/HARU.webp",  nodeImage: "Kamitsubaki/HARU-node.webp",  alignX: "center", alignY: "15%", scale: "120%" },
    { name: "KAFU",  color: "#00FFFF", image: "Kamitsubaki/KAFU.webp",  nodeImage: "Kamitsubaki/KAFU-node.webp",  alignX: "center", alignY: "15%", scale: "120%" },
    { name: "RIME",  color: "#FFAA00", image: "Kamitsubaki/RIME.webp",  nodeImage: "Kamitsubaki/RIME-node.webp",  alignX: "center", alignY: "15%", scale: "120%" },
    { name: "SEKAI", color: "#9933FF", image: "Kamitsubaki/SEKAI.webp", nodeImage: "Kamitsubaki/SEKAI-node.webp", alignX: "center", alignY: "15%", scale: "120%" }
  ],
  frstplace: [
    { name: "HIPPI", color: "#FF44aa", image: "FrstPlace/HIPPI.webp", nodeImage: "FrstPlace/HIPPI-node.webp", alignX: "center", alignY: "15%", scale: "120%" },
    { name: "IA",    color: "#FFCCCC", image: "FrstPlace/IA.webp",    nodeImage: "FrstPlace/IA-node.webp",    alignX: "center", alignY: "15%", scale: "120%" },
    { name: "ONE",   color: "#FF8833", image: "FrstPlace/ONE.webp",   nodeImage: "FrstPlace/ONE-node.webp",   alignX: "center", alignY: "15%", scale: "120%" }
  ],
  twindrill: [
    { name: "Kasane<br>Teto", color: "#FF4060", image: "Twindrill/Teto.webp", nodeImage: "Twindrill/Teto-node.webp", alignX: "center", alignY: "15%", scale: "120%" }
  ],
  internet: [
    { name: "GUMI",            color: "#33CC33", image: "Internet/Gumi.webp",   nodeImage: "Internet/Gumi-node.webp",   alignX: "center", alignY: "15%", scale: "120%" },
    { name: "Lily",            color: "#FFEE00", image: "Internet/Lily.webp",   nodeImage: "Internet/Lily-node.webp",   alignX: "center", alignY: "15%", scale: "120%" },
    { name: "Rosa",            color: "#FF66CC", image: "Internet/Rosa.webp",   nodeImage: "Internet/Rosa-node.webp",   alignX: "center", alignY: "15%", scale: "120%" },
    { name: "galaco",          color: "#9933FF", image: "Internet/Galaco.webp", nodeImage: "Internet/Galaco-node.webp", alignX: "center", alignY: "15%", scale: "120%" },
    { name: "CUL",             color: "#FF0033", image: "Internet/Cul.webp",    nodeImage: "Internet/Cul-node.webp",    alignX: "center", alignY: "15%", scale: "120%" },
    { name: "Otomachi<br>Una", color: "#0099FF", image: "Internet/Una.webp",    nodeImage: "Internet/Una-node.webp",    alignX: "center", alignY: "15%", scale: "120%" }
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
const circuitLayer    = document.getElementById('circuit-bg-layer');

// All interactive elements that can trigger navigation
const navButtons  = document.querySelectorAll('.nav-btn');
const hubButtons  = document.querySelectorAll('.center-hub');

// Track last focused element for accessibility (return focus after modal closes)
let lastFocusedElement = null;

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

    // Use the small optimized node image + per-character framing controls
    node.style.backgroundImage = `url('${char.nodeImage || char.image}')`;
    node.style.setProperty('--char-x', char.alignX || 'center');
    node.style.setProperty('--char-y', char.alignY || '15%');
    node.style.setProperty('--char-scale', char.scale || '120%');

    const label = document.createElement('span');
    label.className = 'node-label';
    label.innerHTML = char.name;
    node.appendChild(label);

    node.addEventListener('click', (e) => {
      e.stopPropagation();
      openPortrait(char, node);
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
// Portrait modal (with proper focus management)
// ---------------------------------------------------------------------------
function openPortrait(char, triggerElement) {
  lastFocusedElement = triggerElement || document.activeElement;

  modalCard.style.setProperty('--modal-glow', char.color);
  // Use the larger optimized image for the full portrait modal
  modalImageFrame.style.backgroundImage = `url('${char.image}')`;
  modalImageFrame.setAttribute('aria-label', `Full artwork of ${char.name.replace(/<br>/g, ' ')}`);

  portraitModal.showModal();

  // Move focus into the modal for keyboard / screen-reader users
  requestAnimationFrame(() => {
    modalCloseBtn.focus();
  });
}

function closePortrait() {
  if (portraitModal.open) {
    portraitModal.close();
  }

  // Return focus to the element that opened the modal
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;

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
// Theme & particle system + circuit tinting
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

  // Reset circuit color to default cyan
  if (circuitLayer) {
    circuitLayer.style.setProperty('--circuit-glow', 'rgba(0, 255, 204, 0.55)');
  }

  if (companyId && companyId !== 'home') {
    bgLayer.classList.add(`bg-${companyId}`);
    spawnCompanyParticles(companyId);

    // Tint the circuit lights toward the first character color of the company
    const characters = companyData[companyId];
    if (characters && characters.length > 0 && circuitLayer) {
      const tintColor = characters[0].color;
      // Convert hex to rgba for the glow
      const r = parseInt(tintColor.slice(1, 3), 16);
      const g = parseInt(tintColor.slice(3, 5), 16);
      const b = parseInt(tintColor.slice(5, 7), 16);
      circuitLayer.style.setProperty('--circuit-glow', `rgba(${r}, ${g}, ${b}, 0.55)`);
    }
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
