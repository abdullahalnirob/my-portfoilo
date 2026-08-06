"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { LuArrowUpRight, LuGithub } from "react-icons/lu";

type CategoryId = "raw" | "frontend" | "fullstack" | "client" | "video";

/* A name that mixes scripts is split so each run can carry its own `lang`.
   Screen readers and font fallback both need it. */
type NamePart = { text: string; lang?: string };

type Project = {
  name: string;
  nameParts?: NamePart[];
  category: CategoryId;
  year: string;
  summary: string;
  tech: string[];
  responsive: boolean;
  img: string;
  link: string;
};

const categoryLabel: Record<CategoryId, string> = {
  raw: "Raw code",
  frontend: "Frontend",
  fullstack: "Full-stack",
  client: "Client work",
  video: "Ads video",
};

/* Strongest work first — with no filter/category tabs anymore, this order
   is the only thing deciding what a client reads top to bottom. Years are
   placeholders based on rough chronology — swap in the real ones. */
const projects: Project[] = [
  {
    name: 'Gimox Gym Management',
    category: "fullstack",
    year: "2026",
    summary: 'Gimox Gym Management is a modern and responsive platform built to simplify gym operations. It offers tools for managing members, payments, trainers, and schedules with a smooth and intuitive interface. Powered by React, Firebase, Express, and MongoDB, it delivers fast performance, secure access, and seamless Stripe payment integration.',
    tech: [
      'React',
      'Tailwindcss',
      'MUI',
      'Framer-motion',
      'Firebase',
      'Express',
      'MongoDB',
      'JWT',
      'Stripe',
    ],
    responsive: true,
    img: "https://i.ibb.co.com/knd46mf/scrnli-q-A8-D7-Y7y15k-N4g.png",
    link: 'https://gimox.surge.sh/',
  },
  {
    name: 'Samusa Blog',
    category: "fullstack",
    year: "2026",
    summary:
      "A modern and responsive blog platform designed to deliver a smooth reading and publishing experience. Built using React, Firebase, and Tailwind CSS, it showcases clean design, fast performance, and dynamic features with an intuitive user interface.",
    tech: [
      'React',
      'Tailwindcss',
      'Framer-motion',
      'Firebase',
      'Express',
      'MongoDB',
      'JWT',
    ],
    responsive: true,
    img: 'https://i.ibb.co.com/RJrqWty/Screenshot-2025-06-29-110534.png',
    link: 'https://samusa-blog.web.app/',
  },
  {
    name: "Spa Services",
    category: "frontend",
    year: "2024",
    summary:
      "Booking-oriented spa site carried by scroll-triggered AOS animations.",
    tech: ["React", "Tailwind CSS", "AOS"],
    responsive: true,
    img: "https://i.ibb.co.com/HDtCg74K/888.png",
    link: "https://spaweb4455.vercel.app/",
  },
  {
    name: "Browse4Pets",
    category: "raw",
    year: "2023",
    summary: "Pet adoption browser with category tabs over a responsive card grid.",
    tech: ["HTML", "Tailwind CSS"],
    responsive: true,
    img: "https://i.ibb.co.com/B2bgxvJc/33.png",
    link: "https://abdullahalnirob.github.io/ph-assignment-03/",
  },
];

type Item = Project & { index: string; host: string };

const items: Item[] = projects.map((p, i) => ({
  ...p,
  index: String(i + 1).padStart(2, "0"),
  host: new URL(p.link).hostname.replace(/^www\./, ""),
}));

const total = items.length;

const ProjectName = ({ item }: { item: Item }) =>
  item.nameParts ? (
    <>
      {item.nameParts.map((part) => (
        <span key={part.text} lang={part.lang}>
          {part.text}
        </span>
      ))}
    </>
  ) : (
    <>{item.name}</>
  );

/* Preview image size in px — used both for rendering and for keeping the
   floating preview inside the viewport. */
