# Naqsh Website — Real-Time 3D Implementation (`3D-IMPLEMENTATION.md`)

This document describes the architecture, scene-by-scene parameters, scroll-progress mapping, tuning knobs, progressive 2D fallbacks, and verification results for the real-time Three.js / React Three Fiber (`@react-three/fiber` + `@react-three/drei`) scenes across the Naqsh website.

---

## 1. Global Architecture & Lifecycle Rules (`STEP 1`)

### 1.1 Shared Progress Store (`src/lib/sceneProgress.ts` & `src/lib/scene-progress.ts`)
- Exports a mutable object `sceneProgress = { vision: 0, approach: 0, cta: 0, portfolio: 0 }` plus `subscribe()`, `setSceneProgress()`, `getSceneProgress()`, and `useSceneProgress()`.
- `ScrollTrigger` `onUpdate` callbacks in `src/components/motion/ScrollEffects.tsx` write normalized progress (`0` to `1`) into `sceneProgress.vision`, `sceneProgress.approach`, `sceneProgress.cta`, and `sceneProgress.portfolio` (as well as `--scene-progress` CSS custom properties).
- Every 3D scene reads `sceneProgress.<scene>` directly inside `useFrame()` without triggering React state updates or re-renders.

### 1.2 Capability Gate & Viewport Lifecycle (`src/lib/useCan3D.ts`)
- **`useCan3D(minWidth)`**:
  - Returns `false` when:
    - `prefers-reduced-motion: reduce` is enabled
    - `navigator.connection?.saveData === true`
    - `navigator.hardwareConcurrency < 4`
    - `navigator.deviceMemory < 4` (when available)
    - `window.innerWidth < minWidth` (`1024px` for Copper Emblem & Gift Box; `768px` for Wax Seal)
    - A cached WebGL2 context probe (`checkWebGL2Support()`) fails
- **`useSceneViewportLifecycle(wrapperRef, can3D)`**:
  - Uses three `IntersectionObserver` thresholds on each scene wrapper:
    1. **Mount (`rootMargin: "600px 0px"`)**: Dynamically mounts the `next/dynamic({ ssr: false })` canvas when the wrapper enters within `600px` of the viewport.
    2. **Visibility (`rootMargin: "40px 0px"`)**: Switches `<Canvas frameloop>` between `"always"` (when visible) and `"never"` (when off-screen) so off-screen scenes consume zero GPU/CPU frame budget.
    3. **Unmount (`rootMargin: "150% 0px"`)**: Unmounts the canvas when the wrapper scrolls more than `1.5` screens away from the viewport, ensuring at most **2 WebGL contexts** are ever alive simultaneously.
- **Full GPU Disposal (`src/components/three/StudioLighting.tsx`)**:
  - On unmount, traverses the Three.js `scene` to `.dispose()` all geometries, materials, and textures, clears `gl.renderLists`, and calls `gl.forceContextLoss()`.

### 1.3 Renderer & Zero-Network Lighting (`src/components/three/StudioLighting.tsx`)
- **Canvas Config**:
  - `dpr={[1, 1.5]}`
  - `gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}`
  - `THREE.ACESFilmicToneMapping` (`toneMappingExposure = 1.08`), `THREE.SRGBColorSpace` output, transparent background.
  - No post-processing and no dynamic shadow maps; grounding uses single-frame low-resolution `@react-three/drei` `<ContactShadows resolution={256} frames={1} />`.
- **Procedural Studio Environment (Zero Network Requests)**:
  - Uses `<Environment resolution={128} frames={1}>` with three `<Lightformer>` children in strict brand tokens:
    1. Upper-left large soft Ivory (`#F7F1E7`) rectangle (`scale={[8.5, 6.5, 1]}`, `position={[-4.5, 4.2, 4.0]}`, `intensity={2.6}`)
    2. Right warm Copper (`#AB6C49`) strip (`scale={[1.8, 5.8, 1]}`, `position={[4.8, 0.8, 2.6]}`, `intensity={2.2}`)
    3. Bottom dim Khaki (`#C0A48E`) fill (`scale={[7.5, 4.5, 1]}`, `position={[0, -4.4, 1.8]}`, `intensity={1.0}`)
  - Plus one soft `<directionalLight position={[-2.6, 4.2, 4.8]} intensity={1.35} color="#F7F1E7" />`.
