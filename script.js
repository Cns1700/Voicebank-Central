// --- 🎛️ Data Core: Company & Character Profiles ---
const companyData = {
  cfm: [
    { name: "Miku", color: "#39C5BB", image: "CFM/Miku.png" },
    { name: "Rin", color: "#FFB11B", image: "CFM/Rin.png" },
    { name: "Len", color: "#FFE41B", image: "CFM/Len.png" },
    { name: "Luka", color: "#FFB1BB", image: "CFM/Luka.png" },
    { name: "KAITO", color: "#3366CC", image: "CFM/KAITO.png" },
    { name: "MEIKO", color: "#CC0033", image: "CFM/MEIKO.png" }
  ],
  ahs: [
    { name: "Sora", color: "#60C0FF", image: "AHS/H-Sora.png" },
    { name: "Akari", color: "#FF9999", image: "AHS/Kizuna_Akari.png" },
    { name: "Moca", color: "#FFCC33", image: "AHS/Miyamai_Moca.png" },
    { name: "miki", color: "#FF3366", image: "AHS/SF-A2-miki-V4.png" },
    { name: "Maki", color: "#FF55BB", image: "AHS/Tsurumaki-Maki.png" },
    { name: "Yukari", color: "#A47CD6", image: "AHS/Yuzuki_Yukari.png" }
  ],
  kamitsukibaki: [
    { name: "COKO", color: "#FF007F", image: "Kamitsukibaki/COKO.png" },
    { name: "HARU", color: "#FF3333", image: "Kamitsukibaki/HARU.png" },
    { name: "KAFU", color: "#00FFFF", image: "Kamitsukibaki/KAFU.png" },
    { name: "RIME", color: "#FFAA00", image: "Kamitsukibaki/RIME.png" },
    { name: "SEKAI", color: "#9933FF", image: "Kamitsukibaki/SEKAI.png" }
  ],
  FrstPlace: [
    { name: "HIPPI", color: "#FF44aa", image: "1stPlace/HIPPI.jpg" },
    { name: "IA", color: "#FFCCCC", image: "1stPlace/IA.png" },
    { name: "ONE", color: "#FF8833", image: "1stPlace/ONE.png" }
  ]
};

// --- 🎯 DOM Element Selectors ---
const canvas = document.querySelector('.universe-canvas');
const galaxyOverlay = document.querySelector('.galaxy-overlay');
const allNavLinks = document.querySelectorAll('.nav-btn, .center-hub');

// --- 🔍 Camera Positioning Engine ---
function moveCamera(x, y, zoom) {
  const clampedZoom = Math.min(Math.max(zoom, 0.5), 3.0);
  canvas.style.transform = `translate(${-x}px, ${-y}px) scale(${clampedZoom})`;
}

// --- 🪐 Character Node Deployment Core ---
function expandCharacters(container) {
  const companyId = container.id;
  const characters = companyData[companyId] || [];
  const total = characters.length;
  const radius = 140;

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
      if (targetId === '#home') {
        moveCamera(0, 0, 1);
      } else {
        const targetCompany = document.querySelector(targetId);
        const posX = parseInt(targetCompany.style.left);
        const posY = parseInt(targetCompany.style.top);
        
        moveCamera(posX, posY, 2.5);
        
        setTimeout(() => {
          expandCharacters(targetCompany);
          galaxyOverlay.classList.add('active');
        }, 1000);
      }
    }, 500);
  });
});