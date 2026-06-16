import {
  Mail,
  MapPin,
  Download,
  Github,
  Twitter,
  Linkedin,
  Facebook,
} from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="text-white py-24 md:py-32" id="hero">
      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Section */}
        <div className="flex-1 text-left">
          <div className="mb-4">
            <p className="text-blue-400 text-sm font-semibold tracking-wide mb-2">Welcome</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-2">
              Abdullah Al<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Nirob</span>
              <span className="text-blue-400">.</span>
            </h1>
            <p className="text-base md:text-lg text-gray-400 font-medium">Software Developer</p>
          </div>

          <div className="my-6 flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
            <div className="flex items-center gap-2">
              <Mail className="text-blue-400 w-5 h-5 flex-shrink-0" />
              <span className="text-gray-300 text-sm md:text-base">
                abdullahalnirob12@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-blue-400 w-5 h-5 flex-shrink-0" />
              <span className="text-gray-300 text-sm md:text-base">Bangladesh</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mb-8">
            A goal-oriented software developer who designs and builds reliable
            web applications from front to back. I turn ideas into clean,
            scalable products and love solving real problems to deliver
            exceptional user experiences.
          </p>

          <div className="flex flex-wrap justify-start items-center gap-3">
            <a
              target="_blank"
              href="https://drive.google.com/file/d/1KvL64X0grKsldKvuMMwWZBXzbE5WIehI/view?usp=sharing"
              rel="noopener noreferrer"
            >
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-5 py-2.5 cursor-pointer rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all hover:scale-105 text-sm md:text-base">
                <Download className="w-4 h-4" />
                Resume
              </button>
            </a>
            <a target="_blank" href="https://github.com/abdullahalnirob" rel="noopener noreferrer">
              <button className="cursor-pointer p-2.5 border border-gray-600 rounded-lg hover:border-blue-400 hover:bg-blue-500/10 transition-all group">
                <Github className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              </button>
            </a>
            <a target="_blank" href="https://facebook.com/dev.abdullahalnirob/" rel="noopener noreferrer">
              <button className="cursor-pointer p-2.5 border border-gray-600 rounded-lg hover:border-blue-400 hover:bg-blue-500/10 transition-all group">
                <Facebook className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              </button>
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/abdullah-al-nirob-io/"
              rel="noopener noreferrer"
            >
              <button className="cursor-pointer p-2.5 border border-gray-600 rounded-lg hover:border-blue-400 hover:bg-blue-500/10 transition-all group">
                <FaLinkedin className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              </button>
            </a>
          </div>
        </div>

        {/* Right Section (Image & Link) */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xs text-center">
            <div className="relative mb-6 inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-xl opacity-15"></div>
              <img
                src="/new_profile.webp"
                alt="Profile"
                className="relative object-cover w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full mx-auto ring-2 ring-blue-400/30 shadow-xl"
              />
            </div>
            <p className="text-gray-400 text-sm mb-2">Follow me on GitHub</p>
            <a
              href="https://github.com/abdullahalnirob"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold text-base hover:text-blue-400 transition-colors inline-block"
            >
              <span className="text-blue-400">@</span>abdullahalnirob
            </a>
          </div>
        </div>
      </div>
      <div id="about"></div>
    </div>
  );
};

export default Hero;