"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollChoreographer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Sections with [data-choreo]
      const choreoSections = gsap.utils.toArray<HTMLElement>("[data-choreo]");
      choreoSections.forEach((section) => {
        const rule = section.querySelector<HTMLElement>("[data-draw-rule]");
        const ticks = section.querySelectorAll<HTMLElement>("[data-draw-tick]");
        const eyebrow = section.querySelector<HTMLElement>("[data-draw-eyebrow]");

        if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        if (ticks.length) gsap.set(ticks, { scale: 0, opacity: 0 });
        if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 14 });

        ScrollTrigger.create({
          trigger: section,
          start: "top 88%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            if (rule) {
              tl.to(rule, { scaleX: 1, duration: 0.75, ease: "power2.out", clearProps: "transform" }, 0);
            }
            if (eyebrow) {
              tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.15);
            }
            if (ticks.length) {
              tl.to(
                ticks,
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.35,
                  ease: "power3.out",
                  stagger: 0.05,
                  clearProps: "all",
                },
                0.35
              );
            }
          },
        });
      });

      // 2. Individual reveal elements: [data-reveal]
      const revealElements = gsap.utils.toArray<HTMLElement>(
        "[data-reveal]:not([data-reveal-group] [data-reveal])"
      );
      revealElements.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 24 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power2.out",
              clearProps: "transform",
            });
          },
        });
      });

      // 3. Reveal groups with stagger: [data-reveal-group]
      const revealGroups = gsap.utils.toArray<HTMLElement>("[data-reveal-group]");
      revealGroups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!items.length) return;
        gsap.set(items, { opacity: 0, y: 20 });
        ScrollTrigger.create({
          trigger: group,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              clearProps: "transform",
            });
          },
        });
      });
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
