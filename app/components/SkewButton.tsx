"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { scrollToSection } from "@/app/utils/scrollTo";

type SkewButtonProps = {
  children: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
};

const variantStyles = {
  primary: "bg-[#D84315] text-white",
  secondary: "bg-black text-white",
  outline: "bg-transparent text-[#2B2B2B] ring-1 ring-[#2B2B2B]/35 hover:bg-[#F4F4F2] hover:ring-[#2B2B2B]",
};

const SkewButton = ({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  icon,
}: SkewButtonProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const letters = children.split("");

  useEffect(() => {
    const back = linkRef.current?.querySelectorAll<HTMLElement>("[data-back-letter]");
    if (back && back.length) {
      gsap.set(back, { skewX: 8 });
    }
  }, []);

  const animate = (hover: boolean) => {
    const front = linkRef.current?.querySelectorAll<HTMLElement>("[data-front-letter]");
    const back = linkRef.current?.querySelectorAll<HTMLElement>("[data-back-letter]");
    if (!front || !back || !front.length || !back.length) return;

    gsap.to(front, {
      yPercent: hover ? -100 : 0,
      skewX: hover ? -8 : 0,
      duration: 0.5,
      ease: "power3.inOut",
      stagger: hover ? 0.02 : 0.015,
      overwrite: "auto",
    });
    gsap.to(back, {
      yPercent: hover ? -100 : 0,
      skewX: hover ? 0 : 8,
      duration: 0.5,
      ease: "power3.inOut",
      stagger: hover ? 0.02 : 0.015,
      overwrite: "auto",
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      scrollToSection(e, href);
    }
    onClick?.(e);
  };

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={handleClick}
      onMouseEnter={() => animate(true)}
      onMouseLeave={() => animate(false)}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3 text-sm sm:text-base transition-colors duration-300 ${variantStyles[variant]} ${className}`}
    >
      {icon && (
        <span className="relative z-10 mr-2 flex items-center">{icon}</span>
      )}
      <span aria-label={children} className="relative flex overflow-hidden">
        {letters.map((letter, i) => (
          <span key={i} className="relative inline-block overflow-hidden">
            <span data-front-letter className="inline-block">
              {letter === " " ? "\u00A0" : letter}
            </span>
            <span
              data-back-letter
              aria-hidden
              className="absolute top-full left-0 inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          </span>
        ))}
      </span>
    </a>
  );
};

export default SkewButton;
