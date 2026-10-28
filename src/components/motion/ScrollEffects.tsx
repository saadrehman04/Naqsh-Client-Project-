"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "./MotionProvider";
import { setSceneProgress } from "@/lib/scene-progress";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const numberAttr = (element: HTMLElement, name: string, fallback: number) => {
  const value = Number.parseFloat(element.dataset[name] ?? "");
  return Number.isFinite(value) ? value : fallback;
};

interface SplitResult {
  original: string;
  targets: HTMLElement[];
  preSplit: boolean;
}

interface PendingLineItem {
  element: HTMLElement;
  original: string;
  words: HTMLElement[];
}

function splitWordsWritePass(
  items: Array<{ element: HTMLElement; mode: "lines" | "words" }>
): {
  results: Map<HTMLElement, SplitResult>;
  lineQueue: PendingLineItem[];
} {
  const results = new Map<HTMLElement, SplitResult>();
  const lineQueue: PendingLineItem[] = [];

  for (const { element, mode } of items) {
    const original = element.innerHTML;
    if (mode === "lines") {
      const existingLines = Array.from(
        element.querySelectorAll<HTMLElement>(".motion-line-inner")
      );
      if (existingLines.length > 0) {
        results.set(element, {
          original,
          targets: existingLines,
          preSplit: true,
        });
        continue;
      }
    }

    const label = element.textContent?.replace(/\s+/g, " ").trim() ?? "";
    if (!label) {
      results.set(element, { original, targets: [], preSplit: false });
      continue;
    }

    const words = label
      .split(" ")
      .filter(Boolean)
      .map((word) => {
        const span = document.createElement("span");
        span.className = "motion-word";
        span.setAttribute("aria-hidden", "true");
        span.textContent = word;
        return span;
      });

    element.setAttribute("aria-label", label);
    element.replaceChildren(
      ...words.flatMap((word, index) =>
        index ? [document.createTextNode(" "), word] : [word]
      )
    );

    if (mode === "words") {
      results.set(element, { original, targets: words, preSplit: false });
    } else {
      lineQueue.push({ element, original, words });
    }
  }

  return { results, lineQueue };
}

function splitLinesMeasureAndWrapPass(
  lineQueue: PendingLineItem[],
  results: Map<HTMLElement, SplitResult>
) {
  const measuredLines: Array<{
    element: HTMLElement;
    original: string;
    lines: HTMLElement[][];
  }> = [];

  for (const { element, original, words } of lineQueue) {
    const lines: HTMLElement[][] = [];
    let lineTop = Number.NaN;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const top = word.offsetTop;
      if (!Number.isFinite(lineTop) || Math.abs(top - lineTop) > 3) {
        lines.push([]);
        lineTop = top;
      }
      lines[lines.length - 1].push(word);
    }
    measuredLines.push({ element, original, lines });
  }

  for (const { element, original, lines } of measuredLines) {
    const masks: HTMLElement[] = [];
    const targets = lines.map((line) => {
      const mask = document.createElement("span");
      const inner = document.createElement("span");
      mask.className = "motion-line-mask";
      inner.className = "motion-line-inner";
      mask.setAttribute("aria-hidden", "true");
      line.forEach((word, index) => {
        if (index > 0) inner.append(document.createTextNode(" "));
        inner.append(word);
      });
      mask.append(inner);
      masks.push(mask);
      return inner;
    });
    element.replaceChildren(...masks);
    results.set(element, { original, targets, preSplit: false });
  }
}

