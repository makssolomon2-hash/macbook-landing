

# MacBook Pro Landing Page




A modern, animated **MacBook Pro product landing page** built with **React**, **Vite**, **Tailwind CSS**, **GSAP**, and **Three.js**.

The project recreates an Apple-style product page experience with smooth scroll animations, video sections, interactive 3D MacBook models, color and size controls, feature highlights, performance sections, and responsive layouts.

## Preview

This is a frontend-only project. After running it locally, open the development URL shown in your terminal, usually:

```bash
http://localhost:5173
```

## Features

* Apple-inspired MacBook Pro landing page
* Hero section with video background
* Interactive 3D MacBook product viewer
* 14-inch and 16-inch model size switching
* Color switching for the MacBook model
* Scroll-based animations with GSAP and ScrollTrigger
* 3D rendering with Three.js and React Three Fiber
* Responsive layout for desktop, tablet, and mobile screens
* Feature sections with animated content and video textures
* Performance and highlight sections
* Clean component-based React structure

## Tech Stack

* **React** — UI library
* **Vite** — fast development server and build tool
* **Tailwind CSS** — styling
* **GSAP** — animations and scroll effects
* **Three.js** — 3D graphics
* **React Three Fiber** — React renderer for Three.js
* **Drei** — helpers for React Three Fiber
* **Zustand** — small state-management library
* **React Responsive** — responsive media queries in React
* **ESLint** — code linting

## Project Structure

```bash
macbook-landing/
├── public/
│   ├── videos/          # Hero and feature videos
│   ├── *.png            # Images used in sections
│   └── *.svg            # Icons and visual assets
├── src/
│   ├── components/       # Main React components
│   │   ├── models/      # 3D MacBook model components
│   │   └── tree/        # 3D model switching logic
│   ├── constants/       # Navigation, features, footer links, image data
│   ├── store/           # Zustand store for color, size, and texture state
│   ├── App.jsx          # Main app layout
│   └── main.jsx         # React entry point
├── package.json
├── vite.config.js
└── README.md
```

> Note: the folder name is `components` in the project.

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/makssolomon2-hash/macbook-landing.git
```

### 2. Go into the project folder

```bash
cd macbook-landing-2
```

### 3. Install dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

Or using pnpm:

```bash
pnpm install
```

### 4. Run the development server

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

Using pnpm:

```bash
pnpm dev
```

Then open the local URL shown in the terminal.

## Available Scripts

### Run in development mode

```bash
npm run dev
```

Starts the Vite development server with hot reload.

### Build for production

```bash
npm run build
```

Creates an optimized production build inside the `dist/` folder.

### Preview production build locally

```bash
npm run preview
```

Runs a local preview of the production build.

### Run ESLint

```bash
npm run lint
```

## Notes

* This project is frontend-only and does not require a backend server.
* No environment variables are required by default.
* Large video and 3D assets can affect loading performance, so optimize assets before deploying publicly.
* For best results, use a modern browser with WebGL support.

<img width="2560" height="1440" alt="Screenshot 2026-07-05 194500" src="https://github.com/user-attachments/assets/bbac7e02-c59c-436d-9439-6f02007515b1" />
<img width="2560" height="1440" alt="Screenshot 2026-07-05 194606" src="https://github.com/user-attachments/assets/d106988d-f94e-4be1-8f6c-28ec8a3abcba" />

Maks Solomon.
