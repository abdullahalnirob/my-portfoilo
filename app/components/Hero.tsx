import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="py-14 sm:py-16 md:py-20 md:h-[100vh] bg-[#fff]" id="home">
      <div className="px-5 sm:px-8 md:px-28 flex flex-col-reverse md:flex-row md:justify-between items-center h-full gap-10 md:gap-0">
        <div className="w-full md:w-[50%] md:transform md:-translate-y-2 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold">
            ABDULLAH
          </h1>
          <div className="flex items-center justify-center md:justify-start flex-wrap">
            <h1 className="text-5xl md:text-7xl font-bold">
              AL NIROB
            </h1>
            <span className="text-sm md:text-md ml-1">@</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold my-2 md:my-3">
            WEB DEV.
          </h2>
          <p className="mb-4 text-xs sm:text-sm max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0">
            I build fast, functional web experiences — from e-commerce
            platforms to full-stack products, blending clean design with
            solid engineering.
          </p>

          <div className="flex flex-col xs:flex-row sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 my-5 w-full">
            <button className="group relative bg-[#D84315] text-white px-6 md:px-8 py-2.5 rounded-full w-full sm:w-auto">
              <a
                href="#contact"
                className="relative inline-flex overflow-hidden justify-center w-full"
              >
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                  Contact me
                </div>
                <div className="absolute translate-y-[114%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  Contact me
                </div>
              </a>
            </button>

            <a
              href="Abdullah-Al-Nirob.pdf"
              download="Abdullah-Al-Nirob.pdf"
              className="w-full sm:w-auto"
            >
              <button className="bg-transparent hover:bg-slate-200 text-black ring-1 ring-black px-6 py-2.5 rounded-full w-full sm:w-auto">
                Download Resume
              </button>
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 flex-wrap">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">10+</h3>
              <p className="text-[10px] md:text-xs text-black/50 whitespace-nowrap">
                Projects Done
              </p>
            </div>
            <div className="h-8 w-px bg-black/15" />
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">2+</h3>
              <p className="text-[10px] md:text-xs text-black/50 whitespace-nowrap">
                Years Experience
              </p>
            </div>
            <div className="h-8 w-px bg-black/15" />
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold flex justify-center">
                <FaLinkedin />
              </h3>
              <p className="text-[10px] md:text-xs text-black/50 whitespace-nowrap">
                500+ Connections
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <img
          src="/my_hero.png"
          alt="Abdullah Al Nirob"
          className="aspect-[3/4] object-cover rounded-2xl ring-1 ring-amber-50 w-[60%] sm:w-[45%] md:w-[30%]"
        />
      </div>
    </div>
  );
};

export default Hero;