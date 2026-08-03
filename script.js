/**
 * Voicebank Central — Interactive Network Map
 * Cleaned, accessible, and mobile-friendly version
 * Uses optimized WebP images for fast loading
 *
 * Features:
 *   - Free pan & drag of the galaxy map
 *   - Animated glowing connection lines (hub → characters)
 *   - Per-character framing controls (alignX / alignY / scale)
 */

// ---------------------------------------------------------------------------
// Data: Company → Character profiles
// ---------------------------------------------------------------------------
const companyData = {
  cfm: [
    { name: "Hatsune<br>Miku",   color: "#39C5BB", image: "CFM/Miku.webp",          nodeImage: "CFM/Miku.webp",          alignX: "center", alignY: "3%", scale: "180%" },
    { name: "Kagamine<br>Rin",   color: "#FFB11B", image: "CFM/Rin.webp",           nodeImage: "CFM/Rin.webp",           alignX: "center", alignY: "9%", scale: "190%" },
    { name: "Kagamine<br>Len",   color: "#FFE41B", image: "CFM/Len.webp",           nodeImage: "CFM/Len.webp",           alignX: "center", alignY: "9%", scale: "190%" },
    { name: "Megurine<br>Luka",  color: "#FFB1BB", image: "CFM/Luka.webp",          nodeImage: "CFM/Luka.webp",          alignX: "center", alignY: "8%", scale: "190%" },
    { name: "KAITO",             color: "#3366CC", image: "CFM/KAITO.webp",         nodeImage: "CFM/KAITO.webp",         alignX: "20%", alignY: "5%", scale: "190%" },
    { name: "MEIKO",             color: "#CC0033", image: "CFM/MEIKO.webp",         nodeImage: "CFM/MEIKO.webp",         alignX: "65%", alignY: "5%", scale: "190%" }
  ],
  ahs: [
    { name: "Hiyama<br>Sora",    color: "#60C0FF", image: "AHS/H-Sora.webp",        nodeImage: "AHS/H-Sora.webp",         alignX: "center", alignY: "5%", scale: "190%" },
    { name: "Kizuna<br>Akari",   color: "#FF9999", image: "AHS/Kizuna-Akari.webp",  nodeImage: "AHS/Kizuna-Akari.webp",   alignX: "30%", alignY: "2%", scale: "190%" },
    { name: "Miyamai<br>Moca",   color: "#FFCC33", image: "AHS/Miyamai_Moca.webp",  nodeImage: "AHS/Miyamai_Moca.webp",   alignX: "60%", alignY: "5%", scale: "190%" },
    { name: "SF-A2<br>miki V4",  color: "#FF3366", image: "AHS/SF-A2-miki-V4.webp", nodeImage: "AHS/SF-A2-miki-V4.webp",  alignX: "35%", alignY: "20%", scale: "190%" },
    { name: "Tsurumaki<br>Maki", color: "#FF55BB", image: "AHS/Tsurumaki-Maki.webp",nodeImage: "AHS/Tsurumaki-Maki.webp", alignX: "60%", alignY: "8%", scale: "190%" },
    { name: "Yuzuki<br>Yukari",  color: "#A47CD6", image: "AHS/Yuzuki_Yukari.webp", nodeImage: "AHS/Yuzuki_Yukari.webp",  alignX: "55%", alignY: "6%", scale: "190%" }
  ],
  kamitsubaki: [
    { name: "COKO",  color: "#FF007F", image: "Kamitsubaki/COKO.webp",  nodeImage: "Kamitsubaki/COKO.webp",  alignX: "30%", alignY: "1%", scale: "190%" },
    { name: "HARU",  color: "#FF3333", image: "Kamitsubaki/HARU.webp",  nodeImage: "Kamitsubaki/HARU.webp",  alignX: "55%", alignY: "1%", scale: "190%" },
    { name: "KAFU",  color: "#00FFFF", image: "Kamitsubaki/KAFU.webp",  nodeImage: "Kamitsubaki/KAFU.webp",  alignX: "center", alignY: "6%", scale: "190%" },
    { name: "RIME",  color: "#FFAA00", image: "Kamitsubaki/RIME.webp",  nodeImage: "Kamitsubaki/RIME.webp",  alignX: "center", alignY: "1%", scale: "150%" },
    { name: "SEKAI", color: "#9933FF", image: "Kamitsubaki/SEKAI.webp", nodeImage: "Kamitsubaki/SEKAI.webp", alignX: "center", alignY: "1%", scale: "190%" }
  ],
  frstplace: [
    { name: "HIPPI", color: "#FF44aa", image: "FrstPlace/HIPPI.webp", nodeImage: "FrstPlace/HIPPI.webp", alignX: "55%", alignY: "12%", scale: "200%" },
    { name: "IA",    color: "#FFCCCC", image: "FrstPlace/IA.webp",    nodeImage: "FrstPlace/IA.webp",    alignX: "70%", alignY: "12%", scale: "200%" },
    { name: "ONE",   color: "#FF8833", image: "FrstPlace/ONE.webp",   nodeImage: "FrstPlace/ONE.webp",   alignX: "60%", alignY: "1%", scale: "190%" }
  ],
  twindrill: [
    { name: "Kasane<br>Teto", color: "#FF4060", image: "Twindrill/Teto.webp", nodeImage: "Twindrill/Teto.webp", alignX: "center", alignY: "10%", scale: "190%" }
  ],
  internet: [
    { name: "GUMI",            color: "#33CC33", image: "Internet/Gumi.webp",   nodeImage: "Internet/Gumi.webp",   alignX: "25%", alignY: "4%", scale: "190%" },
    { name: "Lily",            color: "#FFEE00", image: "Internet/Lily.webp",   nodeImage: "Internet/Lily.webp",   alignX: "35%", alignY: "5%", scale: "200%" },
    { name: "Rosa",            color: "#FF66CC", image: "Internet/Rosa.webp",   nodeImage: "Internet/Rosa.webp",   alignX: "40%", alignY: "4%", scale: "190%" },
    { name: "galaco",          color: "#9933FF", image: "Internet/Galaco.webp", nodeImage: "Internet/Galaco.webp", alignX: "60%", alignY: "8%", scale: "190%" },
    { name: "CUL",             color: "#FF0033", image: "Internet/Cul.webp",    nodeImage: "Internet/Cul.webp",    alignX: "60%", alignY: "5%", scale: "190%" },
    { name: "Otomachi<br>Una", color: "#0099FF", image: "Internet/Una.webp",    nodeImage: "Internet/Una.webp",    alignX: "60%", alignY: "10%", scale: "190%" }
  ]
};

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------
const canvas          = document.getElementById('universe-canvas');
const viewport        = document.getElementById('galaxy-viewport');
const galaxyOverlay   = document.getElementById('galaxy-overlay');
const headerElement   = document.getElementById('site-header');
const portraitModal   = document.getElementById('portrait-modal');
const modalCard       = portraitModal.querySelector('.modal-card');
const modalImageFrame = portraitModal.querySelector('.modal-image-frame');
const modalCloseBtn   = portraitModal.querySelector('.modal-close-btn');
const circuitLayer    = document.getElementById('circuit-bg-layer');

