"use client";

import * as THREE from "three";
import { SVGLoader, type SVGResult } from "three/examples/jsm/loaders/SVGLoader.js";

let cachedSvgResult: SVGResult | null = null;
let inflightPromise: Promise<SVGResult> | null = null;

function createShapesFromPath(path: SVGResult["paths"][number]): THREE.Shape[] {
  // Suppress Three.js r186 deprecation console.warn inside SVGLoader.createShapes
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("SVGLoader: createShapes() is deprecated")
    ) {
      return;
    }
    origWarn.apply(console, args);
  };
  try {
    const shapes = SVGLoader.createShapes(path);
    if (shapes.some((s) => s.holes.length > 0)) {
      return shapes;
    }
    return path.toShapes(true);
  } finally {
    console.warn = origWarn;
  }
}

export async function loadEmblemSvgResult(
  url = "/brand/emblem-copper.svg"
): Promise<SVGResult> {
  if (cachedSvgResult) {
    return cachedSvgResult;
  }
  if (!inflightPromise) {
    inflightPromise = fetch(url, { cache: "force-cache" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load ${url}: ${res.status}`);
        }
        return res.text();
      })
      .then((svgText) => {
        const loader = new SVGLoader();
        const parsed = loader.parse(svgText);
        cachedSvgResult = parsed;
        return parsed;
      });
  }
  return inflightPromise;
}

/**
 * Builds normalized `THREE.Shape[]` from `/brand/emblem-copper.svg`:
 * - Flips the Y axis (SVG Y points downward; 3D Y points upward)
 * - Centers on the 2D bounding box
 * - Scales to `targetHeight` world units (default `3.0`)
 * - Preserves counter-clockwise outer contours and clockwise hole contours
 *   so loops in the bowl and circle remain open after Y-inversion.
 */
export async function loadNormalizedEmblemShapes(
  targetHeight = 3.0,
  minPointDistance = 0.016
): Promise<THREE.Shape[]> {
  const data = await loadEmblemSvgResult();
  const rawShapes = data.paths.flatMap((path) => createShapesFromPath(path));

  const bbox = new THREE.Box2();
  for (const shape of rawShapes) {
    for (const pt of shape.getPoints(8)) {
      bbox.expandByPoint(pt);
    }
  }

  const size = new THREE.Vector2();
  const center = new THREE.Vector2();
  bbox.getSize(size);
  bbox.getCenter(center);

  const scale = targetHeight / Math.max(1, size.y);
  const minDist = minPointDistance * (targetHeight / 3.0);

  const samplePathAdaptive = (path: THREE.Shape | THREE.Path): THREE.Vector2[] => {
    const rawPts: THREE.Vector2[] = [];
    for (const curve of path.curves) {
      const len = curve.getLength() * scale;
      const divs = Math.max(1, Math.min(16, Math.ceil(len / (0.025 * (targetHeight / 3.0)))));
      const pts = curve.getPoints(divs);
      for (let i = 0; i < pts.length - 1; i++) {
        rawPts.push(
          new THREE.Vector2(
            (pts[i].x - center.x) * scale,
            -(pts[i].y - center.y) * scale
          )
        );
      }
    }
    const filtered: THREE.Vector2[] = [];
    for (const pt of rawPts) {
      if (
        filtered.length === 0 ||
        pt.distanceTo(filtered[filtered.length - 1]) >= minDist
      ) {
        filtered.push(pt);
      }
    }
    while (
      filtered.length > 3 &&
      filtered[0].distanceTo(filtered[filtered.length - 1]) < minDist
    ) {
      filtered.pop();
    }
    return filtered;
  };

  return rawShapes.map((shape) => {
    const outerPts = samplePathAdaptive(shape);
    if (THREE.ShapeUtils.isClockWise(outerPts)) {
      outerPts.reverse();
    }
    const normalizedShape = new THREE.Shape(outerPts);
    for (const hole of shape.holes) {
      const holePts = samplePathAdaptive(hole);
      if (!THREE.ShapeUtils.isClockWise(holePts)) {
        holePts.reverse();
      }
      normalizedShape.holes.push(new THREE.Path(holePts));
    }
    return normalizedShape;
  });
}
