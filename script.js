// --- 🎛️ Data Core: Company & Character Profiles ---
// 🗺️ Customize alignment using 'alignX', 'alignY', and 'scale' values as needed!
const companyData = {
  cfm: [
    { name: "Hatsune<br>Miku", color: "#39C5BB", image: "CFM/Miku.png", alignX: "center", alignY: "5%", scale: "210%"},
    { name: "Kagamine<br>Rin", color: "#FFB11B", image: "CFM/Rin.png", alignX: "40%", alignY: "9%", scale: "210%"},
    { name: "Kagamine<br>Len", color: "#FFE41B", image: "CFM/Len.png", alignX: "55%", alignY: "9%", scale: "210%"},
    { name: "Megurine<br>Luka", color: "#FFB1BB", image: "CFM/Luka.png", alignX: "center", alignY: "6%", scale: "210%"},
    { name: "KAITO", color: "#3366CC", image: "CFM/KAITO.png", alignX: "20%", alignY: "5%", scale: "230%"},
    { name: "MEIKO", color: "#CC0033", image: "CFM/MEIKO.png", alignX: "60%", alignY: "3%", scale: "230%"}
  ],
  ahs: [
    { name: "Hiyama<br>Sora", color: "#60C0FF", image: "AHS/H-Sora.png", alignX: "45%", alignY: "3%", scale: "250%"},
    { name: "Kizuna<br>Akari", color: "#FF9999", image: "AHS/Kizuna-Akari.png", alignX: "25%", alignY: "1%", scale: "250%"},
    { name: "Miyamai<br>Moca", color: "#FFCC33", image: "AHS/Miyamai_Moca.png", alignX: "55%", alignY: "1%", scale: "220%"},
    { name: "SF-A2<br>miki V4", color: "#FF3366", image: "AHS/SF-A2-miki-V4.png", alignX: "35%", alignY: "20%", scale: "230%"},
    { name: "Tsurumaki<br>Maki", color: "#FF55BB", image: "AHS/Tsurumaki-Maki.png", alignX: "65%", alignY: "7%", scale: "250%"},
    { name: "Yuzuki<br>Yukari", color: "#A47CD6", image: "AHS/Yuzuki_Yukari.png", alignX: "55%", alignY: "1%", scale: "250%"}
  ],
  kamitsubaki: [
    { name: "COKO", color: "#FF007F", image: "Kamitsubaki/COKO.png", alignX: "32%", alignY: "1%", scale: "250%"},
    { name: "HARU", color: "#FF3333", image: "Kamitsubaki/HARU.png", alignX: "55%", alignY: "1%", scale: "200%"},
    { name: "KAFU", color: "#00FFFF", image: "Kamitsubaki/KAFU.png", alignX: "52%", alignY: "3%", scale: "330%"},
    { name: "RIME", color: "#FFAA00", image: "Kamitsubaki/RIME.png", alignX: "40%", alignY: "1%", scale: "180%"},
    { name: "SEKAI", color: "#9933FF", image: "Kamitsubaki/SEKAI.png", alignX: "45%", alignY: "0%", scale: "220%"}
  ],
  FrstPlace: [
    { name: "HIPPI", color: "#FF44aa", image: "FrstPlace/HIPPI.jpg", alignX: "55%", alignY: "9.8%", scale: "320%"},
    { name: "IA", color: "#FFCCCC", image: "FrstPlace/IA.png", alignX: "68%", alignY: "8%", scale: "320%"},
    { name: "ONE", color: "#FF8833", image: "FrstPlace/ONE.png", alignX: "52%", alignY: "1%", scale: "300%"}
  ]
};

// --- 🎯 DOM Element Selectors ---
const canvas = document.querySelector('.universe-canvas');
const galaxyOverlay = document.querySelector('.galaxy-overlay');
const headerElement = document.querySelector('.galaxy-header'); 
const allNavLinks = document.querySelectorAll('.nav-btn, .center-hub');

// 🖼️ Modal UI View Selectors
const portraitModal = document.getElementById('portrait-modal');
const modalCard = document.querySelector('.modal-card');
const modalImageFrame = document.querySelector('.modal-image-frame');
const modalCloseBtn = document.querySelector('.modal-close-btn');