export function ScrollEffects() {
  const pathname = usePathname();
  const { reducedMotion, lenis } = useMotion();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const prevPathnameRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    const isReduced =
      reducedMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      document.documentElement.classList.add("reduced-motion", "js-ready");
      document
        .querySelectorAll<HTMLElement>(
          "[data-reveal], [data-reveal] > *, [data-draw], [data-footer-letter]"
        )
        .forEach((el) => {
          el.classList.add("is-revealed");
          gsap.set(el, { clearProps: "opacity,transform,clipPath" });
        });
      gsap.fromTo(
        "#main-content",
        { opacity: 0.92 },
        { opacity: 1, duration: 0.18, ease: "power2.out", clearProps: "opacity" }
      );
      return;
    }

    document.documentElement.classList.remove("reduced-motion");
    document.documentElement.classList.add("js", "motion-ok", "js-ready");

    const isRouteTransition =
      prevPathnameRef.current !== null && prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    let activeTeardown: (() => void) | null = null;

    const mountEffects = (runEntrance: boolean) => {
      let isCancelled = false;
      const timers: number[] = [];
      const splitRestorers: Array<() => void> = [];
      const cleanups: Array<() => void> = [];
      const ctx = gsap.context(() => {});
      const isDesktop = desktopQuery.matches;

      const sliceQueue: Array<() => void> = [];
      const enqueueSlice = (fn: () => void) => {
        sliceQueue.push(fn);
      };
      const pumpQueue = (delayMs = 20) => {
        const id = window.setTimeout(() => {
          if (isCancelled) return;
          const next = sliceQueue.shift();
          if (!next) return;
          ctx.add(next);
          if (sliceQueue.length > 0) {
            pumpQueue(20);
          }
        }, delayMs);
        timers.push(id);
      };

      const hero = document.querySelector<HTMLElement>(".hero-section");
      const heroPhoto = hero?.querySelector<HTMLElement>(".hero-photo");
      const heroHeading = hero?.querySelector<HTMLElement>(".hero-heading");
      const heroSubline = hero?.querySelector<HTMLElement>(".hero-subline");
      const heroActions = hero?.querySelector<HTMLElement>(".hero-actions");
      const heroStrip = hero?.querySelector<HTMLElement>(".hero-bottom-strip");
      const heroFollowTargets = [heroSubline, heroActions, heroStrip].filter(
        (el): el is HTMLElement => Boolean(el)
      );

      // SLICE 0 (Synchronous): Above-the-fold Hero & Header entrance animations
      ctx.add(() => {
        if (runEntrance && isRouteTransition) {
          gsap.fromTo(
            "#main-content",
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.3,
              ease: "power3.out",
              clearProps: "opacity",
            }
          );
        }

        if (runEntrance) {
          gsap.fromTo(
            "header",
            { y: -10 },
            {
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform",
            }
          );
        }

        if (heroPhoto && runEntrance) {
          gsap.fromTo(
            heroPhoto,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.8,
              ease: "power3.out",
              overwrite: "auto",
            }
          );
        }

        if (heroHeading) {
          heroHeading.classList.add("is-revealed");
          const existingLines = Array.from(
            heroHeading.querySelectorAll<HTMLElement>(".motion-line-inner")
          );
          if (existingLines.length && runEntrance) {
            gsap.fromTo(
              existingLines,
              { yPercent: isDesktop ? 110 : 35 },
              {
                yPercent: 0,
                duration: 1.05,
                stagger: 0.12,
                delay: 0.08,
                ease: "power3.out",
              }
            );
          }
        }

        if (heroSubline) {
          heroSubline.classList.add("is-revealed");
          if (runEntrance) {
            gsap.fromTo(
              heroSubline,
              { y: 28 },
              {
                y: 0,
                duration: 1.0,
                delay: 0.26,
                ease: "power3.out",
              }
            );
          }
        }

        const heroSecondary = [heroActions, heroStrip].filter(
          (el): el is HTMLElement => Boolean(el)
        );
        if (heroSecondary.length) {
          heroSecondary.forEach((el) => el.classList.add("is-revealed"));
          if (runEntrance) {
            gsap.fromTo(
              heroSecondary,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 1.0,
                stagger: 0.1,
                delay: 0.34,
                ease: "power3.out",
              }
            );
          }
        }
      });

      let splitMap = new Map<HTMLElement, SplitResult>();
      let pendingLineQueue: PendingLineItem[] = [];
      let splitElements: HTMLElement[] = [];
      let standardElements: HTMLElement[] = [];
      let batchGroups: Array<{
        group: HTMLElement;
        children: HTMLElement[];
        stagger: number;
      }> = [];
      let clipFrames: Array<{
        frame: HTMLElement;
        image: HTMLElement | null;
        fromClip: string;
      }> = [];
      let drawLines: Array<{
        line: HTMLElement;
        isVertical: boolean;
        origin: string;
      }> = [];
      let countElements: Array<{
        numEl: HTMLElement;
        targetNum: number;
        pad: number;
      }> = [];
      let ctaSeals: HTMLElement[] = [];
      let mainEl: HTMLElement | null = null;
      let giantWordmark: HTMLElement | null = null;
      let footerLetters: HTMLElement[] = [];
      let parallaxItems: Array<{
        element: HTMLElement;
        target: HTMLElement;
        axis: "xPercent" | "yPercent";
        travel: number;
      }> = [];
      let mobileSteps: HTMLElement[] = [];
      let marqueeTracks: HTMLElement[] = [];

      // SLICE 1A: Pure DOM Write — split words for all [data-reveal="lines" | "words"]
      enqueueSlice(() => {
        splitElements = Array.from(
          document.querySelectorAll<HTMLElement>(
            '[data-reveal="lines"], [data-reveal="words"]'
          )
        ).filter((el) => el !== heroHeading);

        const batchItems: Array<{
          element: HTMLElement;
          mode: "lines" | "words";
        }> = splitElements.map((element) => ({
          element,
          mode: (element.dataset.reveal as "lines" | "words") || "lines",
        }));

        if (isDesktop) {
          const vHost = document.querySelector<HTMLElement>(
            '[data-vision-words="vision"]'
          );
          const mHost = document.querySelector<HTMLElement>(
            '[data-vision-words="mission"]'
          );
          if (vHost && mHost) {
            batchItems.push(
              { element: vHost, mode: "words" },
              { element: mHost, mode: "words" }
            );
          }
        }

        const res = splitWordsWritePass(batchItems);
        splitMap = res.results;
        pendingLineQueue = res.lineQueue;

        batchItems.forEach(({ element }) => {
          const split = splitMap.get(element);
          if (split && !split.preSplit) {
            splitRestorers.push(() => {
              element.innerHTML = split.original;
              element.removeAttribute("aria-label");
            });
          }
        });
      });

      // SLICE 1B: Measure line offsetTops (1 layout pass) + wrap line masks + gsap.set on split & standard elements
      enqueueSlice(() => {
        splitLinesMeasureAndWrapPass(pendingLineQueue, splitMap);

        splitElements.forEach((element) => {
          const split = splitMap.get(element);
          element.classList.add("is-revealed");
          if (!split || !split.targets.length) return;
          const mode = element.dataset.reveal as "lines" | "words";
          if (mode === "lines") {
            gsap.set(split.targets, { yPercent: 110 });
          } else {
            const isScrubbed = element.hasAttribute("data-scrub");
            gsap.set(split.targets, { opacity: 0.15, y: isScrubbed ? 0 : 8 });
          }
        });

        standardElements = Array.from(
          document.querySelectorAll<HTMLElement>(
            '[data-reveal="up"], [data-reveal="fade-up"], [data-reveal="fade"], [data-reveal="scale"]'
          )
        ).filter(
          (el) =>
            !heroFollowTargets.includes(el) &&
            !el.classList.contains("hero-heading")
        );

        standardElements.forEach((element) => {
          const mode = element.dataset.reveal;
          element.classList.add("is-revealed");
          const fromVars =
            mode === "fade"
              ? { opacity: 0 }
              : mode === "scale"
              ? { opacity: 0, scale: 0.9 }
              : { opacity: 0, y: 34 };
          gsap.set(element, fromVars);
        });
      });

      // SLICE 1C: Pure Initial Style Writes (gsap.set) for batch, clip, draw, count, seal, footer, parallax & marquee
      enqueueSlice(() => {
        const rawBatchGroups = Array.from(
          document.querySelectorAll<HTMLElement>(
            '[data-reveal="stagger"], [data-reveal="collage"]'
          )
        );
        batchGroups = [];
        rawBatchGroups.forEach((group) => {
          group.classList.add("is-revealed");
          const children = Array.from(group.children).filter(
            (child): child is HTMLElement => child instanceof HTMLElement
          );
          if (!children.length) return;
          children.forEach((c) => c.classList.add("is-revealed"));
          const isProductGrid = group.classList.contains("product-grid");
          const stagger = numberAttr(
            group,
            "stagger",
            isProductGrid ? 0.08 : 0.1
          );
          gsap.set(children, { opacity: 0, y: 34 });
          batchGroups.push({ group, children, stagger });
        });

        clipFrames = Array.from(
          document.querySelectorAll<HTMLElement>('[data-reveal="clip"]')
        ).map((frame) => {
          frame.classList.add("is-revealed");
          const image = frame.querySelector<HTMLElement>("img");
          const clipDir = frame.dataset.clipFrom;
          const inReverseRow = frame.closest(".service-row-reverse") !== null;
          const inServiceRow = frame.closest(".service-row") !== null;

          let fromClip = "inset(100% 0% 0% 0%)";
          if (clipDir === "left" || (inServiceRow && !inReverseRow)) {
            fromClip = "inset(0% 100% 0% 0%)";
          } else if (clipDir === "right" || (inServiceRow && inReverseRow)) {
            fromClip = "inset(0% 0% 0% 100%)";
          } else if (clipDir === "top") {
            fromClip = "inset(0% 0% 100% 0%)";
          }

          gsap.set(frame, { clipPath: fromClip });
          if (image) {
            gsap.set(image, { scale: 1.15 });
          }
          return { frame, image, fromClip };
        });

        drawLines = Array.from(
          document.querySelectorAll<HTMLElement>("[data-draw]")
        ).map((line) => {
          const dir = line.dataset.draw || "left";
          const isVertical = dir === "top" || dir === "bottom";
          const origin =
            dir === "center"
              ? "center center"
              : dir === "top"
              ? "top center"
              : "left center";
          gsap.set(line, {
            transformOrigin: origin,
            ...(isVertical ? { scaleY: 0 } : { scaleX: 0 }),
          });
          return { line, isVertical, origin };
        });

        countElements = Array.from(
          document.querySelectorAll<HTMLElement>("[data-count-to]")
        ).map((numEl) => {
          const targetNum = Number.parseInt(numEl.dataset.countTo ?? "1", 10);
          const pad = numEl.dataset.countPad
            ? Number.parseInt(numEl.dataset.countPad, 10)
            : 2;
          gsap.set(numEl, { opacity: 0, y: 18 });
          return { numEl, targetNum, pad };
        });

        ctaSeals = Array.from(
          document.querySelectorAll<HTMLElement>(
            ".cta-seal-wrap, .cta-seal-scene"
          )
        );
        ctaSeals.forEach((seal) => {
          gsap.set(seal, { scale: 1.25, rotation: -6 });
        });

        mainEl = document.querySelector<HTMLElement>("#main-content");
        giantWordmark = document.querySelector<HTMLElement>(
          ".footer-giant-wordmark"
        );
        footerLetters = Array.from(
          document.querySelectorAll<HTMLElement>("[data-footer-letter]")
        );
        if (giantWordmark && mainEl) {
          gsap.set(giantWordmark, { opacity: 0, y: 24 });
        }
        if (footerLetters.length && mainEl) {
          footerLetters.forEach((l) => l.classList.add("is-revealed"));
          gsap.set(footerLetters, { yPercent: 45, opacity: 0 });
        }

        const amplitude = isDesktop ? 1 : 0.5;
        parallaxItems = Array.from(
          document.querySelectorAll<HTMLElement>("[data-parallax]")
        )
          .filter((el) => !el.classList.contains("hero-photo"))
          .map((element) => {
            const raw = element.dataset.parallax;
            const factor =
              raw === "true" || raw === ""
                ? 0.1
                : numberAttr(element, "parallax", 0.1);
            const axis =
              element.dataset.parallaxAxis === "x" ? "xPercent" : "yPercent";
            const target =
              element.querySelector<HTMLElement>("[data-parallax-target]") ??
              element.querySelector<HTMLElement>("img") ??
              element;
            const travel = factor * 100 * amplitude;
            target.style.willChange = "transform";
            gsap.set(target, {
              ...(target.tagName === "IMG" &&
              !element.hasAttribute("data-reveal")
                ? { scale: 1.15 }
                : {}),
              [axis]: -travel,
            });
            return { element, target, axis, travel };
          });

        if (!isDesktop) {
          mobileSteps = Array.from(
            document.querySelectorAll<HTMLElement>("[data-approach-step]")
          );
          mobileSteps.forEach((step) => {
            step.classList.add("is-revealed");
            gsap.set(step, { opacity: 0, y: 30 });
          });
        }

        marqueeTracks = Array.from(
          document.querySelectorAll<HTMLElement>(
            ".brand-ticker-track, .portfolio-marquee-track"
          )
        );
        marqueeTracks.forEach((track) => {
          track.style.animation = "none";
        });
      });

      // SLICE 2A-1: Register ScrollTriggers for splitElements + first half of standardElements
      enqueueSlice(() => {
        let isInitializing = true;
        const pendingEnter: Array<() => void> = [];
        const deferWrite = (fn: () => void) => {
          if (isInitializing) pendingEnter.push(fn);
          else fn();
        };

        splitElements.forEach((element) => {
          const split = splitMap.get(element);
          if (!split || !split.targets.length) return;
          const mode = element.dataset.reveal as "lines" | "words";
          const delay = numberAttr(element, "delay", 0);
          const stagger = numberAttr(
            element,
            "stagger",
            mode === "lines" ? 0.12 : 0.04
          );

          if (mode === "lines") {
            ScrollTrigger.create({
              trigger: element,
              start: "top 85%",
              once: true,
              onEnter: () =>
                deferWrite(() => {
                  gsap.to(split.targets, {
                    yPercent: 0,
                    duration: 1.05,
                    stagger,
                    delay,
                    ease: "power3.out",
                    clearProps: "transform",
                    overwrite: "auto",
                  });
                }),
            });
          } else {
            const isScrubbed = element.hasAttribute("data-scrub");
            if (isScrubbed) {
              gsap.to(split.targets, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger,
                delay,
                ease: "none",
                immediateRender: false,
                clearProps: "transform",
                scrollTrigger: {
                  trigger: element,
                  start: "top 85%",
                  end: "bottom 55%",
                  scrub: numberAttr(element, "scrub", 0.6),
                },
              });
            } else {
              ScrollTrigger.create({
                trigger: element,
                start: "top 85%",
                once: true,
                onEnter: () =>
                  deferWrite(() => {
                    gsap.to(split.targets, {
                      opacity: 1,
                      y: 0,
                      duration: 0.9,
                      stagger,
                      delay,
                      ease: "power3.out",
                      clearProps: "transform",
                      overwrite: "auto",
                    });
                  }),
              });
            }
          }
        });

        const half = Math.ceil(standardElements.length / 2);
        standardElements.slice(0, half).forEach((element) => {
          const mode = element.dataset.reveal;
          const delay = numberAttr(element, "delay", 0);
          const toVars =
            mode === "fade"
              ? { opacity: 1 }
              : mode === "scale"
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, y: 0 };

          ScrollTrigger.create({
            trigger: element,
            start: "top 85%",
            once: true,
            onEnter: () =>
              deferWrite(() => {
                gsap.to(element, {
                  ...toVars,
                  delay,
                  duration: 1.0,
                  ease: "power3.out",
                  clearProps: "transform",
                  overwrite: "auto",
                });
              }),
          });
        });

        isInitializing = false;
        pendingEnter.forEach((fn) => fn());
      });

      // SLICE 2A-2: Register ScrollTriggers for second half of standardElements + batchGroups
      enqueueSlice(() => {
        let isInitializing = true;
        const pendingEnter: Array<() => void> = [];
        const deferWrite = (fn: () => void) => {
          if (isInitializing) pendingEnter.push(fn);
          else fn();
        };

        const half = Math.ceil(standardElements.length / 2);
        standardElements.slice(half).forEach((element) => {
          const mode = element.dataset.reveal;
          const delay = numberAttr(element, "delay", 0);
          const toVars =
            mode === "fade"
              ? { opacity: 1 }
              : mode === "scale"
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, y: 0 };

          ScrollTrigger.create({
            trigger: element,
            start: "top 85%",
            once: true,
            onEnter: () =>
              deferWrite(() => {
                gsap.to(element, {
                  ...toVars,
                  delay,
                  duration: 1.0,
                  ease: "power3.out",
                  clearProps: "transform",
                  overwrite: "auto",
                });
              }),
          });
        });

        batchGroups.forEach(({ children, stagger }) => {
          ScrollTrigger.batch(children, {
            start: "top 85%",
            once: true,
            interval: 0.08,
            batchMax: 12,
            onEnter: (batch) =>
              deferWrite(() => {
                gsap.to(batch, {
                  opacity: 1,
                  y: 0,
                  duration: 0.95,
                  stagger,
                  ease: "power3.out",
                  overwrite: true,
                  clearProps: "transform",
                });
              }),
          });
        });

        isInitializing = false;
        pendingEnter.forEach((fn) => fn());
      });

      // SLICE 2B-1: Register ScrollTriggers for clip, draw, count, seal & footer
      enqueueSlice(() => {
        let isInitializing = true;
        const pendingEnter: Array<() => void> = [];
        const deferWrite = (fn: () => void) => {
          if (isInitializing) pendingEnter.push(fn);
          else fn();
        };

        clipFrames.forEach(({ frame }) => {
          ScrollTrigger.create({
            trigger: frame,
            start: "top 85%",
            once: true,
            onEnter: () =>
              deferWrite(() => {
                gsap.to(frame, {
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 1.15,
                  ease: "power3.out",
                  overwrite: "auto",
                  onComplete: () => {
                    frame.style.clipPath = "none";
                  },
                });
              }),
          });
        });

        drawLines.forEach(({ line, isVertical }) => {
          ScrollTrigger.create({
            trigger: line,
            start: "top 85%",
            once: true,
            onEnter: () =>
              deferWrite(() => {
                gsap.to(line, {
                  ...(isVertical ? { scaleY: 1 } : { scaleX: 1 }),
                  duration: 1.05,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              }),
          });
        });

        countElements.forEach(({ numEl, targetNum, pad }) => {
          const counter = { val: 0 };
          ScrollTrigger.create({
            trigger: numEl,
            start: "top 85%",
            once: true,
            onEnter: () =>
              deferWrite(() => {
                gsap.to(numEl, {
                  opacity: 1,
                  y: 0,
                  duration: 0.95,
                  ease: "power3.out",
                  clearProps: "transform",
                  overwrite: "auto",
                });
                gsap.to(counter, {
                  val: targetNum,
                  duration: 0.9,
                  ease: "power3.out",
                  onUpdate: () => {
                    numEl.textContent = String(
                      Math.max(1, Math.round(counter.val))
                    ).padStart(pad, "0");
                  },
                });
              }),
          });
        });

        ctaSeals.forEach((seal) => {
          ScrollTrigger.create({
            trigger: seal,
            start: "top 85%",
            once: true,
            onEnter: () =>
              deferWrite(() => {
                seal.classList.add("is-stamped");
                setSceneProgress("cta", 1, seal);
                gsap.to(seal, {
                  scale: 1,
                  rotation: 0,
                  duration: 1.1,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              }),
          });
        });

        if ((giantWordmark || footerLetters.length) && mainEl) {
          ScrollTrigger.create({
            trigger: mainEl,
            start: "bottom 92%",
            once: true,
            onEnter: () =>
              deferWrite(() => {
                if (giantWordmark) {
                  gsap.to(giantWordmark, {
                    opacity: 0.22,
                    y: 0,
                    duration: 1.0,
                    ease: "power3.out",
                  });
                }
                if (footerLetters.length) {
                  gsap.to(footerLetters, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1.0,
                    stagger: 0.09,
                    ease: "power3.out",
                    clearProps: "transform",
                  });
                }
              }),
          });
        }

        isInitializing = false;
        pendingEnter.forEach((fn) => fn());
      });

      // SLICE 2B-2: Register ScrollTriggers for parallax & catalog filter observer
      enqueueSlice(() => {
        parallaxItems.forEach(({ element, target, axis, travel }) => {
          if (isDesktop) {
            gsap.to(target, {
              [axis]: travel,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          } else {
            const setProp = gsap.quickSetter(target, axis);
            ScrollTrigger.create({
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              onUpdate: (self) => {
                setProp(-travel + self.progress * travel * 2);
              },
            });
          }
        });

        const productGrid = document.querySelector<HTMLElement>(".product-grid");
        if (productGrid) {
          const observer = new MutationObserver(() => {
            const items = Array.from(productGrid.children).filter(
              (item): item is HTMLElement => item instanceof HTMLElement
            );
            items.forEach((item) => item.classList.add("is-revealed"));
            gsap.fromTo(
              items,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.36,
                stagger: 0.03,
                ease: "power3.out",
                clearProps: "transform",
              }
            );
          });
          observer.observe(productGrid, { childList: true });
          cleanups.push(() => observer.disconnect());
        }
      });

      // SLICE 3: Breakpoint-specific scenes + Marquee velocity (Pure Read pass on mobile)
      enqueueSlice(() => {
        if (isDesktop) {
          if (hero) {
            const heroParallaxLayer =
              hero.querySelector<HTMLElement>(".hero-photo-parallax") ??
              heroPhoto;
            const heroHeadlineBlock =
              hero.querySelector<HTMLElement>(".hero-heading-wrap") ??
              hero.querySelector<HTMLElement>(".hero-heading");
            const heroSubBlock =
              hero.querySelector<HTMLElement>(".hero-sub-wrap") ??
              hero.querySelector<HTMLElement>(".hero-subline");
            const heroBottomStripWrap = hero.querySelector<HTMLElement>(
              ".hero-bottom-strip"
            );
            const heroCopperLine =
              hero.querySelector<HTMLElement>(".hero-copper-line");
            const heroScrollCue =
              hero.querySelector<HTMLElement>(".hero-scroll-cue");

            if (heroParallaxLayer) {
              heroParallaxLayer.style.willChange = "transform";
            }
            if (heroCopperLine) {
              gsap.set(heroCopperLine, {
                transformOrigin: "left center",
                scaleX: 0,
              });
            }

            const heroTl = gsap.timeline({
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });

            if (heroParallaxLayer) {
              heroTl.fromTo(
                heroParallaxLayer,
                { yPercent: 0 },
                { yPercent: 18, ease: "none", immediateRender: false },
                0
              );
            }
            if (heroHeadlineBlock) {
              heroTl.fromTo(
                heroHeadlineBlock,
                { y: 0, opacity: 1 },
                {
                  y: -90,
                  opacity: 0.15,
                  ease: "none",
                  immediateRender: false,
                },
                0
              );
            }
            if (heroSubBlock) {
              heroTl.fromTo(
                heroSubBlock,
                { y: 0, opacity: 1 },
                { y: -50, opacity: 0, ease: "none", immediateRender: false },
                0
              );
            }
            if (heroBottomStripWrap) {
              heroTl.fromTo(
                heroBottomStripWrap,
                { opacity: 1 },
                { opacity: 0, ease: "none", immediateRender: false },
                0
              );
            }
            if (heroCopperLine) {
              heroTl.fromTo(
                heroCopperLine,
                { scaleX: 0 },
                { scaleX: 1, ease: "none", immediateRender: false },
                0
              );
            }
            if (heroScrollCue) {
              gsap.fromTo(
                heroScrollCue,
                { opacity: 1, y: 0 },
                {
                  opacity: 0,
                  y: -8,
                  ease: "none",
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "+=80",
                    scrub: 0.6,
                  },
                }
              );
            }
          }

          const whyItems = Array.from(
            document.querySelectorAll<HTMLElement>("[data-why-item]")
          );
          const whyImages = Array.from(
            document.querySelectorAll<HTMLElement>("[data-why-image]")
          );
          const activateWhy = (activeIndex: number) => {
            whyItems.forEach((item, i) =>
              item.classList.toggle("is-active", i === activeIndex)
            );
            whyImages.forEach((image, i) =>
              image.classList.toggle("is-active", i === activeIndex)
            );
          };
          if (whyItems.length) {
            activateWhy(0);
            whyItems.forEach((item, index) => {
              ScrollTrigger.create({
                trigger: item,
                start: "top 55%",
                end: "bottom 45%",
                onEnter: () => activateWhy(index),
                onEnterBack: () => activateWhy(index),
              });
            });
          }

          const visionSection = document.querySelector<HTMLElement>(
            "[data-vision-scene]"
          );
          if (visionSection) {
            const blackOverlay = visionSection.querySelector<HTMLElement>(
              "[data-vision-overlay]"
            );
            const visionPin =
              visionSection.querySelector<HTMLElement>("[data-vision-pin]") ??
              visionSection;
            const visionWordsHost = visionSection.querySelector<HTMLElement>(
              '[data-vision-words="vision"]'
            );
            const missionWordsHost = visionSection.querySelector<HTMLElement>(
              '[data-vision-words="mission"]'
            );
            const visionCard = visionSection.querySelector<HTMLElement>(
              '[data-vision-card="vision"]'
            );
            const missionCard = visionSection.querySelector<HTMLElement>(
              '[data-vision-card="mission"]'
            );
            const diamondDivider = visionSection.querySelector<HTMLElement>(
              "[data-vision-divider]"
            );

            if (blackOverlay) {
              gsap.set(blackOverlay, { opacity: 0 });
              gsap.to(blackOverlay, {
                opacity: 1,
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                  trigger: visionSection,
                  start: "top bottom",
                  end: "top 75%",
                  scrub: 0.6,
                },
              });
            }

            const splitLayout =
              visionSection.querySelector<HTMLElement>(".vision-split-layout");
            if (splitLayout) {
              gsap.fromTo(
                splitLayout,
                { scale: 0.88, y: 36, opacity: 0 },
                {
                  scale: 1,
                  y: 0,
                  opacity: 1,
                  duration: 0.9,
                  ease: "back.out(1.7)",
                  scrollTrigger: {
                    trigger: visionSection,
                    start: "top 88%",
                    once: true,
                  },
                }
              );
            }

            if (visionWordsHost && missionWordsHost) {
              const vSplit = splitMap.get(visionWordsHost);
              const mSplit = splitMap.get(missionWordsHost);
              if (vSplit && mSplit) {
                gsap.set(vSplit.targets, { opacity: 0.15 });
                gsap.set(mSplit.targets, { opacity: 0.15 });
                if (diamondDivider) {
                  gsap.set(diamondDivider, { scale: 0, opacity: 0 });
                }
                if (missionCard) {
                  gsap.set(missionCard, { opacity: 0.35, y: 18 });
                }
                if (visionCard) {
                  visionCard.classList.add("is-active");
                }

                const visionTl = gsap.timeline({
                  scrollTrigger: {
                    trigger: visionPin,
                    start: "top top",
                    end: "+=200%",
                    pin: visionPin,
                    pinSpacing: true,
                    scrub: 0.6,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                      setSceneProgress("vision", self.progress, visionSection);
                      const inMission = self.progress >= 0.5;
                      visionCard?.classList.toggle("is-active", !inMission);
                      missionCard?.classList.toggle("is-active", inMission);
                    },
                  },
                });

                visionTl.to(
                  vSplit.targets,
                  {
                    opacity: 1,
                    stagger: 0.035,
                    duration: 0.22,
                    ease: "none",
                  },
                  0
                );
                if (diamondDivider) {
                  visionTl.to(
                    diamondDivider,
                    {
                      scale: 1,
                      opacity: 1,
                      duration: 0.3,
                      ease: "power2.out",
                    },
                    0.95
                  );
                }
                if (visionCard) {
                  visionTl.to(
                    visionCard,
                    { opacity: 0.55, duration: 0.3, ease: "none" },
                    1.05
                  );
                }
                if (missionCard) {
                  visionTl.to(
                    missionCard,
                    { opacity: 1, y: 0, duration: 0.3, ease: "none" },
                    1.05
                  );
                }
                visionTl.to(
                  mSplit.targets,
                  {
                    opacity: 1,
                    stagger: 0.03,
                    duration: 0.22,
                    ease: "none",
                  },
                  1.15
                );
                if (visionCard) {
                  visionTl.to(
                    visionCard,
                    { opacity: 1, duration: 0.2, ease: "none" },
                    2.25
                  );
                }
              }
            }
          }

          const approach = document.querySelector<HTMLElement>(
            "[data-approach-sequence]"
          );
          const approachPin =
            approach?.querySelector<HTMLElement>("[data-pin]") ?? approach;
          const approachSteps = Array.from(
            approach?.querySelectorAll<HTMLElement>("[data-approach-step]") ?? []
          );
          const approachProgressFill = approach?.querySelector<HTMLElement>(
            "[data-approach-progress]"
          );

          if (approach && approachPin && approachSteps.length) {
            const pinDuration = approachPin.dataset.pinEnd ?? "+=300%";
            const activateStep = (activeIndex: number) => {
              approachSteps.forEach((step, idx) => {
                const isActive = idx === activeIndex;
                step.classList.toggle("is-active", isActive);
                step.setAttribute("aria-current", isActive ? "step" : "false");
              });
            };
            activateStep(0);

            if (approachProgressFill) {
              gsap.set(approachProgressFill, {
                scaleY: 0,
                transformOrigin: "top center",
              });
            }

            ScrollTrigger.create({
              trigger: approachPin,
              start: "top top",
              end: pinDuration,
              pin: approachPin,
              pinSpacing: true,
              scrub: numberAttr(approachPin, "scrub", 0.6),
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                setSceneProgress("approach", self.progress, approach);
                if (approachProgressFill) {
                  approachProgressFill.style.transform = `scaleY(${self.progress.toFixed(4)})`;
                }
                const activeIdx = Math.min(
                  approachSteps.length - 1,
                  Math.floor(self.progress * approachSteps.length)
                );
                activateStep(activeIdx);
              },
            });
          }

          const gallery = document.querySelector<HTMLElement>(
            "[data-horizontal-gallery]"
          );
          const galleryTrack = gallery?.querySelector<HTMLElement>(
            "[data-horizontal-track]"
          );
          if (gallery && galleryTrack) {
            const getDistance = () =>
              Math.max(0, galleryTrack.scrollWidth - gallery.clientWidth);
            const progressRule = gallery
              .closest(".collection-gallery")
              ?.querySelector<HTMLElement>(".collection-gallery-progress-fill");
            const galleryImages = Array.from(
              galleryTrack.querySelectorAll<HTMLElement>(
                ".collection-gallery-image img"
              )
            );
            const galleryNumbers = Array.from(
              galleryTrack.querySelectorAll<HTMLElement>(
                ".collection-gallery-number"
              )
            );

            galleryImages.forEach((image) => {
              image.style.willChange = "transform";
              gsap.set(image, { scale: 1.18, xPercent: -8 });
            });
            if (galleryNumbers.length) {
              gsap.set(galleryNumbers, { xPercent: 14 });
            }

            const galleryTl = gsap.timeline({
              scrollTrigger: {
                trigger: gallery,
                start: "top top",
                end: () => `+=${getDistance()}`,
                pin: gallery,
                pinSpacing: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  setSceneProgress("portfolio", self.progress, gallery);
                  if (progressRule) {
                    progressRule.style.transform = `scaleX(${self.progress.toFixed(4)})`;
                  }
                },
              },
            });

            galleryTl.to(
              galleryTrack,
              {
                x: () => -getDistance(),
                ease: "none",
                duration: 1,
              },
              0
            );

            if (galleryImages.length) {
              galleryTl.to(
                galleryImages,
                { xPercent: 8, ease: "none", duration: 1 },
                0
              );
            }

            if (galleryNumbers.length) {
              galleryTl.to(
                galleryNumbers,
                { xPercent: -14, ease: "none", duration: 1 },
                0
              );
            }
          }

          const ctaBand = document.querySelector<HTMLElement>(".cta-band");
          if (ctaBand) {
            gsap.set(ctaBand, { y: 40 });
            gsap.to(ctaBand, {
              y: 0,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: ctaBand,
                start: "top bottom",
                end: "top 65%",
                scrub: 0.6,
                onUpdate: (self) => {
                  setSceneProgress("cta", self.progress, ctaBand);
                },
              },
            });
          }

          const footer = document.querySelector<HTMLElement>(".site-footer");
          const footerInner = footer?.querySelector<HTMLElement>(
            ".footer-parallax-inner"
          );
          const mainContent =
            document.querySelector<HTMLElement>("#main-content");
          if (footer && footerInner && mainContent) {
            gsap.set(footerInner, { yPercent: -25 });
            ScrollTrigger.create({
              trigger: mainContent,
              start: "bottom 140%",
              onEnter: () => footer.classList.add("is-footer-visible"),
              onLeaveBack: () => footer.classList.remove("is-footer-visible"),
            });
            gsap.to(footerInner, {
              yPercent: 0,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: mainContent,
                start: "bottom bottom",
                end: () => `+=${Math.max(320, footer.offsetHeight)}`,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            });
          }

          document
            .querySelectorAll<HTMLElement>("[data-pin]")
            .forEach((element) => {
              if (
                element.closest("[data-approach-sequence]") ||
                element.closest("[data-vision-scene]")
              ) {
                return;
              }
              const progressHost =
                element.closest<HTMLElement>("[data-scene-progress]") ??
                element;
              ScrollTrigger.create({
                trigger: element,
                start: "top top",
                end: element.dataset.pinEnd ?? "+=150%",
                pin: element,
                pinSpacing: true,
                scrub: numberAttr(element, "scrub", 0.6),
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  progressHost.style.setProperty(
                    "--scene-progress",
                    self.progress.toFixed(4)
                  );
                },
              });
            });
        } else {
          let isMobInit = true;
          const pendingMob: Array<() => void> = [];
          mobileSteps.forEach((step) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 85%",
              once: true,
              onEnter: () => {
                const run = () => {
                  gsap.to(step, {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    clearProps: "transform",
                    overwrite: "auto",
                  });
                };
                if (isMobInit) pendingMob.push(run);
                else run();
              },
            });
          });
          isMobInit = false;
          pendingMob.forEach((fn) => fn());
        }

        marqueeTracks.forEach((track) => {
          let loop: gsap.core.Tween | null = null;
          let skewTo: gsap.QuickToFunc | null = null;
          let isVisibleInViewport = false;
          let currentDirection = 1;

          const ensureLoop = () => {
            if (!loop) {
              loop = gsap.to(track, {
                xPercent: -50,
                duration: 34,
                repeat: -1,
                ease: "none",
                paused: true,
                modifiers: {
                  xPercent: gsap.utils.wrap(-50, 0),
                },
              });
              skewTo = gsap.quickTo(track, "skewX", {
                duration: 0.22,
                ease: "power2.out",
              });
            }
          };

          ScrollTrigger.create({
            trigger: track,
            start: "top bottom+=100",
            end: "bottom top-=100",
            onToggle: (self) => {
              isVisibleInViewport = self.isActive;
              ensureLoop();
              if (self.isActive) {
                loop?.play();
              } else {
                loop?.timeScale(currentDirection);
                skewTo?.(0);
                loop?.pause();
              }
            },
          });

          let idleTimer: number | null = null;
          let lastScrollY = window.scrollY;

          const onScrollVelocity = () => {
            if (!isVisibleInViewport) return;
            ensureLoop();
            const currentY = window.scrollY;
            const deltaY = currentY - lastScrollY;
            lastScrollY = currentY;

            const activeLenis = lenisRef.current;
            const rawVel = activeLenis ? activeLenis.velocity : deltaY * 0.08;
            const rawDir = activeLenis
              ? activeLenis.direction
              : deltaY === 0
              ? 0
              : deltaY > 0
              ? 1
              : -1;

            if (rawDir !== 0) {
              currentDirection = rawDir < 0 ? -1 : 1;
            }
            const clampedVel = Math.min(Math.abs(rawVel), 3.5);
            const targetScale = currentDirection * (1 + clampedVel * 0.45);
            const targetSkew = Math.max(-6, Math.min(6, rawVel * -1.2));

            loop?.timeScale(targetScale);
            skewTo?.(targetSkew);

            if (idleTimer !== null) window.clearTimeout(idleTimer);
            idleTimer = window.setTimeout(() => {
              loop?.timeScale(currentDirection);
              skewTo?.(0);
            }, 120);
          };

          window.addEventListener("scroll", onScrollVelocity, { passive: true });
          cleanups.push(() => {
            if (idleTimer !== null) window.clearTimeout(idleTimer);
            window.removeEventListener("scroll", onScrollVelocity);
            loop?.kill();
          });
        });
      });

      pumpQueue(20);

      return () => {
        isCancelled = true;
        timers.forEach((id) => window.clearTimeout(id));
        cleanups.forEach((fn) => fn());
        ctx.revert();
        splitRestorers.forEach((restore) => restore());
      };
    };

    activeTeardown = mountEffects(true);

    const handleBreakpointChange = () => {
      if (activeTeardown) activeTeardown();
      activeTeardown = mountEffects(false);
    };
    desktopQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      desktopQuery.removeEventListener("change", handleBreakpointChange);
      if (activeTeardown) activeTeardown();
    };
  }, [pathname, reducedMotion]);

  return null;
}
