"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GSAP_EASE = "power3.out";
const AUTOPLAY_MS = 7000;

export type Testimonial = {
  id: string;
  quote: string[];
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    id: "sarah-chen",
    quote: [
      "Abdullah transformed our vision into something far more elegant than we imagined. The attention to motion and timing made our product feel alive.",
      "Working with him was seamless — he understood the brief intuitively and delivered ahead of schedule.",
    ],
    name: "Sarah Chen",
    role: "CPO, Luminary",
  },
  {
    id: "marcus-reed",
    quote: [
      "The level of craft in every interaction is rare. Abdullah doesn't just build interfaces — he builds experiences that people remember.",
    ],
    name: "Marcus Reed",
    role: "Founder, Atelier Studio",
  },
  {
    id: "elena-voss",
    quote: [
      "Our conversion rate jumped 40% after the redesign. But more importantly, our users started actually enjoying the product.",
      "Abdullah has this ability to make complex systems feel simple without dumbing anything down.",
    ],
    name: "Elena Voss",
    role: "Head of Product, NovaBridge",
  },
  {
    id: "daniel-okoro",
    quote: [
      "He brought a level of polish that set a new internal standard for us. Every micro-interfection felt intentional and considered.",
    ],
    name: "Daniel Okoro",
    role: "Engineering Lead, Calico",
  },
  {
    id: "aisha-patel",
    quote: [
      "Abdullah is the rare designer who also thinks like an engineer. He challenged our assumptions in the best way and delivered something that actually works.",
      "I've never seen a freelancer care this deeply about the final product.",
    ],
    name: "Aisha Patel",
    role: "CEO, Meridian Labs",
  },
];

