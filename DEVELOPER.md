# Developer Guide — Voicebank Central

This document explains the architecture and how to extend the project safely.

---

## Architecture Overview

| Layer          | Responsibility                                      | File        |
|----------------|-----------------------------------------------------|-------------|
| Markup         | Semantic structure, accessibility, ARIA             | `index.html`|
| Presentation   | Layout, themes, circuit animation, responsive rules | `style.css` |
| Behavior       | Camera, character expansion, modal, particles       | `script.js` |
| Assets         | Character artwork                                   | `*/` folders|

There is **no build step**. Everything runs directly in the browser.

---

## Key Concepts

### 1. Company Hubs & Coordinate System

The entire map lives inside a 2000 × 2000 px virtual canvas (`.universe-canvas`).  
Each company is an absolutely positioned `<section class="galaxy-container">` with a fixed `top` / `left` value (the center of the hub).

The camera is simulated by applying a CSS `transform: translate(...) scale(...)` to the canvas.  
`moveCamera(x, y, zoom)` calculates the correct translation so that the point `(x, y)` ends up in the middle of the viewport.

### 2. Character Expansion

When a company is focused:

1. Existing character nodes are retracted (scale → 0 then removed).
2. Camera zooms to the hub coordinates.
3. After a short delay, `expandCharacters()` creates circular nodes arranged on a radius around the hub.
4. Each node is a `<button>` for accessibility and receives the character’s portrait as a CSS background image.

### 3. Theming

Selecting a company adds a class `bg-{companyId}` to the gradient layer and spawns floating particles tinted with the characters’ signature colors.

The circuit-board layer (`.circuit-layer`) is always present and uses pure CSS gradients + animated pseudo-elements for the traveling light packets.

### 4. Modal

The portrait viewer is a native `<dialog>`.  
It supports Escape key, backdrop click, and a close button.  
The border/glow color is driven by a CSS custom property `--modal-glow`.

---

## How to Add a New Company

1. **Create a folder** for the artwork (e.g. `NewCo/`).

2. **Add an entry in `companyData`** (inside `script.js`):

   ```js
   newco: [
     {
       name: "Character<br>Name",
       color: "#HEXCOLOR",          // signature color
       image: "NewCo/Char.png",     // relative path
       alignX: "center",            // background-position-x
       alignY: "10%",               // background-position-y
       scale: "220%"                // background-size
     },
     // ... more characters
   ]
   ```

3. **Add a section in `index.html`** inside `.universe-canvas`:

   ```html
   <section id="newco" class="galaxy-container" style="top: 800px; left: 1600px;" aria-labelledby="hub-newco">
     <button type="button" class="center-hub center-hub-newco" id="hub-newco" data-company="newco" aria-expanded="false">
       New Co.
     </button>
   </section>
   ```

4. **Add a navigation button** in the `<nav class="galaxy-nav">`:

   ```html
   <button type="button" class="nav-btn" data-target="newco">New Co.</button>
   ```

5. **Style the hub** in `style.css`:

   ```css
   .center-hub-newco {
     background: #1a2a3a;
     border-color: #00aaff;
     box-shadow: 0 0 20px rgba(0, 170, 255, 0.35);
   }
   .center-hub-newco:hover,
   .center-hub-newco:focus-visible {
     border-color: #88ddff;
     box-shadow: 0 0 32px rgba(0, 170, 255, 0.75);
   }
   ```

6. **Add a themed background** (optional but recommended):

   ```css
   .bg-newco {
     background: linear-gradient(135deg, #041018, #0a2030, #02080c);
     background-size: 300% 300%;
   }
   ```

7. Place the character images in the new folder and tune `alignX` / `alignY` / `scale` until the face is nicely framed inside the circular node.

---

## How to Adjust Character Framing

Each character object accepts three optional layout helpers:

| Property  | CSS equivalent              | Typical values          |
|-----------|-----------------------------|-------------------------|
| `alignX`  | `background-position-x`     | `center`, `40%`, `65%`  |
| `alignY`  | `background-position-y`     | `0%`–`25%` (face area)  |
| `scale`   | `background-size`           | `180%`–`330%`           |

Because many official artworks have different crop ratios, these values are tuned per character so the face stays centered inside the circular node.

---

## Mobile Considerations

- Touch targets are forced to at least 44–48 px.
- Navigation dock uses `flex-wrap` and larger padding on small screens.
- Safe-area insets (`env(safe-area-inset-*)`) are respected for notched devices.
- Zoom levels are reduced on mobile so the expanded characters still fit comfortably.
- `100dvh` is used to avoid the classic mobile browser address-bar jump.

---

## Performance Notes

- Character images can be large (some > 1 MB). Consider converting them to WebP or AVIF and serving responsive sizes if you deploy this publicly.
- The circuit animation and particles are pure CSS / lightweight DOM nodes — they run well even on mid-range phones.
- Prefer `prefers-reduced-motion` is respected; animations are disabled when the user requests reduced motion.

---

## Accessibility Checklist

- [x] Semantic landmarks (`header`, `main`, `nav`, `section`)
- [x] Buttons instead of clickable `<div>`s
- [x] `aria-expanded` on hubs
- [x] Native `<dialog>` with proper labeling
- [x] Visible focus styles
- [x] Escape key closes modal
- [x] Sufficient color contrast on text overlays

---

## Future Ideas (suggestions)

- Add a search / filter bar for characters
- Draw subtle animated connection lines between related companies
- Support pan-by-drag on the canvas (in addition to the nav buttons)
- Lazy-load character images only when a company is expanded
- Optional light ambient audio or soft UI sounds
- Multi-language character name toggles
- Export current view as an image

Feel free to open issues or PRs if you extend the project!