- **Accessibility**:
  - Every scene wrapper has `aria-hidden="true"`, `tabIndex={-1}`, and `pointer-events: none`.
  - All copy remains in semantic DOM elements.
  - Pointer tilt uses a single shared passive `window` `pointermove` listener (`useWindowPointerTilt()`), automatically disabled on coarse/touch pointers.

---

## 2. Scene 1: Copper Emblem (`Vision & Mission`)

### 2.1 Files
- Wrapper & 2D Fallback: `src/components/three/EmblemScene.tsx`
- Dynamic R3F Canvas: `src/components/three/EmblemSceneCanvas.tsx`
- SVG Shape Normalizer: `src/components/three/emblemShapes.ts`
- Section Integration: `src/components/sections/VisionMission.tsx`
- Poster Asset: `public/3d/emblem.webp`

### 2.2 Geometry & Material Parameters
- **SVG Source**: `/brand/emblem-copper.svg` parsed via `SVGLoader` (`SVGLoader.createShapes` / `path.toShapes(true)`).
- **Winding & Normalization (`loadNormalizedEmblemShapes(3.0, 0.016)`)**:
  - Flips the Y axis (`y -> -y`), centers on the 2D bounding box, and scales to a height of **`3.0` world units**.
  - Enforces counter-clockwise winding on outer contours and clockwise winding on inner hole contours (`subPath[7]`) so the counter-loops in the bowl and circle remain open after Y-inversion.
  - Adaptively samples curves (`minPointDistance = 0.016`) so consecutive vertices never cluster closer than `bevelSize` (`0.01`), preventing bevel self-intersections while keeping vertex count compact (`~45,984` vertices).
- **`ExtrudeGeometry` Config**:
  - `depth`: `0.14`
  - `bevelEnabled`: `true`
  - `bevelThickness`: `0.012`
  - `bevelSize`: `0.01`
  - `bevelSegments`: `3`
  - `curveSegments`: `16`
- **Material (`MeshPhysicalMaterial`)**:
  - `color`: `#AB6C49` (Copper)
  - `metalness`: `1.0`
  - `roughness`: `0.32`
  - `clearcoat`: `0.25`
  - `clearcoatRoughness`: `0.35`
  - `envMapIntensity`: `1.2`
- **Ambient Cloud (`InstancedMesh`)**:
  - `36` thin extruded diamond instances (`depth: 0.012`, `bevelSize: 0.002`) distributed in a golden-angle spiral cloud at depths `z ∈ [-0.7, +0.7]`, colored in Copper (`#AB6C49`) and Khaki (`#C0A48E`).

### 2.3 Scroll & Pointer Mapping
- **Idle Float**: `y = Math.sin((elapsed * 2π) / 6.0) * 0.08` (`6s` period, `0.08` units amplitude).
- **Scroll Rotation**: `sceneProgress.vision` (`0 -> 1` across the `200vh` desktop pin) maps to `rotation.y` from **`-22°` to `+22°`**.
- **Pointer Tilt**: Up to **`±8°`** on X and Y, damped via `THREE.MathUtils.damp(..., 4.2, dt)`.
- **Entry Scale**: Damps from `0.94 -> 1.0` on mount.
- **Diamond Cloud**: Drifts slowly with per-instance phase offsets and counter-parallaxes against pointer movement proportional to depth.

### 2.4 How to Tune
- Adjust `depth`, `bevelThickness`, or `bevelSize` in `src/components/three/EmblemSceneCanvas.tsx` (`CopperEmblemActors`).
- Adjust `DIAMOND_COUNT` (default `36`) or spiral radius in `createDiamondSeeds()`.
- Adjust scroll rotation range (`-22 + progress * 44`) or pointer tilt cap (`8` degrees) inside `useFrame`.

### 2.5 Fallback Behavior
- Active below `1024px`, under `prefers-reduced-motion: reduce`, or when WebGL2 is unavailable: renders `/brand/emblem-copper.svg` with a warm copper drop shadow, slow `6s` CSS float (`@keyframes emblem-float-slow`), and 4 static copper/khaki diamond accents, plus `public/3d/emblem.webp` (`< 60 KB`) as the instant first paint before the `0.6s` canvas crossfade.

