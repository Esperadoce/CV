# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm start        # Dev server at http://localhost:28080 (opens browser)
npm run dev      # Same as start
```

No build step — ES6 modules are loaded directly by the browser. There is no transpilation, bundling, or CSS preprocessing.

## Deployment

- Deployed as a Docker container behind Nginx Proxy Manager (NPM) on a VPS managed via Portainer. **Do not modify `nginx.conf`** — it is not used in production.
- GitHub Actions (`.github/workflows/deploy.yml`) builds and pushes a Docker image to Docker Hub on push to `master`.
- Cache-bust CSS/JS by updating the `?v=YYYYMMDD-N` query param on the `<link>` and `<script>` tags in `index.html` when assets change.

## Architecture

Single-page application — one `index.html` with all sections (home, about, skills, experience, projects, contact).

**JavaScript** (`assets/js/`) — six ES6 modules, no framework:
- `main.js` — entry point; defers 3D init via `requestIdleCallback`, coordinates scroll events
- `3d-background.js` — Three.js r128 scene (particles + shapes); adapts particle count based on device memory
- `animations.js` — scroll reveal, sticky navbar, SVG skill-circle stroke animation, smooth scroll
- `loading.js` — loading screen with faked progress bar (120–900 ms)
- `utils.js` — modal open/close, CV download, easter egg
- `theme.js` — dark/light toggle, persisted to `localStorage`
- `lib/three.min.js` — bundled locally (no CDN)

**CSS** (`assets/css/`) — four files, plain CSS (no preprocessor):
- `main.css` — base, layout, canvas, footer
- `components.css` — all component styles
- `animations.css` — keyframe definitions and `.scroll-reveal*` classes
- `responsive.css` — breakpoints at 480 px, 768 px, 1024 px, 1600 px

**Data** — work experience is rendered dynamically from `assets/data/experience.json`; the static HTML in `index.html` is a fallback if the fetch fails.

**SEO files** — `sitemap.xml` and `robots.txt` live at the repo root and are served at `/`. Update `<lastmod>` in `sitemap.xml` whenever content changes.

## Key Details

- Canonical domain: `https://hicham.bouchikhi.net/`
- Structured data: JSON-LD `Person` + `WebSite` schemas in `index.html` at the bottom of `<body>`
- Scroll reveal system: add CSS class `scroll-reveal`, `scroll-reveal-left`, `scroll-reveal-right`, or `scale-reveal` to any element; `animations.js` adds `.visible` via IntersectionObserver
- Skill circles: `data-percent` attribute on the `<circle class="skill-circle-progress">` SVG element drives the stroke-dashoffset animation
