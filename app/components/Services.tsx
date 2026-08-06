"use client";

import React, { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { LuArrowRight } from "react-icons/lu";

import commerceImg from "../images/Image by Campaign Creators.avif";
import engineeringImg from "../images/Website setup on laptop.avif";
import conversionImg from "../images/UX Design Team.avif";
import growthImg from "../images/Image by Myriam Jessier.avif";

/* Shared easing — the same curve the hover transitions in this file use, so the
   scroll reveal and the pointer interactions read as one motion language. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* inset(top right bottom left): 100% on one edge collapses the box against the
   opposite edge, which is what gives the curtain wipe its direction. */
const CLIP_HIDDEN_DOWN = "inset(0% 0% 100% 0%)";
const CLIP_HIDDEN_UP = "inset(100% 0% 0% 0%)";
const CLIP_VISIBLE = "inset(0% 0% 0% 0%)";

type Service = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: StaticImageData;
  alt: string;
  background: string;
};

const services: Service[] = [
  {
    id: "01",
    kicker: "Commerce",
    title: "E-Commerce Development",
    description:
      "Storefronts that handle real traffic and real money — catalog, cart, checkout and an admin panel your team can run without me.",
    cta: "Explore E-Commerce",
    href: "#contact",
    image: commerceImg,
    alt: "A team reviewing sales and campaign performance on a laptop",
    background: "bg-[#EEF5E9]",
  },
  {
    id: "02",
    kicker: "Engineering",
    title: "Full-Stack Web Development",
    description:
      "Product engineering across the stack: schema, API, authentication and an interface that stays fast as the data grows.",
    cta: "See the Stack",
    href: "#contact",
    image: engineeringImg,
    alt: "A laptop on a desk during a website build",
    background: "bg-[#DDE4FF]",
  },
  {
    id: "03",
    kicker: "Conversion",
    title: "Static & Dynamic Landing Pages",
    description:
      "Pages built to convert — a fast static site when that is enough, a CMS-driven one when the copy needs to change weekly.",
    cta: "Build a Landing Page",
    href: "#contact",
    image: conversionImg,
    alt: "A design team mapping out an interface",
    background: "bg-[#E8E0FA]",
  },
  {
    id: "04",
    kicker: "Growth",
    title: "SEO & Analytics",
    description:
      "The part that runs after launch — technical SEO, clean event tracking, and dashboards that answer which pages actually earn their keep.",
    cta: "Boost Your Rankings",
    href: "#contact",
    image: growthImg,
    alt: "An analytics dashboard showing traffic and search performance",
    background: "bg-[#FFF1CF]",
  },
];

/* Copy lifts behind its own mask, one line after another, while the image
   opposite it is still wiping open. */
const copyVariants = {
  hidden: { opacity: 0, y: 24 },
  /* `custom` arrives from the parent column: reduced motion still runs the
     variant so the copy lands visible, just with no duration. */
  shown: (instant: boolean) => ({
    opacity: 1,
    y: 0,
    transition: instant ? { duration: 0 } : { duration: 0.7, ease: EASE },
  }),
};

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  const imageFirst = index % 2 === 0;

  /* Scroll-linked parallax: tracked from the moment the frame enters the
     viewport until it has fully left, so the photo drifts against the card the
     whole way past. Measured off the frame's own rect, which keeps it in sync
     with the GSAP ScrollSmoother transform applied to #smooth-content. */
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });

  /* The inner plate is 148% tall (inset-y-[-24%]), so ±16% of the plate — 23.7%
     of the frame — still lands inside the 24% of overhang on each side. The wider
     the drift, the longer the photo appears to hold its position against the card
     as the card scrolls past it. */
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-16%", "16%"]);

  /* Alternating wipe direction mirrors the alternating column order. */
  const clipHidden = imageFirst ? CLIP_HIDDEN_DOWN : CLIP_HIDDEN_UP;

  /* One observer, on the *frame* — deliberately not `whileInView` on the curtain
     or the plate. IntersectionObserver intersects a target against its own
     clip-path, so a curtain clipped to zero height reports ratio 0 and can never
     trip the threshold that would open it. Observing the unclipped frame instead
     breaks that deadlock and keeps both children on one clock. */
  const inView = useInView(frameRef, { once: true, amount: 0.3 });

  /* Reduced motion still has to *arrive* at the revealed state: the server sends
     the hidden clip-path inline, so skipping the animation entirely would leave
     the images clipped away forever. It plays — just at zero duration. */
  const revealed = inView || Boolean(reduceMotion);

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 60,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.8,
        ease: EASE,
      }}
      className={`group grid overflow-hidden ${service.background} lg:grid-cols-2`}
    >
      {/* IMAGE */}

      <div
        ref={frameRef}
        className={`relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-[560px] ${
          imageFirst ? "lg:order-1" : "lg:order-2"
        }`}
      >
        {/* Curtain: the mask itself wipes open on entry. */}
        <motion.div
          initial={{ clipPath: clipHidden }}
          animate={{ clipPath: revealed ? CLIP_VISIBLE : clipHidden }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.25, ease: EASE, delay: 0.1 }
          }
          className="absolute inset-0 will-change-[clip-path]"
        >
          {/* Plate: overscaled and drifting, so the photo settles as it is uncovered. */}
          <motion.div
            style={reduceMotion ? undefined : { y: parallaxY }}
            initial={{ scale: 1.18 }}
            animate={{ scale: revealed ? 1 : 1.18 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 1.6, ease: EASE, delay: 0.1 }
            }
            className="absolute inset-x-0 inset-y-[-24%] will-change-transform"
          >
            <Image
              src={service.image}
              alt={service.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          {/* subtle image overlay */}

          <div className="pointer-events-none absolute inset-0 bg-black/[0.02]" />
        </motion.div>

        {/* Number — rides in after the curtain has opened. */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={
            revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: EASE, delay: 0.75 }
          }
          className="absolute left-5 top-5 sm:left-8 sm:top-8"
        >
          <span className="text-[10px] font-medium tracking-[0.3em] text-white drop-shadow-sm sm:text-xs">
            {service.id}
          </span>
        </motion.div>
      </div>

      {/* CONTENT */}

      <motion.div
        initial="hidden"
        animate={revealed ? "shown" : "hidden"}
        custom={Boolean(reduceMotion)}
        variants={{
          hidden: {},
          shown: (instant: boolean) => ({
            transition: instant
              ? {}
              : { staggerChildren: 0.09, delayChildren: 0.25 },
          }),
        }}
        className={`flex min-h-[360px] flex-col justify-center px-6 py-12 sm:min-h-[420px] sm:px-10 sm:py-16 md:px-14 lg:min-h-[560px] lg:px-16 xl:px-20 ${
          imageFirst ? "lg:order-2" : "lg:order-1"
        }`}
      >
        {/* Kicker */}

        <motion.div variants={copyVariants} className="flex items-center gap-4">
          <span className="h-px w-8 bg-black/25" />

          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/55 sm:text-xs">
            {service.kicker}
          </span>
        </motion.div>

        {/* Title */}

        <motion.h3
          variants={copyVariants}
          className="
            font-bricolage-medium
            mt-7
            max-w-xl
            text-3xl
            leading-[1.05]
            tracking-tight
            text-black
            sm:text-4xl
            md:text-5xl
            lg:text-[3.5rem]
            xl:text-[4rem]
          "
        >
          {service.title}
        </motion.h3>

        {/* Description */}

        <motion.p
          variants={copyVariants}
          className="
            font-bricolage-light
            mt-7
            max-w-lg
            text-sm
            leading-[1.7]
            text-black/55
            sm:text-base
            lg:text-[17px]
          "
        >
          {service.description}
        </motion.p>

        {/* CTA */}

        <motion.a
          variants={copyVariants}
          href={service.href}
          className="
            group/cta
            mt-9
            inline-flex
            w-fit
            items-center
            gap-3
            text-sm
            font-medium
            text-black
            sm:text-base
          "
        >
          <span className="relative">
            {service.cta}

            <span
              className="
                absolute
                -bottom-1
                left-0
                h-px
                w-full
                origin-right
                scale-x-0
                bg-black
                transition-transform
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover/cta:origin-left
                group-hover/cta:scale-x-100
              "
            />
          </span>

          <span className="relative block h-4 w-4 overflow-hidden">
            <LuArrowRight
              className="
                absolute
                inset-0
                h-4
                w-4
                transition-transform
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover/cta:translate-x-5
              "
            />

            <LuArrowRight
              className="
                absolute
                inset-0
                h-4
                w-4
                -translate-x-5
                transition-transform
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover/cta:translate-x-0
              "
            />
          </span>
        </motion.a>
      </motion.div>
    </motion.article>
  );
};

