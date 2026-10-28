"use client";

import { useLayoutEffect } from "react";
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

function prepareText(element: HTMLElement, mode: "lines" | "words") {
  const original = element.innerHTML;
  const label = element.textContent?.replace(/\s+/g, " ").trim() ?? "";
  if (!label) {
    return { original, targets: [] as HTMLElement[] };
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

  if (mode === "words") {
    element.replaceChildren(
      ...words.flatMap((word, index) =>
        index ? [document.createTextNode(" "), word] : [word]
      )
    );
    return { original, targets: words };
  }

  element.replaceChildren();
  const lines: HTMLElement[][] = [];
  let lineTop = Number.NaN;
  words.forEach((word, index) => {
    if (index > 0) element.append(document.createTextNode(" "));
    element.append(word);
    const top = Math.round(word.getBoundingClientRect().top);
    if (!Number.isFinite(lineTop) || Math.abs(top - lineTop) > 3) {
      lines.push([]);
      lineTop = top;
    }
    lines[lines.length - 1].push(word);
  });

  element.replaceChildren();
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
    element.append(mask);
    return inner;
  });

  return { original, targets };
}

export function ScrollEffects() {
  const pathname = usePathname();
  const { reducedMotion, lenis } = useMotion();

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

    const splitRestorers: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Global route transition (soft 0.3s fade) & header fade-in
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

      gsap.fromTo(
        "header",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "opacity",
        }
      );

      // 1. Page load: Hero image scale 1.15 -> 1 over 1.8s, headline lines, subline/buttons/strip stagger
      const hero = document.querySelector<HTMLElement>(".hero-section");
      const heroPhoto = hero?.querySelector<HTMLElement>(".hero-photo");
      const heroSubline = hero?.querySelector<HTMLElement>(".hero-subline");
      const heroActions = hero?.querySelector<HTMLElement>(".hero-actions");
      const heroStrip = hero?.querySelector<HTMLElement>(".hero-bottom-strip");

      if (heroPhoto) {
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

      const heroFollowTargets = [heroSubline, heroActions, heroStrip].filter(
        (el): el is HTMLElement => Boolean(el)
      );
      if (heroFollowTargets.length) {
        heroFollowTargets.forEach((el) => el.classList.add("is-revealed"));
        gsap.fromTo(
          heroFollowTargets,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.1,
            delay: 0.28,
            ease: "power3.out",
            clearProps: "transform",
          }
        );
      }

      // 2. Reusable [data-reveal="lines"] and [data-reveal="words"]
      const splitElements = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-reveal="lines"], [data-reveal="words"]'
        )
      );
      splitElements.forEach((element) => {
        if (element.closest("[data-vision-scene]")) return;
        const mode = element.dataset.reveal as "lines" | "words";
        const split = prepareText(element, mode);
        element.classList.add("is-revealed");
        splitRestorers.push(() => {
          element.innerHTML = split.original;
          element.removeAttribute("aria-label");
        });
        if (!split.targets.length) return;

        const delay = numberAttr(element, "delay", 0);
        const stagger = numberAttr(
          element,
          "stagger",
          mode === "lines" ? 0.12 : 0.04
        );
        const isHeroHeading = element.classList.contains("hero-heading");

        if (mode === "lines") {
          gsap.fromTo(
            split.targets,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1.05,
              stagger,
              delay: isHeroHeading ? 0.1 : delay,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: isHeroHeading
                ? undefined
                : {
                    trigger: element,
                    start: "top 85%",
                    once: true,
                  },
            }
          );
        } else {
          const isScrubbed = element.hasAttribute("data-scrub");
          gsap.fromTo(
            split.targets,
            { opacity: 0.15, y: isScrubbed ? 0 : 8 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger,
              delay,
              ease: isScrubbed ? "none" : "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: isScrubbed ? "bottom 55%" : undefined,
                scrub: isScrubbed ? numberAttr(element, "scrub", 0.6) : false,
                once: !isScrubbed,
              },
            }
          );
        }
      });

      // 3. Reusable [data-reveal="up" | "fade-up" | "fade" | "scale"]
      // Exclude elements already handled by hero load timeline
      const standardElements = Array.from(
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
        const delay = numberAttr(element, "delay", 0);
        element.classList.add("is-revealed");
        const fromVars =
          mode === "fade"
            ? { opacity: 0 }
            : mode === "scale"
            ? { opacity: 0, scale: 0.9 }
            : { opacity: 0, y: 34 };
        const toVars =
          mode === "fade"
            ? { opacity: 1 }
            : mode === "scale"
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, y: 0 };

        gsap.fromTo(element, fromVars, {
          ...toVars,
          delay,
          duration: 1.0,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        });
      });

      // 4. Reusable [data-reveal="stagger" | "collage"] using ScrollTrigger.batch
      const batchGroups = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-reveal="stagger"], [data-reveal="collage"]'
        )
      );
      batchGroups.forEach((group) => {
        if (group.hasAttribute("data-horizontal-track")) {
          // On desktop horizontal gallery is pinned; reveal children cleanly on enter
          group.classList.add("is-revealed");
        }
        const children = Array.from(group.children).filter(
          (child): child is HTMLElement => child instanceof HTMLElement
        );
        if (!children.length) return;
        group.classList.add("is-revealed");
        children.forEach((c) => c.classList.add("is-revealed"));

        const isProductGrid = group.classList.contains("product-grid");
        const stagger = numberAttr(group, "stagger", isProductGrid ? 0.08 : 0.1);

        gsap.set(children, { opacity: 0, y: 34 });
        ScrollTrigger.batch(children, {
          start: "top 85%",
          once: true,
          interval: 0.08,
          batchMax: 12,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.95,
              stagger,
              ease: "power3.out",
              overwrite: true,
              clearProps: "transform",
            });
          },
        });
      });

      // 5. Reusable [data-reveal="clip"] for image frames
      document
        .querySelectorAll<HTMLElement>('[data-reveal="clip"]')
        .forEach((frame) => {
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

          gsap.fromTo(
            frame,
            { clipPath: fromClip },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.15,
              ease: "power3.out",
              onComplete: () => {
                frame.style.clipPath = "none";
              },
              scrollTrigger: {
                trigger: frame,
                start: "top 85%",
                once: true,
              },
            }
          );

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.24 },
              {
                scale: 1.15,
                duration: 1.35,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: frame,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          }
        });

      // 6. Reusable hairline draw [data-draw="left" | "center" | "top"]
      document.querySelectorAll<HTMLElement>("[data-draw]").forEach((line) => {
        const dir = line.dataset.draw || "left";
        const isVertical = dir === "top" || dir === "bottom";
        const origin =
          dir === "center"
            ? "center center"
            : dir === "top"
            ? "top center"
            : "left center";
        gsap.set(line, { transformOrigin: origin });
        gsap.fromTo(
          line,
          isVertical ? { scaleY: 0 } : { scaleX: 0 },
          {
            ...(isVertical ? { scaleY: 1 } : { scaleX: 1 }),
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // 7. Count-in numbers [data-count-to]
      document
        .querySelectorAll<HTMLElement>("[data-count-to]")
        .forEach((numEl) => {
          const targetNum = Number.parseInt(numEl.dataset.countTo ?? "1", 10);
          const pad = numEl.dataset.countPad
            ? Number.parseInt(numEl.dataset.countPad, 10)
            : 2;
          const counter = { val: 0 };
          gsap.fromTo(
            numEl,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: numEl,
                start: "top 85%",
                once: true,
                onEnter: () => {
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
                },
              },
            }
          );
        });

      // 8. Product catalog filter change animation (quick fade + 12px y shift)
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
        ctx.add(() => observer.disconnect());
      }

      // 9. Parallax helper (amplitude = 1 on desktop, 0.5 on tablet/mobile)
      const applyParallax = (amplitude: number) => {
        document
          .querySelectorAll<HTMLElement>("[data-parallax]")
          .forEach((element) => {
            if (element.classList.contains("hero-photo")) return;
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
            target.style.willChange = "transform";
            if (target.tagName === "IMG" && !element.hasAttribute("data-reveal")) {
              gsap.set(target, { scale: 1.15 });
            }
            const travel = factor * 100 * amplitude;
            gsap.fromTo(
              target,
              { [axis]: -travel },
              {
                [axis]: travel,
                ease: "none",
                scrollTrigger: {
                  trigger: element,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              }
            );
          });
      };

      // 10. Desktop full effects: (min-width: 1024px)
      mm.add("(min-width: 1024px)", () => {
        applyParallax(1);

        // Hero Scroll (scrubbed, start "top top", end "bottom top")
        if (hero) {
          const heroParallaxLayer =
            hero.querySelector<HTMLElement>(".hero-photo-parallax") ?? heroPhoto;
          const heroHeadlineBlock =
            hero.querySelector<HTMLElement>(".hero-heading-wrap") ??
            hero.querySelector<HTMLElement>(".hero-heading");
          const heroSubBlock = hero.querySelectorAll<HTMLElement>(
            ".hero-subline, .hero-actions"
          );
          const heroBottomStripWrap = hero.querySelector<HTMLElement>(
            ".hero-bottom-strip"
          );
          const heroCopperLine =
            hero.querySelector<HTMLElement>(".hero-copper-line");
          const heroScrollCue =
            hero.querySelector<HTMLElement>(".hero-scroll-cue");

          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });

          if (heroParallaxLayer) {
            heroParallaxLayer.style.willChange = "transform";
            heroTl.fromTo(
              heroParallaxLayer,
              { yPercent: 0 },
              { yPercent: 18, ease: "none" },
              0
            );
          }
          if (heroHeadlineBlock) {
            heroTl.fromTo(
              heroHeadlineBlock,
              { y: 0, opacity: 1 },
              { y: -90, opacity: 0.15, ease: "none" },
              0
            );
          }
          if (heroSubBlock.length) {
            heroTl.fromTo(
              heroSubBlock,
              { y: 0, opacity: 1 },
              { y: -50, opacity: 0, ease: "none" },
              0
            );
          }
          if (heroBottomStripWrap) {
            heroTl.fromTo(
              heroBottomStripWrap,
              { opacity: 1 },
              { opacity: 0, ease: "none" },
              0
            );
          }
          if (heroCopperLine) {
            gsap.set(heroCopperLine, { transformOrigin: "left center" });
            heroTl.fromTo(
              heroCopperLine,
              { scaleX: 0 },
              { scaleX: 1, ease: "none" },
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

        // What Sets Us Apart: sticky photo crossfades + inactive rows at 40% opacity
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

        // Vision & Mission: black overlay scrubbed over first 25% of viewport + pinned 200vh word-by-word reveal & swap
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
            gsap.fromTo(
              blackOverlay,
              { opacity: 0 },
              {
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: visionSection,
                  start: "top bottom",
                  end: "top 75%",
                  scrub: 0.6,
                },
              }
            );
          }

          if (visionWordsHost && missionWordsHost) {
            const vSplit = prepareText(visionWordsHost, "words");
            const mSplit = prepareText(missionWordsHost, "words");
            splitRestorers.push(() => {
              visionWordsHost.innerHTML = vSplit.original;
              visionWordsHost.removeAttribute("aria-label");
              missionWordsHost.innerHTML = mSplit.original;
              missionWordsHost.removeAttribute("aria-label");
            });

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

            // Phase 1: Vision words scrub 0.15 -> 1
            visionTl.to(
              vSplit.targets,
              {
                opacity: 1,
                stagger: 0.04,
                duration: 1,
                ease: "none",
              },
              0
            );
            // Hold Vision briefly, then scale in the copper diamond divider
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
            // Swap emphasis to Mission card and scrub Mission words 0.15 -> 1
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
                stagger: 0.035,
                duration: 1.1,
                ease: "none",
              },
              1.15
            );
            // Restore full visibility at end of pin so both cards read clearly
            if (visionCard) {
              visionTl.to(
                visionCard,
                { opacity: 1, duration: 0.2, ease: "none" },
                2.25
              );
            }
          }
        }

        // Our Approach: pin for ~300vh on desktop, highlight 4 steps one by one, draw progress line
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

        // Portfolio: pinned horizontal gallery on desktop
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

          gsap.to(galleryTrack, {
            x: () => -getDistance(),
            ease: "none",
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

          // Counter-parallax each image inside its frame (xPercent -8 to +8)
          galleryTrack
            .querySelectorAll<HTMLElement>(".collection-gallery-image img")
            .forEach((image) => {
              image.style.willChange = "transform";
              gsap.set(image, { scale: 1.18 });
              gsap.fromTo(
                image,
                { xPercent: -8 },
                {
                  xPercent: 8,
                  ease: "none",
                  scrollTrigger: {
                    trigger: gallery,
                    start: "top top",
                    end: () => `+=${getDistance()}`,
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                  },
                }
              );
            });

          // Collection numbers move at a slightly different speed
          galleryTrack
            .querySelectorAll<HTMLElement>(".collection-gallery-number")
            .forEach((numberEl) => {
              gsap.fromTo(
                numberEl,
                { xPercent: 14 },
                {
                  xPercent: -14,
                  ease: "none",
                  scrollTrigger: {
                    trigger: gallery,
                    start: "top top",
                    end: () => `+=${getDistance()}`,
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                  },
                }
              );
            });
        }

        // CTA band: slides up over the previous section
        const ctaBand = document.querySelector<HTMLElement>(".cta-band");
        if (ctaBand) {
          gsap.fromTo(
            ctaBand,
            { y: 40 },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: ctaBand,
                start: "top bottom",
                end: "top 65%",
                scrub: 0.6,
              },
            }
          );
        }

        // Footer: parallax reveal as #main-content uncovers sticky footer
        const footer = document.querySelector<HTMLElement>(".site-footer");
        const footerInner = footer?.querySelector<HTMLElement>(
          ".footer-parallax-inner"
        );
        const mainContent = document.querySelector<HTMLElement>("#main-content");
        if (footer && footerInner && mainContent) {
          gsap.fromTo(
            footerInner,
            { yPercent: -25 },
            {
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: mainContent,
                start: "bottom bottom",
                end: () => `+=${Math.max(320, footer.offsetHeight)}`,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      // 11. Tablet & Mobile: (max-width: 1023px) — parallax at 50% amplitude, no pinning, reveals only
      mm.add("(max-width: 1023px)", () => {
        applyParallax(0.5);

        // Mobile approach steps fade up individually
        const mobileSteps = Array.from(
          document.querySelectorAll<HTMLElement>("[data-approach-step]")
        );
        mobileSteps.forEach((step) => {
          step.classList.add("is-revealed");
          gsap.fromTo(
            step,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      });

      // 12. CTA Wax Seal stamp (scales 1.25 -> 1 and rotates -6 -> 0 deg once on enter, shadow tightens)
      document
        .querySelectorAll<HTMLElement>(".cta-seal-wrap, .cta-seal-scene")
        .forEach((seal) => {
          gsap.fromTo(
            seal,
            { scale: 1.25, rotation: -6 },
            {
              scale: 1,
              rotation: 0,
              duration: 1.1,
              ease: "power3.out",
              onStart: () => seal.classList.add("is-stamped"),
              scrollTrigger: {
                trigger: seal,
                start: "top 85%",
                once: true,
              },
            }
          );
        });

      // 13. Footer giant wordmark fades up and its letters stagger in
      const mainEl = document.querySelector<HTMLElement>("#main-content");
      const giantWordmark = document.querySelector<HTMLElement>(
        ".footer-giant-wordmark"
      );
      const footerLetters = Array.from(
        document.querySelectorAll<HTMLElement>("[data-footer-letter]")
      );
      if (giantWordmark && mainEl) {
        gsap.fromTo(
          giantWordmark,
          { opacity: 0, y: 24 },
          {
            opacity: 0.22,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mainEl,
              start: "bottom 92%",
              once: true,
            },
          }
        );
      }
      if (footerLetters.length && mainEl) {
        footerLetters.forEach((l) => l.classList.add("is-revealed"));
        gsap.fromTo(
          footerLetters,
          { yPercent: 45, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: mainEl,
              start: "bottom 92%",
              once: true,
            },
          }
        );
      }

      // 14. Marquee strips (.brand-ticker-track, .portfolio-marquee-track):
      // Infinite horizontal loop, velocity speed + skewX (max 6 deg) + direction flip
      const marqueeTracks = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".brand-ticker-track, .portfolio-marquee-track"
        )
      );
      marqueeTracks.forEach((track) => {
        track.style.animation = "none";
        const loop = gsap.to(track, {
          xPercent: -50,
          duration: 34,
          repeat: -1,
          ease: "none",
           modifiers: {
            xPercent: gsap.utils.wrap(-50, 0),
          },
        });

        let currentDirection = 1;
        let idleTimer: number | null = null;

        if (lenis) {
          const onLenisScroll = (event: {
            velocity: number;
            direction: number;
          }) => {
            if (event.direction !== 0) {
              currentDirection = event.direction < 0 ? -1 : 1;
            }
            const clampedVel = Math.min(Math.abs(event.velocity), 3.5);
            const targetScale = currentDirection * (1 + clampedVel * 0.45);
            const targetSkew = Math.max(
              -6,
              Math.min(6, event.velocity * -1.2)
            );

            gsap.to(loop, {
              timeScale: targetScale,
              duration: 0.25,
              overwrite: true,
            });
            gsap.to(track, {
              skewX: targetSkew,
              duration: 0.25,
              overwrite: true,
            });

            if (idleTimer !== null) window.clearTimeout(idleTimer);
            idleTimer = window.setTimeout(() => {
              gsap.to(loop, {
                timeScale: currentDirection,
                duration: 0.6,
                ease: "power3.out",
                overwrite: true,
              });
              gsap.to(track, {
                skewX: 0,
                duration: 0.6,
                ease: "power3.out",
                overwrite: true,
              });
            }, 120);
          };

          lenis.on("scroll", onLenisScroll);
          ctx.add(() => {
            if (idleTimer !== null) window.clearTimeout(idleTimer);
            lenis.off("scroll", onLenisScroll);
            loop.kill();
          });
        } else {
          ctx.add(() => loop.kill());
        }
      });

      // 15. Generic opt-in [data-pin] API for any custom pinned scene
      document.querySelectorAll<HTMLElement>("[data-pin]").forEach((element) => {
        if (
          element.closest("[data-approach-sequence]") ||
          element.closest("[data-vision-scene]")
        ) {
          return;
        }
        mm.add("(min-width: 1024px)", () => {
          const progressHost =
            element.closest<HTMLElement>("[data-scene-progress]") ?? element;
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
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 250);
    if (document.fonts?.ready) {
      void document.fonts.ready.then(refresh);
    }

    return () => {
      window.clearTimeout(timer);
      ctx.revert();
      splitRestorers.forEach((restore) => restore());
      ScrollTrigger.refresh();
    };
  }, [pathname, reducedMotion, lenis]);

  return null;
}
