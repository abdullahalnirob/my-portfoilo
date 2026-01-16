import React from 'react';
import { DiMongodb } from 'react-icons/di';
import { FaHtml5, FaJs, FaNode } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io';
import { RiReactjsLine, RiTailwindCssFill, RiNextjsFill } from 'react-icons/ri';
import { BiLogoPostgresql } from 'react-icons/bi';
import { SiExpress, SiPrisma } from 'react-icons/si';
import { TbBrandMysql } from 'react-icons/tb';

export const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'Tailwind', icon: <RiTailwindCssFill /> },
      { name: 'JavaScript', icon: <FaJs /> },
      { name: 'React.js', icon: <RiReactjsLine /> },
      { name: 'Next.js', icon: <RiNextjsFill /> },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: <FaNode /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'JWT', icon: <SiExpress /> },
    ],
  },
  {
    category: 'Cloud and Database',
    items: [
      { name: 'MongoDB', icon: <DiMongodb /> },
      { name: 'Firebase', icon: <FaNode /> },
      { name: 'PostgreSQL', icon: <BiLogoPostgresql /> },
    ],
  },
  {
    category: 'DevOps & Version Control',
    items: [
      { name: 'Git', icon: <FaNode /> },
      { name: 'GitHub', icon: <FaNode /> },
      { name: 'Docker', icon: <FaNode /> },
    ],
  }
];

const Skill = () => {
  return (
    <div className="pt-16 pb-3">
      <div>
        <h1 className="text-4xl font-bold text-white">
          My Skills<span className="text-blue-400">.</span>
        </h1>
        <p className="mb-2 mt-2 text-gray-400">
          Tools & Technologies That Power My Work.
        </p>
      </div>

      {/* Grid layout – design unchanged */}
      {/* <div
        className="
          grid
          grid-cols-3
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          gap-y-5
          gap-x-4
          md:gap-x-5
          py-5
          place-items-center
        "
      >
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <span className="text-white text-sm font-medium">{skill.name}</span>

            <div className="w-px h-8 bg-gray-400"></div>

            <div className="bg-blue-500 ring-1 ring-gray-200 text-white text-3xl rounded-xl p-3 shadow-lg">
              {skill.icon}
            </div>
          </div>
        ))}
      </div> */}
      <div className="space-y-4">
        {skills.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-wrap items-center gap-x-2">
            <h2
              className="
          text-lg
          sm:text-xl
          whitespace-nowrap
        "
            >
              {group.category}:
            </h2>

            {group.items.map((skill, index) => (
              <span
                key={index}
                className="
            text-sm
            font-medium
            text-gray-300
            hover:text-white
            bg-blue-500/30
            px-2
            py-0.5
            rounded
            transition-colors
          "
              >
                <span className=''>{skill.name}</span>
                {index !== group.items.length - 1 && ','}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div id="projects"></div>
    </div>
  );
};

export default Skill;
