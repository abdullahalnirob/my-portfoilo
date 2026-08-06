"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
  FaEnvelope,
} from "react-icons/fa6";
import SkewButton from "./SkewButton";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { name: "GitHub", href: "https://github.com/abdullahalnirob", Icon: FaGithub },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/abdullahalnirob",
    Icon: FaLinkedinIn,
  },
  { name: "X", href: "https://x.com/abdullahalnirob", Icon: FaXTwitter },
  {
    name: "Facebook",
    href: "https://facebook.com/abdullahalnirob",
    Icon: FaFacebookF,
  },
  { name: "Email", href: "mailto:hello@abdullahalnirob.com", Icon: FaEnvelope },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="pb-14 min-h-screen sm:pb-16 md:pb-20"
      id="about"
    >
      <div className="px-5 sm:px-8 md:px-28">
        <div
          data-reveal
          className="flex items-center gap-4 border-t border-black/10 pt-5 md:pt-6"
        >
          <p className="text-[10px] md:text-xs tracking-[0.3em] text-black">
            ABOUT ME
          </p>
          <span className="text-[10px] md:text-xs text-black">/ 01</span>
        </div>

        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:justify-between md:gap-16">
          {/* Heading */}
          <div className="w-full md:w-[45%] text-center md:text-left">
            <h1 data-reveal className="text-4xl md:text-6xl font-bold">
              DESIGNING &amp;
            </h1>
            <div
              data-reveal
              className="flex items-center justify-center md:justify-start flex-wrap"
            >
              <h1 className="text-4xl md:text-6xl font-bold">BUILDING</h1>
              <span className="text-sm md:text-md ml-1">@</span>
            </div>

            <h2
              data-reveal
              className="text-xl sm:text-2xl md:text-4xl font-bold my-2 md:my-3 text-black"
            >
              FULL STACK DEV.
            </h2>
          </div>

          {/* Copy */}
          <div className="w-full md:w-[50%] text-center md:text-left mt-6 md:mt-3">
            <p
              data-reveal
              className="mb-4 text-xs sm:text-sm max-w-xs sm:max-w-sm md:max-w-lg mx-auto md:mx-0 text-black"
            >
              I&apos;m a web developer focused on turning ideas into products
              that feel effortless to use. Over the last two years I&apos;ve
              shipped e-commerce platforms, dashboards and full-stack
              applications — always chasing the balance between clean design and
              solid engineering.
            </p>
            <p
              data-reveal
              className="mb-6 text-xs sm:text-sm max-w-xs sm:max-w-sm md:max-w-lg mx-auto md:mx-0 text-black"
            >
              When I&apos;m not shipping, I&apos;m usually breaking something
              apart to understand how it works, or refining the small details
              most people never notice.
            </p>

            <div
              data-reveal
              className="flex flex-col xs:flex-row sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 my-5 w-full"
            >
              <SkewButton href="#projects" className="w-full sm:w-auto">
                View my work
              </SkewButton>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-transparent hover:bg-white text-black ring-1 ring-black px-6 py-2.5 rounded-full w-full sm:w-auto text-center"
              >
                Let&apos;s talk
              </a>
            </div>

            {/* Socials */}
            <div
              data-reveal
              className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 flex-wrap mt-8"
            >
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={name}
                  title={name}
                  className="h-10 w-10 bg-white/50 md:h-11 md:w-11 grid place-items-center rounded-full ring-1 ring-black/40 text-black transition duration-300 hover:bg-[#D84315] hover:text-white hover:ring-[#D84315] hover:-translate-y-0.5"
                >
                  <Icon className="text-sm md:text-base" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
