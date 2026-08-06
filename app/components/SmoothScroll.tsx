"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const mm = gsap.matchMedia();

    /* Anyone who asked for less motion keeps the browser's native scrolling —
       inertia scroll is exactly the kind of thing that setting turns off. */
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
      });

      /* Webfonts landing late change section heights, which moves every trigger. */
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => smoother.kill();
    });

    return () => mm.revert();
  }, []);

  /* ScrollSmoother applies the wrapper/content styling itself. Deliberately not
     setting it in CSS: if it were hardcoded, a reduced-motion visitor (no smoother)
     would get a fixed, unscrollable page. */
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
};

export default SmoothScroll;
