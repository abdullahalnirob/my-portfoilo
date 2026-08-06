"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Line = {
  /** Column the line starts on. Lines step right as they descend. */
  col: number;
  words: string[];
};

type ScrollingHeadlineProps = {
  lines?: Line[];
  /** "ltr" = reading left to right as you scroll down. */
  direction?: "ltr" | "rtl";
  id?: string;
  className?: string;
};

/* "Engineering clean design into fast products" — drawn from the hero copy,
   set on the reference's 1 / 2 / 2 / 1 rhythm so the staircase still reads.
   Opens on column 1 rather than 0 so the first line sits inset from the left
   edge instead of flush against it. Whole columns only — the ruler draws from
   the canvas edge, so a partial offset would knock the type off its own grid. */
const DEFAULT_LINES: Line[] = [
  { col: 1, words: ["Engineering"] },
  { col: 2, words: ["Clean", "Design"] },
  { col: 3, words: ["Into", "Fast"] },
  { col: 5, words: ["Products"] },
];

/* Neue Haas / Helvetica is the face in the reference. Arial and Liberation Sans
   are metric-compatible, so the grid keeps holding on Windows and Linux. */
const DISPLAY_STACK =
  '"Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif';

const RULE = "rgba(0,0,0,0.32)";
/* Over-rendered on purpose — the strip below clips them to the canvas width. */
const TICKS = 40;

const Dot = () => (
  <span
    aria-hidden="true"
    className="inline-block rounded-full bg-current align-baseline"
    style={{
      width: "0.78em",
      height: "0.78em",
      margin: "0 0.34em",
      transform: "translateY(0.11em)",
    }}
  />
);

const ScrollingHeadline = ({
  lines = DEFAULT_LINES,
  direction = "ltr",
  id = "headline",
  className = "",
}: ScrollingHeadlineProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    /* How far the canvas has to travel for its far edge to reach the viewport edge. */
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

    const mm = gsap.matchMedia();

    const from = () => (direction === "rtl" ? -distance() : 0);
    const to = () => (direction === "rtl" ? 0 : -distance());

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(track, { x: from });

      /* No pin: the band is only as tall as its own type, and the horizontal
         travel is spent over the stretch where the band crosses the screen.
         Progress 0 is deliberately not "top bottom" — that puts the opening
         frame at the very bottom edge of the screen, so the canvas is already
         half travelled by the time the band is readable and the first word has
         gone. Starting at 85% means the band is properly in view at rest. */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom 10%",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: from, duration: 0.12 }) // hold — let the first line land
        .to(track, { x: to, ease: "none", duration: 1 })
        .to(track, { x: to, duration: 0.12 }); // hold — same for the last

      /* Webfont swap changes the canvas width, so re-measure once it settles. */
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(track, { clearProps: "x" });
      };
    });

    /* No hijacking for anyone who asked for less motion — the band just scrolls by hand. */
    mm.add("(prefers-reduced-motion: reduce)", () => {
      viewport.style.overflowX = "auto";
      return () => {
        viewport.style.overflowX = "";
      };
    });

    return () => mm.revert();
  }, [direction]);

  /* New copy changes the canvas width, so re-measure instead of rebuilding
     the trigger — an inline `lines` array would otherwise tear it down each render. */
  const linesKey = JSON.stringify(lines);
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [linesKey]);

  const bandHeight = `calc(var(--row) * ${lines.length})`;

  const cssVars = {
    "--col": "clamp(9rem, 22vw, 21rem)",
    "--row": "clamp(3.75rem, 12.5vh, 8.25rem)",
  } as React.CSSProperties;

  return (
    <section
      ref={sectionRef}
      id={id}
      style={cssVars}
      className={`relative bg-white text-black ${className}`}
    >
      <h2 className="sr-only">
        {lines.flatMap((line) => line.words).join(" ")}
      </h2>

      {/* 5px of air top and bottom. The extra 20px up top is the ruler strip,
          not padding — the tick numbers live there, above the first rule. */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        style={{ paddingTop: "25px", paddingBottom: "5px" }}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center will-change-transform"
          aria-hidden="true"
        >
          <div
            className="relative w-max"
            style={{
              paddingRight: "calc(var(--col) * 2)",
              fontFamily: DISPLAY_STACK,
              fontWeight: 700,
              letterSpacing: "-0.035em",
            }}
          >
            {/* Baseline rules — one per row, plus a closing rule under the band. */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0"
              style={{
                height: bandHeight,
                borderBottom: `1px solid ${RULE}`,
                backgroundImage: `linear-gradient(to bottom, ${RULE} 1px, transparent 1px)`,
                backgroundSize: `100% var(--row)`,
              }}
            />

            {/* Column rules, travelling with the type so the grid never slips. */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0"
              style={{
                height: bandHeight,
                backgroundImage: `linear-gradient(to right, ${RULE} 1px, transparent 1px)`,
                backgroundSize: `var(--col) 100%`,
              }}
            />

            {/* Column ticks, sitting above the top rule like a canvas ruler.
                The strip clips them to the canvas width, so they neither spill
                past the last column nor pad out the measured scroll distance. */}
            <div className="pointer-events-none absolute inset-x-0 -top-5 h-5 overflow-hidden">
              {Array.from({ length: TICKS }, (_, i) => i + 1).map((n) => (
                <span
                  key={n}
                  className="absolute bottom-0 select-none font-mono"
                  style={{
                    left: `calc(var(--col) * ${n})`,
                    transform: "translateX(-50%)",
                    fontSize: "0.625rem",
                    letterSpacing: "0.14em",
                    color: "rgba(0,0,0,0.45)",
                  }}
                >
                  {String(n).padStart(2, "0")}
                </span>
              ))}
            </div>

            {lines.map((line, i) => (
              <div
                key={i}
                className="relative whitespace-nowrap"
                style={{
                  height: "var(--row)",
                  fontSize: "var(--row)",
                  lineHeight: "var(--row)",
                  paddingLeft: `calc(var(--col) * ${line.col})`,
                }}
              >
                {i > 0 && <Dot />}
                {line.words.map((word, w) => (
                  <React.Fragment key={word + w}>
                    {w > 0 && <Dot />}
                    {word}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollingHeadline;
