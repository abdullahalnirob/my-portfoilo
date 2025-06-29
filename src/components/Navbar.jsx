import React, { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed  top-0 left-0 right-0 z-50 backdrop-blur py-5 px-6 md:px-0 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          Abdullah<span className="text-blue-400">.</span>
        </div>
        <ul className="hidden md:flex items-center space-x-6">
          <Link
            to="hero"
            className="text-white cursor-pointer hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            to="about"
            className="text-white cursor-pointer hover:text-blue-400"
          >
            About
          </Link>
          <Link
            to="skills"
            className="text-white cursor-pointer hover:text-blue-400"
          >
            Skills
          </Link>
          <Link to="projects" className="text-white cursor-pointer hover:text-blue-400">
            Projects
          </Link>
          <Link to="education" className="text-white cursor-pointer hover:text-blue-400">
            Education
          </Link>
          <Link to="contact" className="text-white cursor-pointer hover:text-blue-400">
            Contact
          </Link>
        </ul>
        <div className="hidden md:block">
          <button className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 cursor-pointer rounded-lg font-medium hover:bg-blue-500 transition-colors">
            <Download className="w-4 h-4" />
            Resume
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <X className="text-white w-6 h-6" />
            ) : (
              <Menu className="text-white w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="mt-4 md:hidden flex flex-col space-y-4 bg-[#08080a]/70 p-4 rounded-lg text-white">
          <Link
            to="hero"
            className="text-white cursor-pointer hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            to="about"
            className="text-white cursor-pointer hover:text-blue-400"
          >
            About
          </Link>
          <Link
            to="skills"
            className="text-white cursor-pointer hover:text-blue-400"
          >
            Skills
          </Link>
          <Link className="text-white cursor-pointer hover:text-blue-400">
            Projects
          </Link>
          <Link className="text-white cursor-pointer hover:text-blue-400">
            Contact
          </Link>
          <button className="mt-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded-full">
            Resume
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
