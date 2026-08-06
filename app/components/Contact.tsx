"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa6";
import SkewButton from "./SkewButton";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/abdullahalnirob",
    Icon: FaGithub,
  },
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
  {
    name: "WhatsApp",
    href: "https://wa.me/8801305719889",
    Icon: FaWhatsapp,
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[#F4F4F2] py-16 sm:py-20 md:py-28 lg:py-32"
    >
      <div className="px-5 sm:px-8 md:px-28">
        {/* Section header */}
        <div
          data-reveal
          className="flex items-center gap-4 border-t border-black/15 pt-5 md:pt-6"
        >
          <p className="text-[10px] tracking-[0.3em] text-black md:text-xs">
            GET IN TOUCH
          </p>
          <span className="font-geist-mono text-[10px] text-black/50 md:text-xs">
            / 07
          </span>
        </div>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-8">
          {/* Heading */}
          <div className="md:col-span-8">
            <h2
              data-reveal
              className="font-bricolage-medium text-balance text-3xl leading-[1.08] tracking-tight text-[#2B2B2B] sm:text-4xl md:text-[3.25rem]"
            >
              Have a project in mind?
              <br />
              Let&apos;s talk.
            </h2>
          </div>

          <div className="md:col-span-4 md:self-end">
            <p
              data-reveal
              className="font-bricolage-light max-w-sm text-sm leading-relaxed text-[#2B2B2B]/60 md:text-base"
            >
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div
          data-reveal
          className="mt-14 border-t border-black/15 pt-8 md:mt-20"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem("name") as HTMLInputElement).value;
              const email = (form.elements.namedItem("email") as HTMLInputElement).value;
              const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
              const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
              const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
              window.open(`mailto:abdullahalnirob12@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`, "_blank");
            }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-[#2B2B2B] outline-none transition placeholder:text-[#2B2B2B]/40 focus:border-[#D84315] sm:col-span-1"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-[#2B2B2B] outline-none transition placeholder:text-[#2B2B2B]/40 focus:border-[#D84315] sm:col-span-1"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-[#2B2B2B] outline-none transition placeholder:text-[#2B2B2B]/40 focus:border-[#D84315] sm:col-span-2"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={4}
              className="resize-none rounded-2xl border border-black/15 bg-white px-5 py-3 text-sm text-[#2B2B2B] outline-none transition placeholder:text-[#2B2B2B]/40 focus:border-[#D84315] sm:col-span-2"
            />
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <SkewButton href="mailto:abdullahalnirob12@gmail.com" className="w-full sm:w-auto">
                Send Message
              </SkewButton>
              <div className="flex items-center gap-3 sm:gap-4">
                {socials.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={name}
                    title={name}
                    className="h-10 w-10 grid place-items-center rounded-full ring-1 ring-black/20 text-[#2B2B2B] transition duration-300 hover:bg-[#D84315] hover:text-white hover:ring-[#D84315] hover:-translate-y-0.5 md:h-11 md:w-11"
                  >
                    <Icon className="text-sm md:text-base" />
                  </a>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Location note */}
        <p
          data-reveal
          className="font-geist-mono mt-12 text-[10px] tracking-[0.2em] text-[#2B2B2B]/40 md:text-xs"
        >
          BASED IN BANGLADESH · AVAILABLE WORLDWIDE
        </p>
      </div>
    </section>
  );
};

export default Contact;