---

## 3. Scene 2: Wax Seal (`CTA Band` & `Inquiry Form Success`)

### 3.1 Files
- Reusable Component & Fallback: `src/components/three/WaxSeal3D.tsx`
- Dynamic R3F Canvas & Actor: `src/components/three/WaxSealSceneCanvas.tsx`
- Section Integrations: `src/components/sections/CTABand.tsx`, `src/components/form/FormSuccess.tsx`, `src/components/form/InquiryForm.tsx`
- Poster Asset: `public/3d/seal.webp`

### 3.2 Geometry & Material Parameters
- **Organic Wax Disc (`buildWaxSealGeometries`)**:
  - Circle (`baseRadius = 1.06`, `96` segments) perturbed by low-frequency harmonic noise (`3%–5%`: `0.024 sin(5θ) + 0.015 cos(7θ) + 0.009 sin(11θ)`), extruded with `depth: 0.11`, `bevelThickness: 0.026`, `bevelSize: 0.024`, `bevelSegments: 4`.
- **Raised Rim & Recessed Center Well**:
  - Perturbed annular ring (`outerRadius = 0.97`, `innerRadius = 0.74`) extruded `depth: 0.042` on the front face (`z = 0.048`), framing a recessed Chestnut-shaded well (`z = 0.058`).
- **Embossed Emblem on Top**:
  - Normalized emblem shapes (`height = 1.18` units) extruded with `depth: 0.03`, `bevelThickness: 0.006`, `bevelSize: 0.005`, `bevelSegments: 2`, positioned on the center face (`z = 0.068`).
- **Material (`MeshPhysicalMaterial`)**:
  - `color`: `#B64F3E` (Terracotta)
  - `roughness`: `0.45`
  - `clearcoat`: `0.3`
  - `clearcoatRoughness`: `0.5`
  - `sheen`: `0.3`
  - `sheenColor`: `#7F3021` (Chestnut)
  - Shared across both the wax disc/rim and the embossed emblem.

### 3.3 Stamp Timeline & Props
- **Component API**: `<WaxSeal3D trigger={boolean | number} size={number} className={string} />`
- **GSAP Stamp Timeline** (plays once when the CTA band enters the viewport and on every successful form submission via `submitCount`):
  1. **Start**: `y = +1.2`, `scale = 1.15`, `rotateZ = -6°`, `opacity = 0`.
  2. **Fall (`0.00s – 0.50s`, `power3.in`)**: Drops to `y = 0`, `rotateZ = 0°`, `opacity = 1`.
  3. **Impact Squash (`0.50s – 0.62s`, `0.12s`)**: Squashes `scaleY` to `0.9` and `scaleXZ` to `1.04`; `ContactShadows` darken (`opacity -> 0.52`).
  4. **Settle (`0.62s – 1.27s`, `elastic.out(1, 0.6)`)**: Settles back to `scale = 1.0`.
  5. **Expanding Ring (`0.50s – 1.20s`, `0.7s`)**: Thin copper ring mesh (`ringGeometry`) expands from `0.96 -> 1.56` and fades out (`opacity: 0.72 -> 0`).
  6. **Camera Shake (`0.50s – 0.65s`, `0.15s`)**: Subtle `0.01`-unit camera oscillation.

### 3.4 Fallback Behavior
- Active below `768px`, under `prefers-reduced-motion: reduce`, or without WebGL2: renders an organic SVG Terracotta/Chestnut wax disc with the **Ivory Emblem (`/brand/emblem-ivory.svg`)** clearly centered on top and a CSS stamp settle transition (`scale(1.12) rotate(-6deg) -> scale(1) rotate(0deg)`).

---

## 4. Scene 3: Gift Box (`Our Approach` Pinned Section)

### 4.1 Files
- Wrapper & 2D Fallback: `src/components/three/GiftBoxScene.tsx`
- Dynamic R3F Canvas: `src/components/three/GiftBoxSceneCanvas.tsx`
- Section Integration: `src/components/sections/ApproachSection.tsx`
- Poster Asset: `public/3d/box.webp`

