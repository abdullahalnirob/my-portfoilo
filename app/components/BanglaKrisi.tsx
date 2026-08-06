"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bdImage from "@/app/images/bd_flag.jpg";

gsap.registerPlugin(ScrollTrigger);

const BOX_SIZE = 45;
const BAND_FRACTION = 1 / 3;
const BOX_COLOR = "#FFF";
const MIN_FLIPS = 2;
const MAX_FLIPS = 4;
const LOCK_START = 0.6; // after this scroll progress, boxes start permanently locking to filled

const BanglaKrisi = (): React.JSX.Element => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [grid, setGrid] = useState({ cols: 0, rows: 0, bandHeight: 0 });

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const computeGrid = () => {
      const { width, height } = frame.getBoundingClientRect();
      const bandHeight = height * BAND_FRACTION;
      const cols = Math.max(1, Math.round(width / BOX_SIZE));
      const rows = Math.max(1, Math.round(bandHeight / BOX_SIZE));
      setGrid({ cols, rows, bandHeight });
    };

    computeGrid();
    const ro = new ResizeObserver(computeGrid);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!overlayRef.current || grid.cols === 0 || grid.rows === 0) return;

    const ctx = gsap.context(() => {
      const boxes = overlayRef.current!.querySelectorAll<HTMLDivElement>(".reveal-box");

      // flicker points before locking
      const flipMaps: number[][] = Array.from(boxes).map(() => {
        const flipCount = gsap.utils.random(MIN_FLIPS, MAX_FLIPS, 1);
        const points = Array.from({ length: flipCount }, () =>
          gsap.utils.random(0, LOCK_START)
        );
        return points.sort((a, b) => a - b);
      });

      // each box permanently locks to filled somewhere between LOCK_START and 1
      const lockPoints: number[] = Array.from(boxes).map(() =>
        gsap.utils.random(LOCK_START, 1)
      );

      gsap.set(boxes, { opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 40%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          boxes.forEach((box, i) => {
            let shouldFill: boolean;

            if (progress >= lockPoints[i]) {
              // locked in — stays filled from here on (even scrolling back down
              // past lock point will keep it filled, only unlocks below LOCK_START area via flicker logic)
              shouldFill = true;
            } else {
              const flips = flipMaps[i].filter((p) => p <= progress).length;
              shouldFill = flips % 2 === 1;
            }

            gsap.to(box, {
              opacity: shouldFill ? 1 : 0,
              duration: 0.2,
              ease: "power1.out",
              overwrite: "auto",
            });
          });
        },
      });
    }, overlayRef);

    return () => ctx.revert();
  }, [grid]);

  const { cols, rows, bandHeight } = grid;
  const totalBoxes = cols * rows;

  return (
    <section className="mt-10" id="bangla-krisi" ref={sectionRef}>
      <div
        ref={frameRef}
        className="relative h-80 w-full overflow-hidden sm:h-105 md:h-[70vh] md:max-h-180 md:min-h-120"
      >
        <Image
          src={bdImage}
          alt="Bangla Krisi"
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
        />

        {totalBoxes > 0 && (
          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 grid"
            style={{
              height: bandHeight,
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
          >
            {Array.from({ length: totalBoxes }).map((_, i) => (
              <div
                key={i}
                className="reveal-box"
                style={{ backgroundColor: BOX_COLOR }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BanglaKrisi;