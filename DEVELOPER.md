# Developer Guide — Voicebank Central

Architecture notes and how to extend the project safely.

---

## Architecture Overview

| Layer        | Responsibility                                         | File(s)                    |
|--------------|--------------------------------------------------------|----------------------------|
| Markup       | Semantic structure, accessibility, PWA meta            | `index.html`               |
| Presentation | Layout, themes, circuit animation, CSS orbit           | `style.css`                |
| Behavior     | Camera, pan/drag, expansion, connection lines, modal   | `script.js`                |
| PWA          | Installability, offline shell                          | `manifest.webmanifest`, `sw.js`, `icons/` |
| Assets       | Character artwork (WebP)                               | `CFM/`, `AHS/`, etc.       |

There is **no build step**. Everything runs directly in the browser.

---

## Key Concepts

### 1. Company hubs & coordinate system

The map lives inside a 2000 × 2000 px virtual canvas (`.universe-canvas`).  
Each company is an absolutely positioned `<section class="galaxy-container">` with fixed `top` / `left` (hub center).

Camera state is stored in a `camera` object (`x`, `y`, `zoom`).  
`applyCamera()` / `moveCamera()` set `transform: translate(...) scale(...)` on the canvas so the target point sits in the viewport center.

Hub positions are also listed in `companyPositions` in `script.js` for navigation and consistency.

### 2. Pan & drag

Pointer events on `#galaxy-viewport` allow free exploration:

- `pointerdown` / `move` / `up` update `camera.x` / `camera.y` (screen delta ÷ zoom)
- Interactive elements (hubs, nodes, nav, modal) are ignored so clicks still work
- Text selection is suppressed while dragging

### 3. Character expansion, connection lines, and orbit

When a company is focused:

1. Previous nodes / orbit groups are removed.
2. Camera zooms to the hub.
3. `expandCharacters()` creates:
   - An `.orbit-group` wrapper (CSS `orbitSpin` animation)
   - SVG connection lines from hub center to each character (draw-in via `stroke-dashoffset`)
   - Character `<button>` nodes with WebP backgrounds and framing CSS variables
4. After the expand transition, nodes get `.is-orbiting` so they **counter-rotate** (`orbitCounter`) and faces stay upright while the group spins.

Orbit is **pure CSS** (GPU-friendly). Duration is controlled by `--orbit-duration` in `:root` (default `48s`).

### 4. Theming

Selecting a company:

- Adds `bg-{companyId}` to the gradient layer
- Spawns floating particles tinted with character colors
- Tints the circuit glow (`--circuit-glow`) toward the first character color

### 5. Modal

Native `<dialog class="modal-overlay">`.  
Shown only with the `[open]` attribute (`showModal()`).  
Supports Escape, backdrop click, close button, and focus return.

### 6. PWA

- `manifest.webmanifest` — name, colors, icons, `display: standalone`
- `sw.js` — caches the app shell (HTML/CSS/JS/manifest/icons); network-first for other assets with cache fallback
- Icons under `icons/` — SVG + PNG 192 / 512 (and apple-touch-icon)
- Registration runs on `window.load` in `index.html`

Icon art is based on Bootstrap Icons (MIT), recolored cyan on `#05050a`.

---

## Character framing controls

Each entry in `companyData` may include:

| Property    | Maps to                         | Typical values        |
|-------------|---------------------------------|-----------------------|
| `image`     | Modal portrait URL              | `CFM/Miku.webp`       |
| `nodeImage` | Node circle URL (often same)    | same as `image`       |
| `alignX`    | `background-position-x`         | `center`, `40%`, …    |
| `alignY`    | `background-position-y`         | `0%`–`25%` (face)     |
| `scale`     | `background-size`               | `150%`–`200%`         |
| `color`     | Glow / line / particle tint     | `#39C5BB`             |

CSS variables on the node: `--char-x`, `--char-y`, `--char-scale`, `--glow-color`.

Tune these locally (e.g. VS Code Live Server) until faces sit well inside the circle.

---

## How to add a new company

1. **Folder** for artwork (e.g. `NewCo/`) with WebP files.

2. **`companyData` entry** in `script.js`:

   ```js
   newco: [
     {
       name: "Character<br>Name",
       color: "#HEXCOLOR",
       image: "NewCo/Char.webp",
       nodeImage: "NewCo/Char.webp",
       alignX: "center",
       alignY: "10%",
       scale: "180%"
     }
   ]
   ```

3. **`companyPositions`** entry with hub coordinates matching the HTML.

4. **Section in `index.html`** inside `.universe-canvas`:

   ```html
   <section id="newco" class="galaxy-container" style="top: 800px; left: 1600px;" aria-labelledby="hub-newco">
     <button type="button" class="center-hub center-hub-newco" id="hub-newco"
             data-company="newco" aria-expanded="false" aria-controls="newco">
       New Co.
     </button>
   </section>
   ```

5. **Nav button** in `.galaxy-nav`:

   ```html
   <button type="button" class="nav-btn" data-target="newco">New Co.</button>
   ```

6. **Hub styles** + optional `.bg-newco` gradient in `style.css`.

7. Tune framing; hard-refresh and test pan, expand, orbit, and modal.

---

## Mobile notes

- Minimum touch targets ~44–48 px; nav uses CSS Grid on small widths
- Safe-area insets for notched devices
- Lower zoom levels on mobile so expanded nodes fit
- `100dvh` avoids mobile browser chrome jump
- `touch-action: none` on the viewport enables pointer-based pan without page scroll

---

## Performance

- Character art is WebP (much smaller than original PNGs)
- Orbit and circuit lights are CSS-only (no per-frame JS for positions)
- Particles are limited DOM nodes with CSS animations
- `prefers-reduced-motion: reduce` disables non-essential animation
- Service worker caches the shell; large character images are cached after first fetch when same-origin

---

## Accessibility checklist

- [x] Semantic landmarks (`header`, `main`, `nav`, `section`)
- [x] Buttons instead of clickable divs
- [x] `aria-expanded` on hubs
- [x] Native `<dialog>` with labeling and focus management
- [x] Visible focus styles
- [x] Escape closes modal
- [x] Drag does not steal clicks from hubs/nodes
- [x] Text selection disabled on the map during pan

---

## PWA checklist

- [x] `manifest.webmanifest` linked from HTML
- [x] Icons: SVG + PNG 192 / 512 under `icons/`
- [x] `theme-color` / apple web app meta
- [x] Service worker registered on load
- [x] HTTPS (GitHub Pages)

To refresh a cached shell after deploys, bump `CACHE_NAME` in `sw.js` (e.g. `voicebank-central-v2`).

---

## Future ideas

- Search / filter characters by name
- Optional short voice samples in the portrait modal
- Multi-language name toggle (EN / JP)
- Export current view as an image
- Richer offline caching strategy for all character WebPs

Issues and PRs are welcome if you extend the project.