const Services = () => {
  return (
    <section
      id="services"
      className="bg-white py-16 sm:py-20 md:py-28 lg:py-32"
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        {/* SECTION HEADER */}

        <div className="border-t border-black/15 pt-5 md:pt-6">
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-medium tracking-[0.3em] text-black sm:text-xs">
              SERVICES
            </p>

            <span className="text-[10px] text-black/40 sm:text-xs">
              / 04
            </span>
          </div>
        </div>

        {/* HEADER CONTENT */}

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="
              font-bricolage-medium
              text-3xl
              leading-[1.05]
              tracking-tight
              text-black
              sm:text-4xl
              md:col-span-8
              md:text-5xl
              lg:text-[4rem]
            "
          >
            Digital experiences built
            <br className="hidden md:block" />
            from idea to launch.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            className="
              font-bricolage-light
              max-w-sm
              text-sm
              leading-relaxed
              text-black/50
              md:col-span-4
              md:justify-self-end
              md:text-base
            "
          >
            From e-commerce and full-stack applications to conversion-focused
            landing pages and growth systems.
          </motion.p>
        </div>

        {/* SERVICES */}

        <div className="mt-14 overflow-hidden sm:mt-20 md:mt-24">
          <div className="space-y-4 md:space-y-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* CLOSING CTA */}

        <div className="mt-20 flex flex-col gap-7 border-t border-black/15 pt-8 md:mt-28 md:flex-row md:items-center md:justify-between">
          <p className="font-bricolage-light max-w-md text-sm leading-relaxed text-black/50 md:text-base">
            Not sure which service you need? Tell me about the problem and
            I&apos;ll help you figure out the right approach.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#contact"
              className="
                group
                relative
                inline-flex
                w-full
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-black
                px-8
                py-3
                text-sm
                text-white
                sm:w-auto
                sm:text-base
              "
            >
              <span className="relative inline-flex overflow-hidden">
                <span
                  className="
                    translate-y-0
                    skew-y-0
                    transition
                    duration-500
                    group-hover:-translate-y-[110%]
                    group-hover:skew-y-12
                  "
                >
                  Start a project
                </span>

                <span
                  className="
                    absolute
                    translate-y-[114%]
                    skew-y-12
                    transition
                    duration-500
                    group-hover:translate-y-0
                    group-hover:skew-y-0
                  "
                >
                  Start a project
                </span>
              </span>
            </a>

            <a
              href="#projects"
              className="
                inline-flex
                w-full
                items-center
                justify-center
                rounded-full
                px-8
                py-3
                text-sm
                text-black
                ring-1
                ring-black/20
                transition
                duration-300
                hover:ring-black/60
                sm:w-auto
                sm:text-base
              "
            >
              See my work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
