import React from 'react';
import { MdOutlineArrowOutward } from 'react-icons/md';

const Projects = () => {
  const projects = [
    {
      img: 'https://i.ibb.co.com/knd46mf/scrnli-q-A8-D7-Y7y15k-N4g.png',
      title: 'Gimox Gym Management',
      description:
        'Gimox Gym Management is a modern and responsive platform built to simplify gym operations. It offers tools for managing members, payments, trainers, and schedules with a smooth and intuitive interface. Powered by React, Firebase, Express, and MongoDB, it delivers fast performance, secure access, and seamless Stripe payment integration.',
      tech: [
        'React',
        'Tailwindcss',
        'MUI',
        'Framer-motion',
        'Firebase',
        'Express',
        'MongoDB',
        'JWT',
        'Stripe',
      ],
      link: 'https://gimox.surge.sh/',
    },
    {
      img: 'https://i.ibb.co.com/RJrqWty/Screenshot-2025-06-29-110534.png',
      title: 'Samusa Blog',
      description:
        'A modern and responsive blog platform designed to deliver a smooth reading and publishing experience. Built using React, Firebase, and Tailwind CSS, it showcases clean design, fast performance, and dynamic features with an intuitive user interface.',
      tech: [
        'React',
        'Tailwindcss',
        'Framer-motion',
        'Firebase',
        'Express',
        'MongoDB',
        'JWT',
      ],
      link: 'https://samusa-blog.web.app/',
    },
    {
      img: 'https://i.ibb.co.com/hxBW5qxy/Screenshot-2025-05-22-203943.png',
      title: 'HobbyHub',
      description:
        'A social media platform where people can share their hobbies and interests. Users can create profiles, build communities, create groups, join existing ones, and engage with hobby-based communities in a dynamic and interactive environment.',
      tech: ['React', 'Tailwindcss', 'Firebase', 'Express', 'MongoDB'],
      link: 'https://test-new-a8773.web.app/',
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Projects<span className="text-blue-400">.</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mb-6"></div>
          <p className="text-gray-400 text-base md:text-lg">
            Highlights of My Development Work.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col h-full rounded-2xl border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-900/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48 md:h-56 bg-gray-900">
                <img
                  src={project.img || '/placeholder.svg'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Tech Badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-400/30">
                  <span className="text-xs font-semibold text-blue-300">
                    {project.tech.length} Tech
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6 md:py-8 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 flex-1 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-400/30 hover:border-blue-400/60 hover:bg-blue-500/30 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-400/30">
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                {/* Link Button */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 font-semibold group/link w-fit"
                >
                  <span className="relative">
                    View Project
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover/link:w-full transition-all duration-300"></span>
                  </span>
                  <MdOutlineArrowOutward className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="education"></div>
    </section>
  );
};

export default Projects;