import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrollPosition > 50 ? 'backdrop-blur-md bg-slate-950/80 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-white text-2xl font-bold tracking-tighter">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Abdullah</span>
            <span className="text-cyan-400">.</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Resume Button */}
          <div className="hidden md:block">
            <a
              href="https://drive.google.com/file/d/1KvL64X0grKsldKvuMMwWZBXzbE5WIehI/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
            {isOpen ? (
              <X className="text-white w-6 h-6" />
            ) : (
              <Menu className="text-white w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden mt-6 pb-4 space-y-3 bg-gradient-to-b from-slate-900/95 to-slate-950/95 -mx-6 px-6 py-4 rounded-xl backdrop-blur-sm border border-gray-700/50 animate-fadeIn">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-blue-400 transition-colors font-medium py-2.5 px-3 rounded-lg hover:bg-blue-500/10"
              >
                {item}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1KvL64X0grKsldKvuMMwWZBXzbE5WIehI/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2.5 rounded-full font-semibold w-full justify-center mt-2 hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </nav>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Navbar;