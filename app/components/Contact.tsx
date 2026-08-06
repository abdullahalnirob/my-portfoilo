"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
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
    href: "https://www.linkedin.com/in/abdullah-al-nirob-io/",
    Icon: FaLinkedinIn,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/abdullah__nirob",
    Icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/dev.abdullahalnirob",
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

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-16">
          {/* Left - Form */}
          <div data-reveal>
            <h2 className="font-bricolage-medium text-balance text-3xl leading-[1.08] tracking-tight text-[#2B2B2B] sm:text-4xl md:text-[3.25rem]">
              Have a project in mind?
              <br />
              Let&apos;s talk.
            </h2>
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
              className="mt-8 grid gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-[#2B2B2B] outline-none transition placeholder:text-[#2B2B2B]/40 focus:border-[#D84315]"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-[#2B2B2B] outline-none transition placeholder:text-[#2B2B2B]/40 focus:border-[#D84315]"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-[#2B2B2B] outline-none transition placeholder:text-[#2B2B2B]/40 focus:border-[#D84315]"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={4}
                className="resize-none rounded-2xl border border-black/15 bg-white px-5 py-3 text-sm text-[#2B2B2B] outline-none transition placeholder:text-[#2B2B2B]/40 focus:border-[#D84315]"
              />
              <SkewButton href="mailto:abdullahalnirob12@gmail.com" className="mt-2 w-full sm:w-auto">
                Send Message
              </SkewButton>
            </form>
          </div>

          {/* Right - Info */}
          <div data-reveal className="flex flex-col justify-between">
            <div>
              <p className="font-bricolage-light text-sm leading-relaxed text-[#2B2B2B]/60 md:text-base">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision. Feel free to reach
                out through the form or any of the platforms below.
              </p>

              <div className="mt-8 space-y-4">
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-[#2B2B2B]/40 md:text-xs">EMAIL</p>
                  <a
                    href="mailto:abdullahalnirob12@gmail.com"
                    className="mt-1 block text-sm text-[#2B2B2B] transition hover:text-[#D84315] md:text-base"
                  >
                    abdullahalnirob12@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-[#2B2B2B]/40 md:text-xs">WHATSAPP</p>
                  <a
                    href="https://wa.me/8801305719889"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-1 block text-sm text-[#2B2B2B] transition hover:text-[#D84315] md:text-base"
                  >
                    +880 1305-719889
                  </a>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-[#2B2B2B]/40 md:text-xs">LOCATION</p>
                  <p className="mt-1 text-sm text-[#2B2B2B] md:text-base">Bangladesh · Available Worldwide</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <p className="mb-3 text-[10px] tracking-[0.3em] text-[#2B2B2B]/40 md:text-xs">FOLLOW ME</p>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
