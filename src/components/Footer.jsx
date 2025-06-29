import { Facebook, Github, Instagram } from "lucide-react";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">
            Abdullah<span className="text-blue-400">.</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            © {new Date().getFullYear()} Abdullah. All rights reserved.
          </p>
        </div>
        <ul className="flex gap-4 text-sm text-gray-400">
          <li>
            <Link
              to="hero"
              className="hover:text-blue-400 transition cursor-pointer"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="about"
              className="hover:text-blue-400 transition cursor-pointer"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="skills"
              className="hover:text-blue-400 transition cursor-pointer"
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              to="projects"
              className="hover:text-blue-400 transition cursor-pointer"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              className="hover:text-blue-400 transition cursor-pointer"
            >
              Contact
            </Link>
          </li>
        </ul>
        <div className="flex gap-4">
          <a
            href="https://github.com/abdullahalnirob"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="w-5 h-5 text-gray-400 hover:text-blue-400 transition" />
          </a>
          <a
            href="https://instagram.com/dev.abdullahalnirob"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram className="w-5 h-5 text-gray-400 hover:text-blue-400 transition" />
          </a>
          <a
            href="https://facebook.com/dev.abdullahalnirob"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
