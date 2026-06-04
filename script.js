// --- 🎛️ Data Core: Company & Character Profiles ---
const companyData = {
  cfm: [
    { name: "Hatsune Miku", color: "#39C5BB", image: "CFM/Miku.png" },
    { name: "Kagamine Rin", color: "#FFB11B", image: "CFM/Rin.png" },
    { name: "Kagamine Len", color: "#FFE41B", image: "CFM/Len.png" },
    { name: "Megurine Luka", color: "#FFB1BB", image: "CFM/Luka.png" },
    { name: "KAITO", color: "#3366CC", image: "CFM/KAITO.png" }, // No full name change needed
    { name: "MEIKO", color: "#CC0033", image: "CFM/MEIKO.png" }   // No full name change needed
  ],
  ahs: [
    { name: "Hiyama Sora", color: "#60C0FF", image: "AHS/H-Sora.png" },
    { name: "Kizuna Akari", color: "#FF9999", image: "AHS/Kizuna-Akari.png" },
    { name: "Miyamai Moca", color: "#FFCC33", image: "AHS/Miyamai_Moca.png" },
    { name: "SF-A2 miki V4", color: "#FF3366", image: "AHS/SF-A2-miki-V4.png" },
    { name: "Tsurumaki Maki", color: "#FF55BB", image: "AHS/Tsurumaki-Maki.png" },
    { name: "Yuzuki Yukari", color: "#A47CD6", image: "AHS/Yuzuki_Yukari.png" }
  ],
  kamitsubaki: [
    { name: "COKO", color: "#FF007F", image: "Kamitsubaki/COKO.png" },
    { name: "HARU", color: "#FF3333", image: "Kamitsubaki/HARU.png" },
    { name: "KAFU", color: "#00FFFF", image: "Kamitsubaki/KAFU.png" },
    { name: "RIME", color: "#FFAA00", image: "Kamitsubaki/RIME.png" },
    { name: "SEKAI", color: "#9933FF", image: "Kamitsubaki/SEKAI.png" }
  ],
  FrstPlace: [
    { name: "HIPPI", color: "#FF44aa", image: "FrstPlace/HIPPI.jpg" },
    { name: "IA", color: "#FFCCCC", image: "FrstPlace/IA.png" },
    { name: "ONE", color: "#FF8833", image: "FrstPlace/ONE.png" }
  ]
};

// --- 🎯 DOM Element Selectors ---
const canvas = document.querySelector('.universe-canvas');
const galaxyOverlay = document.querySelector('.galaxy-overlay');
const allNavLinks = document.querySelectorAll('.nav-btn, .center-hub');

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
  
  // 📱 Scale the orbital radius inward on mobile viewports so nodes stay inside boundaries
  const isMobile = window.innerWidth <= 768;
  const radius = isMobile ? 110 : 180; 

  characters.forEach((char, index) => {
    const angle = (index * 2 * Math.PI) / total;
    const x = Math.round(radius * Math.cos(angle));
    const y = Math.round(radius * Math.sin(angle));

    const node = document.createElement('div');
    node.className = 'character-node';
    
    if (char.image.toLowerCase().endsWith('.jpg') || char.image.toLowerCase().endsWith('.jpeg')) {
      node.classList.add('jpg-node');
    }
    
    node.style.setProperty('--x', `${x}px`);
    node.style.setProperty('--y', `${y}px`);
    node.style.setProperty('--glow-color', char.color);
    node.style.backgroundImage = `url('${char.image}')`;

    const label = document.createElement('span');
    label.className = 'node-label';
    label.textContent = char.name;
    node.appendChild(label);

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
        // 📲 Zooms out the birds-eye starting view on mobile screens so all hubs stay visible at once
        const baselineZoom = isMobile ? 0.45 : 1.0;
        moveCamera(1000, 1000, baselineZoom);
      } else {
        const targetCompany = document.querySelector(targetId);
        const posX = parseInt(targetCompany.style.left);
        const posY = parseInt(targetCompany.style.top);
        
        // 📲 Applies a wider zoom factor on mobile to accommodate smaller viewport constraints
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

// ⭐ Initialize the default zoom view calculation based on active screen resolution sizes
window.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.innerWidth <= 768;
  moveCamera(1000, 1000, isMobile ? 0.45 : 1.0);
});