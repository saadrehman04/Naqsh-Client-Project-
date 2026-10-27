"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "./MotionProvider";

export function ScrollEffects() {
  const pathname = usePathname();
  const { reducedMotion, lenis } = useMotion();

  useEffect(() => {
    // When reduced motion is preferred, immediately show all elements without animation
    if (reducedMotion) {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
        (el as HTMLElement).style.clipPath = "none";
      });
      return;
    }

    // Scroll to top on route change
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Use GSAP context for clean lifecycle scoping
    let approachMedia: ReturnType<typeof gsap.matchMedia> | null = null;
    const ctx = gsap.context(() => {
      gsap.fromTo("#main-content", { opacity: 0.94 }, { opacity: 1, duration: 0.32, ease: "power3.out", clearProps: "opacity" });

      // 1. Fade-Up Reveals
      const fadeElements = document.querySelectorAll('[data-reveal="fade-up"]');
      fadeElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      // 2. Stagger Reveals
      const staggerContainers = document.querySelectorAll('[data-reveal="stagger"]');
      staggerContainers.forEach((container) => {
        const children = container.children;
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 86%",
                once: true,
              },
            }
          );
        }
      });

      // 3. Product/collection cards assemble from alternating sides, like
      // the layered creative panels in the reference video.
      const collageContainers = document.querySelectorAll('[data-reveal="collage"]');
      collageContainers.forEach((container) => {
        const children = Array.from(container.children);
        if (children.length === 0) return;

        gsap.fromTo(
          children,
          {
            opacity: 0,
            y: 44,
            x: (index) => (index % 2 === 0 ? -24 : 24),
            rotate: (index) => (index % 2 === 0 ? -1.2 : 1.2),
            scale: 0.98,
          },
          {
            immediateRender: false,
            opacity: 1,
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: container,
              start: "top 84%",
              once: true,
            },
          }
        );
      });

      // 4. Product tiles drift into the collection introduction, then float
      // gently in place. They are decorative and hidden from assistive tech.
      const floatTiles = document.querySelectorAll<HTMLElement>("[data-float-tile]");
      floatTiles.forEach((tile, index) => {
        gsap.fromTo(
          tile,
          { opacity: 0, y: 22, scale: 0.92 },
          {
            immediateRender: false,
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            onComplete: () => tile.classList.add("is-floating"),
            scrollTrigger: {
              trigger: tile.parentElement,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      // 5. Desktop approach sequence: pin the editorial intro through CSS,
      // highlight each step as it reaches the reading line, and draw the rail.
      const approachSection = document.querySelector<HTMLElement>("[data-approach-sequence]");
      const approachSteps = Array.from(
        document.querySelectorAll<HTMLElement>("[data-approach-step]")
      );
      const approachProgress = document.querySelector<HTMLElement>("[data-approach-progress]");
      if (approachSection && approachSteps.length && approachProgress) {
        approachMedia = gsap.matchMedia();
        approachMedia.add("(min-width: 64rem)", () => {
          let activeIndex = -1;
          const setActiveStep = (index: number) => {
            if (activeIndex === index) return;
            activeIndex = index;
            approachSteps.forEach((step, stepIndex) => {
              step.classList.toggle("is-active", stepIndex === index);
              step.setAttribute("aria-current", stepIndex === index ? "step" : "false");
            });
          };

          approachSteps.forEach((step, index) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 58%",
              end: "bottom 42%",
              onEnter: () => setActiveStep(index),
              onEnterBack: () => setActiveStep(index),
            });
          });

          gsap.fromTo(
            approachProgress,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: approachSection,
                start: "top center",
                end: "bottom center",
                scrub: 0.6,
              },
            }
          );

          return () => {
            approachSteps.forEach((step) => {
              step.classList.remove("is-active");
              step.removeAttribute("aria-current");
            });
          };
        });
      }

      // 6. Clip Reveals (for photos)
      const clipElements = document.querySelectorAll('[data-reveal="clip"]');
      clipElements.forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });

        tl.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power3.inOut" }
        );

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.12 },
            { scale: 1, duration: 1.3, ease: "power2.out" },
            0
          );
        }
      });

      // 7. Subtle Parallax (Scrubbed)
      const parallaxElements = document.querySelectorAll("[data-parallax]");
      parallaxElements.forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

      // Editorial gallery: native horizontal overflow remains available without JS.
      const gallery = document.querySelector<HTMLElement>("[data-horizontal-gallery]");
      const galleryTrack = gallery?.querySelector<HTMLElement>("[data-horizontal-track]");
      if (gallery && galleryTrack) {
        gsap.matchMedia().add("(min-width: 1024px)", () => {
          const distance = () => Math.max(0, galleryTrack.scrollWidth - window.innerWidth);
          gsap.to(galleryTrack, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: gallery, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true } });
        });
      }

      // Vision and mission resolve word by word while their scene is pinned.
      const vision = document.querySelector<HTMLElement>("[data-vision-scene]");
      const statements = Array.from(document.querySelectorAll<HTMLElement>("[data-vision-statement]"));
      if (vision && statements.length) {
        statements.forEach((statement) => {
          const heading = statement.querySelector("h2");
          if (!heading) return;
          const words = heading.textContent?.trim().split(/\\s+/) ?? [];
          heading.setAttribute("aria-label", words.join(" "));
          heading.innerHTML = words.map((word) => `<span class="vision-word">${word}</span>`).join(" ");
        });
        gsap.matchMedia().add("(min-width: 768px)", () => {
          const wordSpans = statements.map((statement) => Array.from(statement.querySelectorAll(".vision-word")));
          const tl = gsap.timeline({ scrollTrigger: { trigger: vision, start: "top top", end: "+=220%", pin: true, scrub: 0.8 } });
          tl.fromTo(wordSpans[0], { opacity: 0.5 }, { opacity: 1, stagger: 0.035, duration: Math.max(1, wordSpans[0].length * 0.035) }, 0);
          tl.set(statements[0], { visibility: "hidden" }, ">+0.25");
          tl.set(statements[1], { visibility: "visible" }, "<");
          tl.fromTo(wordSpans[1], { opacity: 0.5 }, { opacity: 1, stagger: 0.035, duration: Math.max(1, wordSpans[1].length * 0.035) }, "<");
          return () => statements.forEach((statement) => {
            const h = statement.querySelector("h2");
            if (h) h.textContent = h.getAttribute("aria-label") ?? h.textContent ?? "";
          });
        });
      }

      // Crossfade the promise photographs as each statement enters the reading line.
      const whyItems = Array.from(document.querySelectorAll<HTMLElement>("[data-why-item]"));
      const whyImages = Array.from(document.querySelectorAll<HTMLElement>("[data-why-image]"));
      whyItems.forEach((item, index) => ScrollTrigger.create({ trigger: item, start: "top 58%", end: "bottom 42%", onEnter: () => whyImages.forEach((image, i) => image.classList.toggle("is-active", i === index)), onEnterBack: () => whyImages.forEach((image, i) => image.classList.toggle("is-active", i === index)) }));

      // Reusable data-speed parallax helper for decorative layers.
      document.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = Number(el.dataset.speed) || 0.08;
        gsap.to(el, { yPercent: speed * -100, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 } });
      });
    });

    // Refresh triggers once layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      approachMedia?.revert();
      ctx.revert();
    };
  }, [pathname, reducedMotion, lenis]);

  return null;
}
