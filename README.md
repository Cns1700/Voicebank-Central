# Voicebank Central

**Interactive network map of major Japanese voicebank IP holders**

Explore the constellation of Vocaloid, UTAU, and Synthesizer V related companies and their signature characters through a dynamic, zoomable interface.

---

## Live Demo

Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).  
No build step required — pure HTML, CSS, and vanilla JavaScript.

---

## Features

- **Galaxy-style navigation** — Click any company hub to zoom in and expand its character roster
- **Character portraits** — Click a character node to view the full artwork in a modal
- **Dynamic theming** — Background gradient and floating particles change color to match the selected company
- **Circuit-board aesthetic** — Subtle animated PCB-style traces with traveling light packets
- **Fully responsive** — Optimized touch targets and layout for phones (portrait & landscape) and desktop
- **Accessible** — Semantic HTML, proper ARIA attributes, keyboard support (Escape closes modal), focus styles

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

## Project Structure

```
Voicebank-Central/
├── index.html          # Semantic markup & structure
├── style.css           # All styling, responsive rules, circuit animation
├── script.js           # Camera, expansion logic, modal, particles
├── README.md           # This file (English)
├── README_JP.md        # Japanese version
├── DEVELOPER.md        # How to extend the project
├── AHS/                # Character artwork
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

Uses modern CSS (`clamp`, `dvh`, `backdrop-filter`, CSS custom properties) and the native `<dialog>` element. Progressive enhancement is intentional.

---

## Credits & Legal

This is a fan-made interactive map created for educational and promotional purposes.  
All character artwork and company trademarks belong to their respective rights holders:

- Crypton Future Media, Inc.
- AHS Co., Ltd.
- Kamitsubaki Studio
- 1st PLACE Co., Ltd.
- Twindrill
- Internet Co., Ltd.

No commercial use is intended. Please respect the original IP guidelines of each company.

---

## License

The code (HTML / CSS / JS) is released under the MIT License.  
Character images remain the property of their respective owners and are not covered by this license.