const toWords = (line: string) => line.split(/\s+/).filter(Boolean);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);

  const swapRef = useRef<gsap.core.Timeline | null>(null);
  const underlineRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const inViewRef = useRef(false);
  const goToRef = useRef<(next: number) => void>(() => { });

  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const total = testimonials.length;
  const active = testimonials[index];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => { swapRef.current?.kill(); return () => { swapRef.current?.kill(); }; }, []);

  const goTo = useCallback(
    (next: number) => {
      if (next === index || !total) return;

      if (reduceMotion) {
        setIndex(next);
        return;
      }

      swapRef.current?.kill();

      const words = panelRef.current?.querySelectorAll("[data-word]");
      const meta = panelRef.current?.querySelectorAll("[data-meta]");

      const tl = gsap.timeline({ onComplete: () => setIndex(next) });
      if (words?.length) {
        tl.to(words, {
          yPercent: -110,
          duration: 0.4,
          ease: "power2.in",
          stagger: { each: 0.012, from: "start" },
        });
      }
      if (meta?.length) {
        tl.to(meta, { opacity: 0, y: -8, duration: 0.25 }, "<");
      }
      swapRef.current = tl;
    },
    [index, total, reduceMotion]
  );

  useEffect(() => {
    goToRef.current = goTo;
  }, [goTo]);

  useLayoutEffect(() => {
    if (!total) return;
    const panel = panelRef.current;
    if (!panel) return;

    const words = panel.querySelectorAll("[data-word]");
    const meta = panel.querySelectorAll("[data-meta]");

    if (reduceMotion) {
      gsap.set([...words, ...meta], { yPercent: 0, y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        words,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.85,
          ease: GSAP_EASE,
          stagger: { each: 0.018, from: "start" },
        }
      ).fromTo(
        meta,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: GSAP_EASE, stagger: 0.08 },
        "-=0.5"
      );
    }, panel);

    return () => ctx.revert();
  }, [index, total, reduceMotion]);

  useEffect(() => {
    if (!total || reduceMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Track visibility for autoplay – no skew anymore
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          inViewRef.current = self.isActive;
        },
      });
      inViewRef.current = st.isActive;

      // Mark (giant quote) still moves with scroll
      gsap.fromTo(
        markRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );

      // Fade-up reveals
      gsap.from("[data-reveal]", {
        y: 44,
        opacity: 0,
        duration: 0.9,
        ease: GSAP_EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: section, start: "top 78%" },
      });
    }, section);

    return () => ctx.revert();
  }, [total, reduceMotion]);

  useEffect(() => {
    if (!total || total < 2) return;

    underlineRefs.current.forEach((el, i) => {
      el.style.transform = i === index ? "scaleX(0)" : "scaleX(0)";
    });

    if (reduceMotion) {
      const el = underlineRefs.current.get(index);
      if (el) el.style.transform = "scaleX(1)";
      return;
    }

    const el = underlineRefs.current.get(index);
    let raf = 0;
    let start: number | null = null;
    let pauseStartedAt: number | null = null;
    let pausedTotal = 0;

    const tick = (now: number) => {
      const running = inViewRef.current;

      if (!running) {
        if (start !== null && pauseStartedAt === null) {
          pauseStartedAt = now;
        }
        raf = requestAnimationFrame(tick);
        return;
      }

      if (pauseStartedAt !== null) {
        if (start !== null) {
          pausedTotal += now - pauseStartedAt;
        }
        pauseStartedAt = null;
      }

      if (start === null) {
        start = now;
      }

      const elapsed = now - start - pausedTotal;
      const progress = Math.min(elapsed / AUTOPLAY_MS, 1);
      if (el) el.style.transform = `scaleX(${progress})`;

      if (progress >= 1) {
        goToRef.current((index + 1) % total);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, total, reduceMotion]);

  if (!total || !active) return null;

  const renderNames = () => (
    <ul
      className="m-0 list-none p-0"
      role="tablist"
      aria-label="Clients"
      aria-orientation="vertical"
    >
      {testimonials.map((t, i) => {
        const isActive = i === index;
        return (
          <li key={t.id}>
            <button
              type="button"
              role="tab"
              id={`testimonial-tab-${t.id}`}
              aria-selected={isActive}
              aria-controls="testimonial-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => goTo(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  e.preventDefault();
                  goTo((i + 1) % total);
                }
                if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  goTo((i - 1 + total) % total);
                }
              }}
              className={`font-bricolage-medium block w-full py-2 text-left text-2xl leading-tight tracking-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D84315] md:text-3xl lg:text-4xl ${isActive
                  ? "text-[#D84315] md:translate-x-3"
                  : "text-[#2B2B2B]/25 hover:text-[#2B2B2B]/60"
                }`}
            >
              {t.name}
            </button>
            <div className="mt-1 h-px w-full bg-[#2B2B2B]/15">
              <div
                ref={(el) => {
                  if (el) underlineRefs.current.set(i, el);
                  else underlineRefs.current.delete(i);
                }}
                style={{ transform: "scaleX(0)" }}
                className="h-px origin-left bg-[#D84315]"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-28 lg:py-32"
    >
      <span
        ref={markRef}
        aria-hidden="true"
        className="font-bricolage-bold pointer-events-none absolute -right-4 top-10 select-none text-[22rem] leading-none text-[#2B2B2B]/[0.04] md:right-8 md:text-[34rem]"
      >
        &rdquo;
      </span>

      <div className="relative px-5 sm:px-8 md:px-28">
        <div
          data-reveal
          className="flex items-center gap-4 border-t border-[#2B2B2B]/20 pt-5 md:pt-6"
        >
          <p className="text-[10px] tracking-[0.3em] text-[#2B2B2B] md:text-xs">
            TESTIMONIALS
          </p>
          <span className="font-geist-mono text-[10px] text-[#2B2B2B]/70 md:text-xs">
            / 05
          </span>
        </div>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-8">
          <h2
            data-reveal
            className="font-bricolage-medium text-balance text-3xl leading-[1.08] tracking-tight text-[#2B2B2B] sm:text-4xl md:col-span-8 md:text-[3.25rem]"
          >
            The people who paid for the work, in their own words.
          </h2>

          <p
            data-reveal
            className="font-bricolage-light max-w-sm text-sm leading-relaxed text-[#2B2B2B]/70 md:col-span-4 md:self-end"
          >
            Names and roles attached, exactly as they were given.
          </p>
        </div>

        <div
          data-reveal
          className="mt-14 grid gap-10 border-t border-[#2B2B2B]/15 pt-10 md:mt-20 md:grid-cols-12 md:gap-12 md:pt-14"
        >
          <div className="md:col-span-4 lg:col-span-5">
            <div ref={railRef} className="will-change-transform">
              {renderNames()}
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-7">
            <div
              ref={panelRef}
              id="testimonial-panel"
              role="tabpanel"
              aria-labelledby={`testimonial-tab-${active.id}`}
              aria-live="polite"
              className="flex h-[20rem] max-h-[20rem] flex-col justify-between overflow-hidden md:h-[26rem] md:max-h-[26rem]"
            >
              <blockquote className="m-0 flex-1 overflow-y-auto pr-2 scrollbar-none">
                {active.quote.map((line, li) => (
                  <p
                    key={li}
                    className="font-bricolage-medium mt-0 text-pretty text-xl leading-[1.35] tracking-tight text-[#2B2B2B] first:mt-0 sm:text-2xl md:text-3xl lg:text-[2.25rem] [&:not(:first-child)]:mt-5"
                  >
                    {toWords(line).map((word, wi) => (
                      <span
                        key={wi}
                        className="inline-block overflow-hidden pb-[0.18em] align-bottom mb-[-0.18em] mr-[0.26em]"
                      >
                        <span data-word className="inline-block">
                          {word === " " ? " " : word}
                        </span>
                      </span>
                    ))}
                  </p>
                ))}
              </blockquote>

              <footer className="mt-10">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p
                      data-meta
                      className="font-bricolage-medium text-base text-[#2B2B2B] md:text-lg"
                    >
                      {active.name}
                    </p>
                    <p
                      data-meta
                      className="font-bricolage-light mt-1 text-sm text-[#2B2B2B]/60"
                    >
                      {active.role}
                    </p>
                  </div>

                  <span
                    data-meta
                    className="font-geist-mono shrink-0 text-[10px] tracking-[0.2em] text-[#2B2B2B]/50 md:text-xs"
                  >
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(total).padStart(2, "0")}
                  </span>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;