# Voicebank Central

**Interactive network map of major Japanese voicebank IP holders**

Explore the constellation of Vocaloid, UTAU, and Synthesizer V related companies and their signature characters through a dynamic, zoomable, and installable interface.

**Live site:** [https://cns1700.github.io/Voicebank-Central/](https://cns1700.github.io/Voicebank-Central/)

---

## Features

- **Galaxy-style navigation** — Click any company hub (or use the bottom dock) to zoom in and expand its character roster
- **Free pan & drag** — Click/touch and drag the background to explore the map freely
- **Orbiting character nodes** — Expanded characters slowly orbit their company hub (smooth CSS animation)
- **Glowing connection lines** — Animated lines draw from the hub to each character when a company expands
- **Character portraits** — Click a node to view full artwork in an accessible modal
- **Dynamic theming** — Background gradient, circuit glow, and floating particles tint to the selected company
- **Circuit-board aesthetic** — Animated PCB-style traces with traveling light packets
- **PWA install support** — Install on desktop or phone (standalone window, offline shell cache)
- **Optimized WebP art** — Fast-loading character images with per-character face framing controls
- **Fully responsive** — Large touch targets and layout tuned for phones (portrait & landscape) and desktop
- **Accessible** — Semantic HTML, ARIA, native `<dialog>`, keyboard support (Escape closes modal), focus styles

### Included Companies

| Company              | Folder / ID   | Notable Characters                     |
|----------------------|---------------|----------------------------------------|
| Crypton Future Media | `cfm`         | Hatsune Miku, Rin, Len, Luka, KAITO, MEIKO |
| AHS                  | `ahs`         | Yukari, Akari, Maki, Sora, Moca, miki  |
| Kamitsubaki Studio   | `kamitsubaki` | KAFU, HARU, COKO, RIME, SEKAI          |
| 1st PLACE            | `frstplace`   | IA, ONE, HIPPI                         |
| Twindrill            | `twindrill`   | Kasane Teto                            |
| Internet Co.         | `internet`    | GUMI, Lily, Una, galaco, CUL, Rosa     |

---

## Quick start

Open `index.html` in any modern browser, or visit the live GitHub Pages link above.  
No build step — pure HTML, CSS, and vanilla JavaScript.

### Install as an app (PWA)

1. Open the site in Chrome, Edge, or Android Chrome.
2. Use **Install** in the address bar (desktop) or **Add to Home screen / Install app** (mobile).
3. The app opens in a standalone window and can work offline for the core shell after the first visit.

---

## Project Structure

```
Voicebank-Central/
├── index.html              # Semantic markup, PWA meta, SW registration
├── style.css               # Layout, themes, circuit animation, orbit CSS
├── script.js               # Camera, pan/drag, expansion, orbit group, modal
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service worker (offline shell cache)
├── icons/                  # App icons (SVG + PNG 192/512)
├── README.md               # This file (English)
├── README_JP.md            # Japanese version
├── DEVELOPER.md            # How to extend the project
├── AHS/                    # Character artwork (WebP)
├── CFM/
├── FrstPlace/
├── Internet/
├── Kamitsubaki/
└── Twindrill/
```

---

## Browser Support

- Chrome / Edge 90+
- Firefox 90+
- Safari 14+
- Mobile Safari & Chrome on iOS / Android

Uses modern CSS (`clamp`, `dvh`, `backdrop-filter`, custom properties, CSS animations) and the native `<dialog>` element. PWA install is best supported in Chromium-based browsers.

---

## Credits & Legal

This is a fan-made interactive map for educational and promotional purposes.  
All character artwork and company trademarks belong to their respective rights holders:

- Crypton Future Media, Inc.
- AHS Co., Ltd.
- Kamitsubaki Studio
- 1st PLACE Co., Ltd.
- Twindrill
- Internet Co., Ltd.

No commercial use is intended. Please respect each company’s IP guidelines.

**App icon:** Network diagram adapted from [Bootstrap Icons](https://icons.getbootstrap.com/) (MIT License), recolored to match the site theme.

---

## License

The code (HTML / CSS / JS) is released under the MIT License.  
Character images remain the property of their respective owners and are not covered by this license.
