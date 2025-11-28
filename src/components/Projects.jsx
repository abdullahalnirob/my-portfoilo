import React from 'react';
import { Card } from './ui/card';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const Projects = () => {
  const projects = [
    {
      img: 'https://i.ibb.co.com/knd46mf/scrnli-q-A8-D7-Y7y15k-N4g.png',
      title: 'Gimox Gym Management',
      decription:
        'This modern and responsive blog platform is designed to deliver a smooth reading and publishing experience. Built using React, Firebase, and Tailwind CSS, it showcases clean design, fast performance, and dynamic feature.',
      tech: [
        'React',
        'Tailwindcss',
        'MUI',
        'Framer-motion',
        'Firbase',
        'Express',
        'MongoDB',
        'JWT',
        'Stripe',
      ],
      link: 'https://gimox.surge.sh/',
    },
    {
      img: 'https://i.ibb.co/RJrqWty/Screenshot-2025-06-29-110534.png',
      title: 'Samusa Blog',
      decription:
        'Gimox Gym Management is a modern and responsive platform built to simplify gym operations. It offers tools for managing members, payments, trainers, and schedules with a smooth and intuitive interface. Powered by React, Firebase, Express, and MongoDB, it delivers fast performance, secure access, and seamless Stripe payment integration.',
      tech: [
        'React',
        'Tailwindcss',
        'Framer-motion',
        'Firbase',
        'Express',
        'MongoDB',
        'JWT',
      ],
      link: 'https://samusa-blog.web.app/',
    },
    {
      img: 'https://i.ibb.co/hxBW5qxy/Screenshot-2025-05-22-203943.png',
      title: 'HobbyHub',
      decription:
        'A social media platform where people can share their hobbies and interests. Users can create profiles. They can also create groups, join existing ones, and engage with hobby-based communities.',
      tech: ['React', 'Tailwindcss', 'Firbase', 'Express', 'MongoDB'],
      link: 'https://test-new-a8773.web.app/',
    },
    {
      img: 'https://i.ibb.co/jvDNgy4d/Screenshot-2025-06-25-105913.png',
      title: 'Phudu',
      decription:
        'Phudu is a modern, responsive doctor appointment booking web application that allows patients to browse doctors by specialty, view details, and book appointments online all in a few clicks. It’s designed to simplify the healthcare experience by connecting patients with trusted medical professionals.',
      tech: ['React', 'Tailwindcss', 'Recharts', 'LocalStorage'],
      link: 'https://phudu.vercel.app/',
    },
  ];

  return (
    <div className="py-16">
      <div className="">
        <h1 className="text-4xl font-bold text-white mb-2">
          Projects<span className="text-blue-400">.</span>
        </h1>
        <p className="mb-8 text-gray-400">Highlights of My Development Work.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-blue-500/50 flex flex-col h-full"
            >
              <div className="relative overflow-hidden h-36">
                <img
                  src={project.img || '/placeholder.svg'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs text-blue-400 font-medium">
                    {project.tech.length} Technologies
                  </span>
                </div>
              </div>

              <div className="px-6 py-1 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h2>

                {/*  */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-gray-300 text-sm mb-2 leading-relaxed line-clamp-3 flex-1">
                      {project.decription.slice(0, 150)}...
                    </p>
                  </TooltipTrigger>

                  <TooltipContent className="text-sm max-w-md w-[300px]">
                    <p>{project.decription}</p>
                  </TooltipContent>
                </Tooltip>

                {/*  */}

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-blue-400 text-slate-200 px-2 py-1 rounded-full backdrop-blur-sm text-xs hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 font-medium"
                >
                  <span className="relative">
                    View Project
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover/link:w-full transition-all duration-300"></span>
                  </span>
                  <MdOutlineArrowOutward className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div id="education"></div>
    </div>
  );
};

export default Projects;
