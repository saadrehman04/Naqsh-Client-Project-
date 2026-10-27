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
    const ctx = gsap.context(() => {
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

      // 3. Clip Reveals (for photos)
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

      // 4. Subtle Parallax (Scrubbed)
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
    });

    // Refresh triggers once layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [pathname, reducedMotion, lenis]);

  return null;
}
