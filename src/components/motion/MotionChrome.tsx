"use client";

import { useEffect } from "react";
import Image from "next/image";

export function MotionChrome() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: number | undefined;
    const preloader = document.querySelector<HTMLElement>(".site-preloader");
    if (!reduce && !sessionStorage.getItem("naqsh-intro-seen")) {
      preloader?.classList.add("is-active");
      timer = window.setTimeout(() => { preloader?.classList.remove("is-active"); sessionStorage.setItem("naqsh-intro-seen", "1"); }, 1200);
    } else preloader?.remove();
    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    const update = () => {
      if (progress) { const max = document.documentElement.scrollHeight - innerHeight; progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`; }
    };
    const move = (event: PointerEvent) => {
      if (!cursor || matchMedia("(pointer: coarse)").matches) return;
      cursor.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor-label]");
      cursor.classList.toggle("is-over", !!target);
      cursor.dataset.label = target?.dataset.cursorLabel ?? "";
      const magnetic = (event.target as HTMLElement).closest<HTMLElement>(".btn,.header-cta");
      if (magnetic) { const box = magnetic.getBoundingClientRect(); magnetic.style.setProperty("--mag-x", `${Math.max(-8,Math.min(8,(event.clientX-box.left-box.width/2)*.12))}px`); magnetic.style.setProperty("--mag-y", `${Math.max(-8,Math.min(8,(event.clientY-box.top-box.height/2)*.12))}px`); }
    };
    const resetMag = (event: PointerEvent) => { const el=(event.target as HTMLElement).closest<HTMLElement>(".btn,.header-cta"); el?.style.setProperty("--mag-x","0px");el?.style.setProperty("--mag-y","0px"); };
    addEventListener("scroll", update, { passive:true }); addEventListener("resize",update); addEventListener("pointermove",move,{passive:true}); addEventListener("pointerout",resetMag); update();
    return () => { if(timer) clearTimeout(timer);removeEventListener("scroll",update);removeEventListener("resize",update);removeEventListener("pointermove",move);removeEventListener("pointerout",resetMag); };
  }, []);
  return <><div className="scroll-progress" aria-hidden="true"/><div className="custom-cursor" aria-hidden="true"/><div className="site-preloader" aria-hidden="true"><Image src="/brand/emblem-copper.svg" alt="" width={74} height={74}/><span className="sr-only">NAQSH</span></div></>;
}
