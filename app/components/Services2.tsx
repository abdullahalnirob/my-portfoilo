"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import shapeStar from "@/app/images/3d-star.png"
gsap.registerPlugin(ScrollTrigger);

const PANEL = "relative overflow-hidden rounded-2xl h-[415px] p-6 md:p-7";
const LABEL = "text-[11px] md:text-xs tracking-[0.12em] uppercase";
const CAPTION = "font-bricolage-light text-sm leading-snug";
const NUMBER = "font-bricolage-light leading-none text-5xl md:text-6xl";

/* the small double-chevron mark that sits above the caption */
const Mark = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 32 18"
    fill="none"
    aria-hidden="true"
    className={`h-4 w-7 ${className}`}
  >
    <path
      d="M1 1L8 16L16 4L24 16L31 1"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Services2 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-panel]", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services-2"
      className="bg-[#F4F4F2] py-14 sm:py-16 md:py-20"
    >
      <div className="px-5 sm:px-8 md:px-28">
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {/* ---------- 01 — dark, label left ---------- */}
          <article data-panel className={`${PANEL} bg-[#2B2B2B]`}>
            <p className={`${LABEL} text-left text-white/85`}>
              Services offered
            </p>

            <div className="absolute inset-x-4 top-20 bottom-32">
              <Image
                src="/my_hero.png"
                alt="Abdullah Al Nirob"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain object-bottom"
              />
            </div>

            <div className="absolute inset-x-6 bottom-6 md:inset-x-7 md:bottom-7">
              <Mark className="mb-6 text-white/70" />
              <div className="flex items-end justify-between gap-4">
                <p className={`${CAPTION} max-w-[11rem] text-white/60`}>
                  Three services, taken from
                  <br />
                  first sketch to launch.
                </p>
                <p className={`${NUMBER} text-white`}>
                  03<sup className="align-super text-2xl md:text-3xl">+</sup>
                </p>
              </div>
            </div>
          </article>

          {/* ---------- 02 — light, label centred ---------- */}
          <article
            data-panel
            className={`${PANEL} flex flex-col items-center justify-between bg-[#E9E9E7]`}
          >
            <p className={`${LABEL} text-center text-[#1A1A1A]`}>
              Projects completed
            </p>

            <div className="grid h-[200px] w-[200px] place-items-center rounded-full bg-white shadow-[0_18px_60px_-20px_rgba(0,0,0,0.18)] md:h-[215px] md:w-[215px]">
              <p className={`${NUMBER} text-[#1A1A1A]`}>
                10<sup className="align-super text-2xl md:text-3xl">+</sup>
              </p>
            </div>

            <p className={`${CAPTION} text-center text-[#1A1A1A]/60`}>
              90% of my clients come back
              <br />
              for a second project.
            </p>
          </article>

          {/* ---------- 03 — dark, label right ---------- */}
          <article data-panel className={`${PANEL} bg-[#333333]`}>
            <p className={`${LABEL} text-right text-white/85`}>
              Years building
            </p>

            <div className="absolute inset-x-6 top-[68px] h-[215px] overflow-hidden rounded-md md:inset-x-7">
              <Image
                src={shapeStar.src}
                alt="Workspace"
                fill
                sizes=""
                className=""
              />
            </div>

            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 md:inset-x-7 md:bottom-7">
              <p className={`${CAPTION} text-white/60`}>
                Different problems.
                <br />
                One standard.
              </p>
              <p className={`${NUMBER} text-white`}>
                2<sup className="align-super text-2xl md:text-3xl">+</sup>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Services2;