const PREVIEW_W = 340;
const PREVIEW_H = 240;

const Projects = () => {
  const [hovered, setHovered] = useState<Item | null>(null);
  const reduce = useReducedMotion();

  const wrapRef = useRef<HTMLDivElement>(null); // fixed-position layer, moved by GSAP
  const finePointer = useRef(false);
  const lastX = useRef(0);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);
  const quickRotate = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    finePointer.current =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!wrapRef.current || !finePointer.current) return;

    gsap.set(wrapRef.current, { x: -9999, y: -9999, rotate: 0 });

    quickX.current = gsap.quickTo(wrapRef.current, "x", {
      duration: reduce ? 0 : 0.55,
      ease: "power3",
    });
    quickY.current = gsap.quickTo(wrapRef.current, "y", {
      duration: reduce ? 0 : 0.55,
      ease: "power3",
    });
    quickRotate.current = gsap.quickTo(wrapRef.current, "rotate", {
      duration: reduce ? 0 : 0.6,
      ease: "power3",
    });
  }, [reduce]);

  /* GSAP owns raw cursor tracking — it runs outside React's render cycle so
     the 60fps follow never triggers a re-render. Motion (below) only reacts
     to the much rarer "which project is hovered" state change. */
  const handleMove = (e: React.MouseEvent) => {
    if (!finePointer.current || !quickX.current || !quickY.current) return;

    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;

    const maxX = window.innerWidth - PREVIEW_W - 24;
    const maxY = window.innerHeight - PREVIEW_H - 24;
    const targetX = Math.min(Math.max(e.clientX + 32, 24), Math.max(maxX, 24));
    const targetY = Math.min(Math.max(e.clientY - 180, 24), Math.max(maxY, 24));

    quickX.current(targetX);
    quickY.current(targetY);
    quickRotate.current?.(Math.max(-9, Math.min(9, dx * 0.8)));
  };

  return (
    <section id="projects" className="relative bg-[#DEDEDA] py-16 sm:py-20 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_55%_at_50%_0%,rgba(244,244,242,0.85),rgba(244,244,242,0)_62%)]"
      />

      {/* Floating hover preview — positioned by GSAP, mounted/unmounted by Motion */}
      <div
        ref={wrapRef}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden will-change-transform md:block"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.name}
              initial={{
                opacity: 0,
                scale: 0.86,
                filter: reduce ? "blur(0px)" : "blur(16px)",
              }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                scale: 0.92,
                filter: reduce ? "blur(0px)" : "blur(10px)",
              }}
              transition={{ duration: reduce ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: PREVIEW_W, height: PREVIEW_H }}
              className="relative overflow-hidden rounded-[18px] bg-[#2B2B2B] shadow-[0_50px_90px_-40px_rgba(43,43,43,0.55)] ring-1 ring-[#2B2B2B]/10"
            >
              <Image
                src={hovered.img}
                alt=""
                fill
                sizes={`${PREVIEW_W}px`}
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/25 via-transparent to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative px-5 sm:px-8 md:px-28">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 border-t border-[#2B2B2B]/20 pt-5 md:pt-6"
        >
          <p className="text-[10px] tracking-[0.3em] text-[#2B2B2B] md:text-xs">PROJECTS</p>
          <span className="font-geist-mono text-[10px] text-[#2B2B2B]/70 md:text-xs">/ 03</span>
        </motion.div>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-bricolage-medium text-balance text-3xl leading-[1.08] tracking-tight text-[#2B2B2B] sm:text-4xl md:col-span-8 md:text-[3.25rem]"
          >
            {total} projects, all live. Hover a name to see it before you click.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-bricolage-light max-w-sm text-sm leading-relaxed text-[#2B2B2B]/70 md:col-span-4 md:self-end"
          >
            Ordered by what I would show a client first. Nothing here is a mockup.
          </motion.p>
        </div>

        {/* The list */}
        <div
          onMouseMove={handleMove}
          onMouseLeave={() => setHovered(null)}
          className="mt-16 md:mt-20"
        >
          {items.map((project) => {
            const dimmed = hovered !== null && hovered.name !== project.name;
            return (
              <a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noreferrer noopener"
                onMouseEnter={() => setHovered(project)}
                onFocus={() => setHovered(project)}
                onBlur={() => setHovered(null)}
                className={`group relative flex items-center gap-4 border-t border-[#2B2B2B]/15 py-4 transition-opacity duration-500 last:border-b focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2B2B2B] md:grid md:grid-cols-12 md:gap-6 md:py-5 ${dimmed ? "opacity-35" : "opacity-100"
                  }`}
              >
                <span className="font-geist-mono hidden text-xs text-[#2B2B2B]/70 md:col-span-1 md:block">
                  {project.index}
                </span>

                {/* Inline thumbnail — sized like the grid column it sits in
                   (not a fixed small box), so the image actually reads */}
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-[#2B2B2B] ring-1 ring-[#2B2B2B]/10 md:col-span-2 md:h-16 md:w-full">
                  <Image
                    src={project.img}
                    alt={`${project.name} — screenshot of the live site`}
                    fill
                    sizes="(min-width: 768px) 15vw, 80px"
                    className="object-cover object-top grayscale transition duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>

                <div className="min-w-0 flex-1 md:col-span-4">
                  <p className="font-geist-mono text-[10px] tracking-[0.2em] text-[#2B2B2B]/60">
                    {categoryLabel[project.category].toUpperCase()} · {project.year}
                  </p>
                  <h4 className="font-bricolage-medium mt-1 truncate text-lg leading-tight tracking-tight text-[#2B2B2B] transition-colors duration-300 group-hover:text-[#D84315] md:text-xl">
                    <ProjectName item={project} />
                  </h4>
                  <p className="font-geist-mono mt-1 truncate text-[11px] text-[#2B2B2B]/70 md:hidden">
                    {project.tech.join(" · ")}
                  </p>
                </div>

                <p className="font-geist-mono hidden truncate text-[11px] text-[#2B2B2B]/70 md:col-span-3 md:block">
                  {project.tech.join(" · ")}
                </p>

                <div className="flex shrink-0 items-center gap-2 md:col-span-2 md:justify-end">
                  <span className="font-geist-mono hidden truncate text-[11px] text-[#2B2B2B]/70 transition-colors duration-300 group-hover:text-[#D84315] lg:inline">
                    {project.host}
                  </span>
                  <LuArrowUpRight className="shrink-0 text-base text-[#2B2B2B]/40 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D84315]" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col gap-6 border-t border-[#2B2B2B]/20 pt-8 md:mt-24 md:flex-row md:items-center md:justify-between"
        >
          <p className="font-bricolage-light max-w-md text-sm text-[#2B2B2B]/70">
            The experiments that never got a domain still live on GitHub — commit history
            included.
          </p>

          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <a
              href="https://github.com/abdullahalnirob"
              target="_blank"
              rel="noreferrer noopener"
              className="w-full sm:w-auto"
            >
              <button className="group relative w-full rounded-full bg-black px-8 py-3 text-[#F4F4F2] sm:w-auto">
                <span className="relative inline-flex w-full items-center justify-center gap-2 overflow-hidden">
                  <LuGithub className="shrink-0" />
                  <span className="relative inline-flex overflow-hidden">
                    <span className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                      Browse the code
                    </span>
                    <span className="absolute translate-y-[114%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                      Browse the code
                    </span>
                  </span>
                </span>
              </button>
            </a>

            <a href="#contact" className="w-full sm:w-auto">
              <button className="w-full rounded-full bg-transparent px-8 py-3 text-[#2B2B2B] ring-1 ring-[#2B2B2B]/35 transition duration-300 hover:bg-[#F4F4F2] hover:ring-[#2B2B2B] sm:w-auto">
                Start a project
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;