// --- 🔍 Camera Positioning Engine ---
function moveCamera(x, y, zoom) {
  const clampedZoom = Math.min(Math.max(zoom, 0.3), 3.0);
  const offsetX = (1000 - x) * clampedZoom;
  const offsetY = (1000 - y) * clampedZoom;
  canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${clampedZoom})`;
}

// --- 🪐 Character Node Deployment Core ---
function expandCharacters(container) {
  const companyId = container.id;
  const characters = companyData[companyId] || [];
  const total = characters.length;
  
  const isMobile = window.innerWidth <= 768;
  const radius = isMobile ? 125 : 170; 

  characters.forEach((char, index) => {
    const angle = (index * 2 * Math.PI) / total;
    const x = Math.round(radius * Math.cos(angle));
    const y = Math.round(radius * Math.sin(angle));

    const node = document.createElement('div');
    node.className = 'character-node';
    
    node.style.setProperty('--x', `${x}px`);
    node.style.setProperty('--y', `${y}px`);
    node.style.setProperty('--glow-color', char.color);
    node.style.backgroundImage = `url('${char.image}')`;

    // ⚡ Dynamically assigns unique layout alignment custom variables
    node.style.setProperty('--char-x', char.alignX || 'center');
    node.style.setProperty('--char-y', char.alignY || '20%');
    node.style.setProperty('--char-scale', char.scale || '145%');

    const label = document.createElement('span');
    label.className = 'node-label';
    label.innerHTML = char.name; 
    node.appendChild(label);

    // ⚡ Click opens full artwork view
    node.addEventListener('click', (e) => {
      e.stopPropagation(); 
      modalCard.style.setProperty('--modal-glow', char.color);
      modalImageFrame.style.backgroundImage = `url('${char.image}')`;
      portraitModal.classList.add('open');
    });

    container.appendChild(node);

    requestAnimationFrame(() => {
      node.style.transform = `translate(${x}px, ${y}px) scale(1)`;
    });
  });
}

// --- 🌌 Character Node Retraction Engine ---
function retractAllCharacters() {
  const activeNodes = document.querySelectorAll('.character-node');
  activeNodes.forEach(node => {
    node.style.transform = 'translate(0, 0) scale(0)';
    setTimeout(() => node.remove(), 500);
  });
}

// --- 🚪 Modal Close Mechanics ---
function closeModal() {
  portraitModal.classList.remove('open');
  setTimeout(() => {
    modalImageFrame.style.backgroundImage = '';
  }, 300);
}

modalCloseBtn.addEventListener('click', closeModal);
portraitModal.addEventListener('click', (e) => {
  if (e.target === portraitModal) closeModal();
});

// --- 🕹️ Master Navigation Event Loop ---
allNavLinks.forEach(clickableElement => {
  clickableElement.addEventListener('click', (e) => {
    e.preventDefault();
    
    let targetId = clickableElement.getAttribute('href');
    if (!targetId && clickableElement.classList.contains('center-hub')) {
      targetId = "#" + clickableElement.closest('.galaxy-container').id;
    }
    
    retractAllCharacters();
    galaxyOverlay.classList.remove('active'); 
    
    setTimeout(() => {
      const isMobile = window.innerWidth <= 768;

      if (targetId === '#home') {
        if (headerElement) headerElement.classList.remove('hidden');
        
        const baselineZoom = isMobile ? 0.45 : 1.0;
        moveCamera(1000, 1000, baselineZoom);
      } else {
        if (headerElement) headerElement.classList.add('hidden');
        
        const targetCompany = document.querySelector(targetId);
        const posX = parseInt(targetCompany.style.left);
        const posY = parseInt(targetCompany.style.top);
        
        const focusZoom = isMobile ? 0.8 : 1.55; 
        moveCamera(posX, posY, focusZoom); 
        
        setTimeout(() => {
          expandCharacters(targetCompany);
          galaxyOverlay.classList.add('active');
        }, 1000);
      }
    }, 500);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.innerWidth <= 768;
  moveCamera(1000, 1000, isMobile ? 0.45 : 1.0);
});