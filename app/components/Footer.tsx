"use client";

import React from "react";
import ShaderBackground from "./ShaderBackground";

const Footer = () => {
  return (
    <footer className="relative min-h-[50vh] overflow-hidden bg-[#1a0e0b]">
      <ShaderBackground />

      <div className="relative z-10 mx-auto flex min-h-[50vh] flex-col items-center justify-between px-5 sm:px-8 md:px-28 py-16 md:py-20">
        <div className="flex w-full items-center gap-4 border-t border-white/20 pt-5 md:pt-6">
          <p className="text-[10px] tracking-[0.3em] text-white md:text-xs">
            FOOTER
          </p>
          <span className="font-geist-mono text-[10px] text-white/50 md:text-xs">
            / 06
          </span>
        </div>

        <div className="mt-16 flex w-full flex-col items-center gap-8 md:mt-0 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-bricolage-medium text-balance text-3xl leading-[1.08] tracking-tight text-white sm:text-4xl md:text-[3.25rem]">
              Let&apos;s build something
              <br />
              together.
            </h2>
            <a
              href="mailto:hello.abdullahnirob@gmail.com"
              className="font-bricolage-light mt-4 inline-block text-sm leading-relaxed text-white/60 transition-colors duration-300 hover:text-[#D84315]"
            >
              hello.abdullahnirob@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="flex gap-6">
              <a
                href="https://github.com/abdullahalnirob"
                target="_blank"
                rel="noopener noreferrer"
                className="font-geist-mono text-xs tracking-[0.2em] text-white transition-colors duration-300 hover:text-white"
              >
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/abdullah-al-nirob-io/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-geist-mono text-xs tracking-[0.2em] text-white transition-colors duration-300 hover:text-white"
              >
                LINKEDIN
              </a>
              <a
                href="https://facebook.com/dev.abdullahalnirob"
                target="_blank"
                rel="noopener noreferrer"
                className="font-geist-mono text-xs tracking-[0.2em] text-white transition-colors duration-300 hover:text-white"
              >
                FACEBOOK
              </a>
            </div>
            <p className="font-geist-mono text-[10px] tracking-[0.2em] text-white">
              &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
