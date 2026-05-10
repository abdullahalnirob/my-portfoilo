import React from "react";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            About me<span className="text-blue-400">.</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mt-4"></div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Hi! I'm <span className="text-blue-400 font-semibold">Abdullah</span>. 
              I'm a <span className="font-semibold text-white">MERN stack developer</span> who 
              enjoys making websites and web apps that are fast, easy to use, and work well.
            </p>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              I use <span className="text-cyan-400 font-medium">MongoDB, Express.js, React, and Node.js</span> to 
              build both the front and back parts of websites. I know how to create strong APIs, 
              design nice-looking pages, and make sure everything works smoothly.
            </p>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              I can also add other tools to the website, set up login systems, 
              put apps online, and make sure they run fast. I enjoy working on the full 
              website from start to finish.
            </p>

            <div className="pt-4">
              <p className="text-gray-400 text-sm md:text-base">
                <span className="text-blue-400 font-semibold">✓ </span>Full Stack Development
              </p>
              <p className="text-gray-400 text-sm md:text-base mt-2">
                <span className="text-blue-400 font-semibold">✓ </span>API Design & Integration
              </p>
              <p className="text-gray-400 text-sm md:text-base mt-2">
                <span className="text-blue-400 font-semibold">✓ </span>Database Management
              </p>
              <p className="text-gray-400 text-sm md:text-base mt-2">
                <span className="text-blue-400 font-semibold">✓ </span>Deployment & Optimization
              </p>
            </div>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 hover:border-blue-400/50 transition-colors">
              <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">3+</p>
              <p className="text-gray-400 text-sm">Years Experience</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 hover:border-blue-400/50 transition-colors">
              <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">20+</p>
              <p className="text-gray-400 text-sm">Projects Done</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 hover:border-blue-400/50 transition-colors">
              <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">15+</p>
              <p className="text-gray-400 text-sm">Happy Clients</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 hover:border-blue-400/50 transition-colors">
              <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">100%</p>
              <p className="text-gray-400 text-sm">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      <div id="skills"></div>
    </section>
  );
};

export default About;