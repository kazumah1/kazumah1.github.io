# Deep-Tech Portfolio (Next.js + R3F)

A production-ready personal portfolio with a restrained deep-tech aesthetic and an interactive 3D brain point cloud.

## Stack
- Next.js (App Router)
- TypeScript (strict)
- TailwindCSS
- React Three Fiber / three.js
- Zustand
- Framer Motion

## Setup
```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts
```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

## Content Editing (Single Source)
All editable site content lives in:

`/Users/kazuma/Desktop/main/cs/Projects/portfolio/src/content/siteContent.ts`

This file includes typed schemas and section/item data for:
- Experience
- Projects
- Leadership
- Interests
- About

### Add a new project
1. Open `src/content/siteContent.ts`.
2. Locate the comment `ADD NEW PROJECT HERE`.
3. Add a new object in `sections.projects.items` with a unique `id`.
4. Add an image to `public/images` and set `image: "/images/your-image.svg"`.

### Add a new experience entry
1. Open `src/content/siteContent.ts`.
2. Locate the comment `ADD NEW EXPERIENCE HERE`.
3. Add an object in `sections.experience.items` with a unique `id`.

No UI logic changes are needed for standard item additions.

## 3D Brain + Anchors
Core files:
- `public/assets/brain/cortex.glb`: cortical surface mesh source
- `src/three/brainSampling.ts`: MeshSurfaceSampler pipeline, outer-shell filtering, anchor mapping
- `src/three/BrainPoints.tsx`: sampled `THREE.Points` rendering, glow layers, rotation blending, physics updates
- `src/three/picking.ts`: projected-bound checks for physics activation

Anchors are mapped one-to-one with section IDs:
- experience
- projects
- leadership
- interests
- about

In development, press `D` to toggle brain debug:
- wireframe sampling bounds
- low-opacity source mesh overlay
- current sampled point count and outer-threshold

## Motion and Physics Tuning
All core tuning constants are centralized in:

`/Users/kazuma/Desktop/main/cs/Projects/portfolio/src/three/brainTuning.ts`

Includes:
- `YAW_MAX`, `PITCH_MAX`, `ROTATION_LERP`, `HOVER_FOCUS_BLEND`
- `SPRING_K`, `DAMPING`, `REPULSION_RADIUS`, `REPULSION_STRENGTH`, `MAX_DISPLACEMENT`
- `POINT_SIZE`, `POINT_COUNT`, `OUTER_THRESHOLD`, `FOG_NEAR`, `FOG_FAR`, `HALO_SCALE`, `HALO_OPACITY`, `BLENDING_MODE`

Each constant has inline comments describing how changing it affects motion.

## Interaction Model
- Edge nav + brain anchors both open section modal overlays.
- Modal supports in-modal list/detail navigation.
- `ESC` closes modal.
- Project tags (including `hackathon`) filter in place.
- Optional query sync supported: `/?section=projects&item=proj-id`.

## Accessibility + Reduced Motion
- Keyboard focus styles are included for interactive controls.
- `prefers-reduced-motion` disables physics and reduces rotation/transition intensity.
- Scrolling temporarily suppresses physics (250ms idle reset).

## Deployment
Deploy with any Next.js platform (Vercel recommended):

```bash
npm run build
npm run start
```

For Vercel, import the repo and use default Next.js settings.
