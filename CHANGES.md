# MacBook Landing — Changes & Instructions

This document records every change made to the project across two cleanup sessions,
explains why each change was necessary, and provides setup / development instructions.

---

## Table of Contents

1. [Project Setup](#1-project-setup)
2. [Session 1 — Bug Fixes & Code Cleanup](#2-session-1--bug-fixes--code-cleanup)
3. [Session 2 — Layout, Animation & Loader Improvements](#3-session-2--layout-animation--loader-improvements)
4. [File-by-File Reference](#4-file-by-file-reference)

---

## 1. Project Setup

### Requirements
- Node.js ≥ 18
- npm ≥ 9

### Install & Run
```bash
npm install
npm run dev        # development server → http://localhost:5173
npm run build      # production build  → dist/
npm run preview    # preview the build locally
npm run lint       # run ESLint
```

### Tech Stack
| Package | Purpose |
|---|---|
| React 19 + Vite 8 | UI framework & bundler |
| Tailwind CSS v4 | Utility-first CSS (via @tailwindcss/vite plugin) |
| GSAP 3 + @gsap/react | Scroll-triggered & timeline animations |
| @react-three/fiber + drei | 3-D canvas (MacBook models) |
| Three.js | Underlying WebGL renderer |
| Zustand | Global state (color, scale, texture) |
| react-responsive | Media-query hook |

### Font files (required in `/public/fonts/`)
```
regular.otf   medium.otf   semibold.otf   bold.otf
```

### 3-D models (required in `/public/models/`)
```
macbook-transformed.glb        ← used in Features scroll section
macbook-14-transformed.glb     ← 14" model in ProductViewer
macbook-16-transformed.glb     ← 16" model in ProductViewer
```

---

## 2. Session 1 — Bug Fixes & Code Cleanup

### 2.1 Broken image paths (`NavBar.jsx`, `Footer.jsx`)

**Problem:** `/public/logo.svg`, `./search.svg`, `./cart.svg` caused 404s.  
In Vite projects the `public/` folder is served from the root `/`. Relative paths like `./icon.svg`
are resolved from the component file location, not the public folder.

**Fix:**
```jsx
// Before
<img src="/public/logo.svg" />
<img src="./search.svg" />
<img src="./cart.svg" />

// After
<img src="/logo.svg" />
<img src="/search.svg" />
<img src="/cart.svg" />
```

---

### 2.2 Wrong GSAP import in `Performance.jsx`

**Problem:** `import {gsap} from "gsap"` — `gsap` is the **default** export; importing it as
a named export returns `undefined`, breaking all animations in that component.

**Fix:**
```js
// Before
import {gsap} from "gsap";

// After
import gsap from "gsap";
```

---

### 2.3 Typo in `useGSAP` dependency key — `Performance.jsx`

**Problem:** `{ scope: sectionRef, dependecies:[isMobile] }` — the key is `dependencies`
(not `dependecies`). The typo meant the GSAP animations never re-ran when `isMobile` changed.

**Fix:**
```js
// Before
{ scope: sectionRef, dependecies:[isMobile] }

// After
{ scope: sectionRef, dependencies:[isMobile] }
```

---

### 2.4 Invalid Three.js material property — `ModelSwitcher.jsx`

**Problem:** `child.material.transporter = true` — `transporter` is not a Three.js
`Material` property. The fade-in/out transition between the 14" and 16" models was broken
because Three.js never enabled alpha transparency on the materials.

**Fix:**
```js
// Before
child.material.transporter = true;

// After
child.material.transparent = true;
```
`transparent = true` enables alpha transparency on the material, allowing GSAP to animate
`material.opacity` from 0 → 1 (and back) for the model switch effect.

---

### 2.5 Tailwind class typo in `Footer.jsx`

**Problem:** `className="lex flex-col ..."` — the `f` in `flex` was missing, so the
flex layout was not applied to the footer links container.

**Fix:**
```jsx
// Before
<div className="lex flex-col ...">

// After
<div className="flex flex-col ...">
```

---

### 2.6 Invalid Tailwind width class in `Footer.jsx`

**Problem:** `w-80%` is not a valid Tailwind utility (Tailwind uses fractional or named sizes).

**Fix:**
```jsx
// Before
<hr className="... w-80%">

// After
<hr className="... w-4/5">
```

---

### 2.7 Semicolon inside Tailwind className string — `Footer.jsx`

**Problem:** `className=" underline cursor-pointer text-primary mx-0.5;"` — the trailing
semicolon was treated as a literal class name, causing no visible issue but polluting the DOM.

**Fix:** Removed the semicolon from the className value.

---

### 2.8 Typo in UI text — `ProductViewer.jsx`

**Problem:** "MacbookPro | Avalable in 14" & 16"…" contained two typos.

**Fix:**
```jsx
// Before
MacbookPro | Avalable in 14"

// After
MacBook Pro | Available in 14"
```

---

### 2.9 Missing `scene` in `useEffect` dependency array — `Macbook-16.jsx`

**Problem:** The `useEffect` that updates mesh colors had `[color]` as its dependency array
but also used the `scene` variable. Without `scene` in the deps, the effect would not re-run
if the scene reference changed (e.g., after a hot reload), which could silently skip color updates.

**Fix:**
```js
// Before
}, [color])

// After
}, [color, scene])
```

---

### 2.10 Removed unused imports across multiple files

| File | Import removed |
|---|---|
| `App.jsx` | `React` (not needed in React 17+), `SplitText` (never used) |
| `NavBar.jsx` | `React` |
| `Footer.jsx` | `React`, `navLinks` (only `footerLinks` was used) |
| `ProductViewer.jsx` | `OrbitControls` (commented-out code), `MacbookModel14` (handled by `ModelSwitcher`) |
| `StudioLights.jsx` | `Environment`, `Lightformer` (only in commented-out code) |
| `Performance1.jsx` | `performanceImages` (never referenced in JSX) |
| `ModelSwitcher.jsx` | `OrbitControls` (commented-out code) |

---

### 2.11 Irregular whitespace characters — `Footer.jsx`, `Performance.jsx`

**Problem:** ESLint `no-irregular-whitespace` flagged non-standard Unicode whitespace characters
(e.g., non-breaking spaces) embedded in JSX text nodes. These are invisible in editors but can
cause layout inconsistencies in certain browsers.

**Fix:** Replaced all irregular Unicode whitespace with regular ASCII spaces (`U+0020`).

---

### 2.12 Stale `eslint-disable` comment — `Macbook-16.jsx`

**Problem:** `{/* eslint-disable-next-line no-undef */}` was above a line that no longer
triggered the `no-undef` rule, making the directive a false positive warning.

**Fix:** Removed the stale disable comment.

---

## 3. Session 2 — Layout, Animation & Loader Improvements

### 3.1 Padding bug at full-HD (1920 px) — `index.css`, `Footer.jsx`

**Problem:** `#highlights` used `max-lg:px-5` which only applies padding below `1024 px`.
Between `1024 px` and the `2xl` container boundary (`1536 px`) — and also at full HD
(`1920 px`) where the container is centered at `1536 px` within the viewport — the section
content could be flush against the container walls with no breathing room.

The `footer` CSS rule and the Footer JSX className had the same `max-lg:px-5` issue.

**Fix:** Replaced `max-lg:px-5` with `px-5 2xl:px-0` in both places. This gives `20 px`
horizontal padding at all viewport sizes below `1536 px`, and lets the container's auto
margins provide the spacing at `1536 px+`.

```css
/* index.css — Before */
#highlights { @apply container mx-auto lg:py-40 max-lg:px-5; }
footer      { @apply container mx-auto py-7 max-lg:px-5; }

/* index.css — After */
#highlights { @apply container mx-auto lg:py-40 px-5 2xl:px-0; }
footer      { @apply container mx-auto py-7 px-5 2xl:px-0; }
```

```jsx
/* Footer.jsx — Before */
<section className="footer container mx-auto py-7 max-lg:px-5">

/* Footer.jsx — After */
<section className="footer container mx-auto py-7 px-5 2xl:px-0">
```

---

### 3.2 Highlights animation not visible — `Highlights.jsx`

**Problem:** The scroll trigger used `start: 'top top'` on desktop, which fires when the
**top** of `#highlights` reaches the **top** of the viewport — at that point the section has
already scrolled most of the way past. Users never saw the columns animate in because the
trigger fired too late.

On mobile, `start: 'bottom bottom'` was used, which fired as the section entered from below.
This was acceptable but inconsistent with the `toggleActions` logic.

**Fix:** Use `start: 'top 85%'` for all screen sizes (fires when the section top is 85% down
the viewport = just before it scrolls fully into view) and add `toggleActions: 'play none none reverse'`
so scrolling back re-plays the entrance animation.

```js
// Before
scrollTrigger: {
  trigger: '#highlights',
  start: isMobile ? 'bottom bottom' : 'top top',
},

// After
scrollTrigger: {
  trigger: '#highlights',
  start: 'top 85%',
  toggleActions: 'play none none reverse',
},
```

Also removed the now-unused `isMobile` / `useMediaQuery` from the component.

---

### 3.3 Showcase content animation not moving — `Showcase.jsx`

**Problem:** The content reveal used `.to('.content', { opacity: 1, y: 0 })`. The `y: 0`
animated FROM the element's current `y` transform (which was `0`) TO `0` — no movement.
The content appeared to fade in but had no slide-up motion.

Also, using the bare `.content` selector could theoretically match `#performance .content`
since `Showcase`'s `useGSAP` has no scope.

**Fix:** Changed to `fromTo` with `y: 40` as the starting offset, and scoped the selector
to `#showcase .content` to prevent cross-section interference.

```js
// Before
.to('.content', { opacity: 1, y: 0, ease: 'power1.in' })

// After
.fromTo('#showcase .content',
  { autoAlpha: 0, y: 40 },
  { autoAlpha: 1, y: 0, ease: 'power2.out' }
)
```

`autoAlpha` is used instead of `opacity` because it also manages `visibility`, preventing
the hidden element from consuming interaction events.

---

### 3.4 Page-load intro animation — `App.jsx`, `index.css`

**Added:** A `PageLoader` component that plays a GSAP timeline on first render and then
slides the overlay off-screen, revealing the page.

**Timeline sequence:**
1. Apple logo scales + fades in (`back.out` easing for a subtle bounce)
2. "MacBook Pro" text slides up and fades in
3. A thin white progress bar fills left → right
4. The entire overlay slides upward off the screen

**Key implementation details:**
- The overlay is `position: fixed; z-index: 9999` so it sits above everything.
- `pointer-events: none` prevents the overlay from blocking scroll during the slide-out.
- `useGSAP` with `scope: loaderRef` scopes all selectors to the overlay element, so
  `.pl-logo`, `.pl-title`, `.pl-bar-fill` only match children of the loader.
- The final `.to(el, { yPercent: -100 })` targets the DOM node directly (bypassing scope)
  to slide the whole overlay up.
- `pl-bar-fill` has `transform-origin: left center` in CSS so `scaleX` grows left-to-right.

**CSS classes added (index.css):**
```
.pl-overlay  .pl-logo  .pl-title  .pl-bar  .pl-bar-fill
```

---

### 3.5 3-D model loader animation — `Features.jsx`, `index.css`

**Problem:** While the MacBook 3-D model was loading inside the `<Canvas>`, the React
`<Suspense>` fallback showed a plain `<h2>Loading...</h2>`.

**Fix:** Replaced the fallback with a `ModelLoader` component — three bouncing dots with
staggered CSS animation, and a subtle "LOADING MODEL" label below.

**Implementation:**
- Uses the `@keyframes mlBounce` keyframe (defined in `index.css`) with `alternate` direction
  so each dot bounces up and back continuously.
- Each dot has a `0.15 s` staggered `animation-delay` for a wave effect.
- Inline styles are used intentionally: the component renders inside drei's `<Html>` portal,
  which lives inside the WebGL canvas. Tailwind classes are available but inline styles make
  the intent explicit for anything inside a 3-D context.
- `<Html center>` from drei is used so the loader is centered in the canvas regardless of
  camera or model position.

**CSS added (index.css):**
```css
@keyframes mlBounce {
  from { transform: translateY(0); }
  to   { transform: translateY(-9px); }
}
```

---

## 4. File-by-File Reference

| File | Changes |
|---|---|
| `src/App.jsx` | Removed unused `React`/`SplitText` imports; added `PageLoader` component with GSAP intro timeline |
| `src/index.css` | Fixed `#highlights` + `footer` padding (session 2); added page-loader CSS classes; added `@keyframes mlBounce` |
| `src/components/NavBar.jsx` | Fixed image paths (`/public/…` → `/…`); removed unused `React` import |
| `src/components/Hero.jsx` | No changes |
| `src/components/ProductViewer.jsx` | Fixed "Avalable" → "Available"; removed unused `OrbitControls` and `MacbookModel14` imports |
| `src/components/Showcase.jsx` | Fixed content animation: `.to` → `.fromTo` with `y: 40` start, scoped selector |
| `src/components/Performance.jsx` | Fixed GSAP named-import bug; fixed `dependecies` typo; fixed irregular whitespace |
| `src/components/Features.jsx` | Added `ModelLoader` component; replaced plain `Loading...` Suspense fallback |
| `src/components/Highlights.jsx` | Removed `useMediaQuery`; fixed scroll trigger start from `'top top'` → `'top 85%'`; added `toggleActions` |
| `src/components/Footer.jsx` | Fixed padding class; fixed `lex` → `flex`; fixed `w-80%` → `w-4/5`; fixed semicolon in className; removed unused imports; fixed `/public/logo.svg` path |
| `src/components/StudioLights.jsx` | Removed unused `Environment`/`Lightformer` imports |
| `src/components/tree/ModelSwitcher.jsx` | Fixed `transporter` → `transparent`; removed unused `OrbitControls` import |
| `src/components/models/Macbook-14.jsx` | No changes |
| `src/components/models/Macbook-16.jsx` | Added `scene` to `useEffect` deps; removed stale `eslint-disable` comment |
| `src/components/models/Macbook.jsx` | No changes |
| `src/constants/index.js` | No changes |
| `src/store/index.js` | No changes |