### 4.2 Procedural Geometry & Palette Materials
Built purely procedurally with `@react-three/drei` `<RoundedBox>` and Three.js primitives:
- **Box Body**: `2.4 × 1.1 × 1.8`, `radius: 0.06` in Matte Black `#000000` (`roughness: 0.7`) with a recessed Chestnut `#7F3021` inner liner (`2.26 × 0.96 × 1.66`, `roughness: 0.65`).
- **Box Lid**: `2.5 × 0.32 × 1.9`, `radius: 0.05` in Satin Ivory-deep `#EFE5DA` (`roughness: 0.5`).
- **Crossing Ribbons**: Two thin crossing `<RoundedBox>` bands in Sage `#789675` (`roughness: 0.48`, `sheen: 0.38`, `sheenColor: "#C0A48E"`) over the lid and down the sides, topped with a flat tailored bow and Copper `#AB6C49` diamond clasp.
- **Stand-In Contents**:
  1. **Notebook**: Terracotta `#B64F3E` (`0.84 × 0.13 × 1.08`, `radius: 0.025`) with Ivory `#F7F1E7` page block.
  2. **Tumbler**: Copper `#AB6C49` cylinder (`rTop: 0.23, rBottom: 0.20, h: 0.84`) with Khaki `#C0A48E` grip ring and Black lid.
  3. **Pouch**: Pine `#145240` rounded form (`0.76 × 0.20 × 0.54`, `radius: 0.065`) with Copper zip pull.
  4. **Card + Miniature Wax Seal**: Ivory `#F7F1E7` card (`0.76 × 0.036 × 0.54`) that receives a progress-driven `WaxSealActor` stamp during Step 03 (*Customize*).
  5. **Pen**: Black `#000000` cylinder (`r: 0.038, h: 0.88`) with Copper `#AB6C49` cone tip and center band.

### 4.3 Scroll-Progress Mapping (`sceneProgress.approach`, damped with `THREE.MathUtils.damp`)
| Progress Range | Step | 3D Choreography |
| :--- | :--- | :--- |
| **`0.00 – 0.25`** | `01 Understand` | Closed box rotates slowly from `-25°` to `-10°` Y; camera (`fov: 32`) eases in (`distance: 6.25 -> 5.93`). |
| **`0.25 – 0.50`** | `02 Curate` | Lid lifts (`y: +1.7`, `rotateX: +14°`, `z: -0.52`); the 5 items rise one by one (`stagger: 0.038–0.06` of progress) into an elevated arrangement above the Chestnut liner. |
| **`0.50 – 0.75`** | `03 Customize` | Elevated arrangement tightens horizontally toward the center; miniature `WaxSealActor` stamps onto the Ivory card; Sage ribbon tightens. |
| **`0.75 – 1.00`** | `04 Deliver` | Items drop smoothly back into the box; lid closes and ribbon wraps; closed box rotates to a front-three-quarter view (`+18°` Y), slides right (`+0.26`), and subtly fades (`opacity: 0.86`). |

### 4.4 Fallback Behavior
- Active below `1024px`, under `prefers-reduced-motion: reduce`, or without WebGL2: renders a layered isometric SVG illustration of the open Naqsh gift box (Black body, Chestnut liner, Ivory-deep lid, Sage ribbons, and all 5 palette items) alongside `public/3d/box.webp` (`< 60 KB`).

---

## 5. 2.5D Card Tilt & Orange "Explore" Cursor (`STEP 5`)

- **2.5D Pointer Tilt (`src/components/motion/MotionChrome.tsx` & `src/app/globals.css`)**:
  - Applied to all collection cards (`.collection-gallery-item`) and product cards (`.product-tile`).
  - Uses `transform: perspective(900px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg))` capped at **`±6°`**, with a `0.4s cubic-bezier(0.22, 1, 0.36, 1)` ease-out return and a soft radial Ivory/Copper glare (`::after`) following `(--glare-x, --glare-y)`.
  - Base identity individual transforms (`translate: 0px; rotate: 0deg; scale: 1;`) preserve stacking context stability.
  - Enabled strictly under `@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)`.
- **Orange `"Explore"` Cursor (`src/components/motion/MotionChrome.tsx`)**:
  - Restored the `64×64px` Copper (`#AB6C49`) circular cursor with Ivory `"Explore"` label both while scrolling (`wheel` / `scroll` with `280ms` idle decay) and when hovering `[data-cursor-label="Explore"]` media/cards.