const navButtons  = document.querySelectorAll('.nav-btn');
const hubButtons  = document.querySelectorAll('.center-hub');

let lastFocusedElement = null;

// ---------------------------------------------------------------------------
// Camera state (used by both programmatic moves and free pan/drag)
// ---------------------------------------------------------------------------
const camera = {
  x: 1000,
  y: 1000,
  zoom: 1.0
};

function applyCamera(animate = true) {
  const clampedZoom = Math.min(Math.max(camera.zoom, 0.3), 3.0);
  camera.zoom = clampedZoom;

  const offsetX = (1000 - camera.x) * clampedZoom;
  const offsetY = (1000 - camera.y) * clampedZoom;

  if (animate) {
    canvas.style.transition = 'transform 1000ms cubic-bezier(0.25, 1, 0.5, 1)';
  } else {
    canvas.style.transition = 'none';
  }

  canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${clampedZoom})`;
}

function moveCamera(x, y, zoom) {
  camera.x = x;
  camera.y = y;
  camera.zoom = zoom;
  applyCamera(true);
}

function isMobileView() {
  return window.innerWidth <= 768;
}

// ---------------------------------------------------------------------------
// Pan & Drag
// ---------------------------------------------------------------------------
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let cameraStartX = 0;
let cameraStartY = 0;
let hasDragged = false; // distinguishes click from drag

function onPointerDown(e) {
  // Ignore if clicking interactive elements (hubs, nodes, nav, modal)
  if (e.target.closest('.center-hub, .character-node, .nav-btn, .modal-overlay, .modal-card')) {
    return;
  }

  isDragging = true;
  hasDragged = false;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  cameraStartX = camera.x;
  cameraStartY = camera.y;

  viewport.classList.add('is-dragging');
  canvas.style.transition = 'none';

  // Capture pointer so we keep receiving events even if cursor leaves
  viewport.setPointerCapture?.(e.pointerId);
}

function onPointerMove(e) {
  if (!isDragging) return;

  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;

  // Only count as a real drag after a small threshold (avoids accidental micro-moves)
  if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
    hasDragged = true;
  }

  // Convert screen delta into world-space delta (inverse of zoom)
  camera.x = cameraStartX - dx / camera.zoom;
  camera.y = cameraStartY - dy / camera.zoom;

  applyCamera(false);
}

function onPointerUp(e) {
  if (!isDragging) return;
  isDragging = false;
  viewport.classList.remove('is-dragging');
  viewport.releasePointerCapture?.(e.pointerId);
}

// Pointer events (works for mouse + touch + pen)
viewport.addEventListener('pointerdown', onPointerDown);
viewport.addEventListener('pointermove', onPointerMove);
viewport.addEventListener('pointerup', onPointerUp);
viewport.addEventListener('pointercancel', onPointerUp);

// Prevent text selection / image drag while panning
viewport.addEventListener('dragstart', (e) => e.preventDefault());

// ---------------------------------------------------------------------------
// Connection lines (SVG)
// ---------------------------------------------------------------------------
function createConnectionLines(container, characters, radius) {
  // Remove any existing SVG from previous expand
  const oldSvg = container.querySelector('.connection-lines');
  if (oldSvg) oldSvg.remove();

  const size = 400; // large enough to cover the orbit
  const center = size / 2;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'connection-lines');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.style.position = 'absolute';
  svg.style.left = '50%';
  svg.style.top = '50%';
  svg.style.transform = 'translate(-50%, -50%)';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '15';
  svg.setAttribute('aria-hidden', 'true');

  characters.forEach((char, index) => {
    const angle = (index * 2 * Math.PI) / characters.length;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', center);
    line.setAttribute('y1', center);
    line.setAttribute('x2', x);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', char.color);
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('class', 'connection-line');

    // Length for dash animation
    const length = Math.hypot(x - center, y - center);
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;

    svg.appendChild(line);

    // Stagger the draw animation
    requestAnimationFrame(() => {
      setTimeout(() => {
        line.style.transition = 'stroke-dashoffset 0.55s cubic-bezier(0.22, 1, 0.36, 1)';
        line.style.strokeDashoffset = '0';
      }, index * 45);
    });
  });

  container.appendChild(svg);
}

function removeConnectionLines() {
  document.querySelectorAll('.connection-lines').forEach(svg => {
    // Fade out then remove
    svg.style.transition = 'opacity 0.3s ease';
    svg.style.opacity = '0';
    setTimeout(() => svg.remove(), 320);
  });
}

// ---------------------------------------------------------------------------
// Character nodes
// ---------------------------------------------------------------------------
function expandCharacters(container) {
  const companyId = container.id;
  const characters = companyData[companyId] || [];
  const total = characters.length;
  if (total === 0) return;

  const radius = isMobileView() ? 125 : 170;

  // Draw glowing connection lines first
  createConnectionLines(container, characters, radius);

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

    requestAnimationFrame(() => {
      node.style.transform = `translate(${x}px, ${y}px) scale(1)`;
    });
  });
}

function retractAllCharacters() {
  removeConnectionLines();

  const activeNodes = document.querySelectorAll('.character-node');
  activeNodes.forEach(node => {
    node.style.transform = 'translate(0, 0) scale(0)';
    setTimeout(() => {
      if (node.parentNode) node.remove();
    }, 550);
  });

  hubButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
}

// ---------------------------------------------------------------------------
// Portrait modal
// ---------------------------------------------------------------------------
function openPortrait(char, triggerElement) {
  lastFocusedElement = triggerElement || document.activeElement;

  modalCard.style.setProperty('--modal-glow', char.color);
  modalImageFrame.style.backgroundImage = `url('${char.image}')`;
  modalImageFrame.setAttribute('aria-label', `Full artwork of ${char.name.replace(/<br>/g, ' ')}`);

  portraitModal.showModal();

  requestAnimationFrame(() => {
    modalCloseBtn.focus();
  });
}

function closePortrait() {
  if (portraitModal.open) {
    portraitModal.close();
  }

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;

  setTimeout(() => {
    modalImageFrame.style.backgroundImage = '';
  }, 280);
}

modalCloseBtn.addEventListener('click', closePortrait);

portraitModal.addEventListener('click', (e) => {
  if (e.target === portraitModal) closePortrait();
});

portraitModal.addEventListener('cancel', (e) => {
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

  bgLayer.className = 'gradient-scroller';

  if (circuitLayer) {
    circuitLayer.style.setProperty('--circuit-glow', 'rgba(0, 255, 204, 0.55)');
  }

  if (companyId && companyId !== 'home') {
    bgLayer.classList.add(`bg-${companyId}`);
    spawnCompanyParticles(companyId);

    const characters = companyData[companyId];
    if (characters && characters.length > 0 && circuitLayer) {
      const tintColor = characters[0].color;
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
  retractAllCharacters();
  galaxyOverlay.classList.remove('active');

  setTimeout(() => {
    const mobile = isMobileView();

    if (targetId === 'home') {
      if (headerElement) headerElement.classList.remove('hidden');
      updateScrollerBackground('home');
      const baselineZoom = mobile ? 0.45 : 1.0;
      moveCamera(1000, 1000, baselineZoom);
      return;
    }

    if (headerElement) headerElement.classList.add('hidden');
    updateScrollerBackground(targetId);

    const targetCompany = document.getElementById(targetId);
    if (!targetCompany) return;

    const posX = parseInt(targetCompany.style.left, 10);
    const posY = parseInt(targetCompany.style.top, 10);
    const focusZoom = mobile ? 0.82 : 1.55;

    moveCamera(posX, posY, focusZoom);

    setTimeout(() => {
      expandCharacters(targetCompany);
      galaxyOverlay.classList.add('active');

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
  btn.addEventListener('click', (e) => {
    // Ignore if the user was actually dragging the map
    if (hasDragged) {
      hasDragged = false;
      return;
    }
    const company = btn.getAttribute('data-company');
    if (company) navigateTo(company);
  });
});

// ---------------------------------------------------------------------------
// Initialisation
// ---------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  const mobile = isMobileView();
  camera.zoom = mobile ? 0.45 : 1.0;
  camera.x = 1000;
  camera.y = 1000;
  applyCamera(false);
  updateScrollerBackground('home');
});

// Re-center on orientation / resize (only when at home overview)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!headerElement.classList.contains('hidden')) {
      const mobile = isMobileView();
      moveCamera(1000, 1000, mobile ? 0.45 : 1.0);
    }
  }, 200);
});
