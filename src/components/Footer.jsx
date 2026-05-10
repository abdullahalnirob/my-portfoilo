import { Facebook, Github, Instagram } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { Link } from 'react-scroll';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', to: 'hero' },
    { label: 'About', to: 'about' },
    { label: 'Skills', to: 'skills' },
    { label: 'Projects', to: 'projects' },
    { label: 'Contact', to: 'contact' },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/abdullahalnirob',
      label: 'GitHub',
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/dev.abdullahalnirob',
      label: 'Instagram',
    },
    {
      icon: Facebook,
      href: 'https://facebook.com/dev.abdullahalnirob',
      label: 'Facebook',
    },
    {
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/abdullah-al-nirob-io/',
      label: 'LinkedIn',
    },
    {
      icon: FaSquareXTwitter,
      href: 'https://x.com/AbdullahN66467',
      label: 'Twitter',
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-900 to-transparent border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold mb-3">
              Abdullah<span className="text-blue-400">.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xs">
              Full-stack developer crafting beautiful, functional web experiences with modern technologies.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer inline-flex items-center gap-2 text-sm md:text-base group"
                  >
                    <span className="inline-block w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Get in Touch</h3>
            <div className="space-y-3 text-sm md:text-base">
              <p className="text-gray-400">
                <span className="text-blue-400 font-semibold">Email:</span><br />
                abdullahalnirob12@gmail.com
              </p>
              <p className="text-gray-400">
                <span className="text-blue-400 font-semibold">Phone:</span><br />
                +88 01305719889
              </p>
              <p className="text-gray-400">
                <span className="text-blue-400 font-semibold">Location:</span><br />
                Bogura, Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
            © {currentYear} Abdullah Al Nirob. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-500/30 hover:to-cyan-500/30 border border-gray-700 hover:border-blue-400/50 transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                </a>
              );
            })}
          </div>

          {/* Made By */}
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-right">
            Designed & Built with <span className="text-red-400">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;