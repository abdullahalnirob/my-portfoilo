import React, { useState } from 'react';
import { DiMongodb } from 'react-icons/di';
import {
  FaJs,
  FaNode,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaFireAlt,
} from 'react-icons/fa';
import { RiReactjsLine, RiTailwindCssFill, RiNextjsFill } from 'react-icons/ri';
import { BiLogoPostgresql } from 'react-icons/bi';
import { SiExpress, SiJsonwebtokens } from 'react-icons/si';

export const skills = [
  {
    category: 'Frontend',
    accent: '#3B82F6',
    accentDim: 'rgba(59,130,246,0.12)',
    label: '01',
    items: [
      { name: 'Tailwind CSS', icon: <RiTailwindCssFill /> },
      { name: 'JavaScript', icon: <FaJs /> },
      { name: 'React.js', icon: <RiReactjsLine /> },
      { name: 'Next.js', icon: <RiNextjsFill /> },
    ],
  },
  {
    category: 'Backend',
    accent: '#8B5CF6',
    accentDim: 'rgba(139,92,246,0.12)',
    label: '02',
    items: [
      { name: 'Node.js', icon: <FaNode /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'JWT', icon: <SiJsonwebtokens /> },
    ],
  },
  {
    category: 'Cloud & Database',
    accent: '#10B981',
    accentDim: 'rgba(16,185,129,0.12)',
    label: '03',
    items: [
      { name: 'MongoDB', icon: <DiMongodb /> },
      { name: 'Firebase', icon: <FaFireAlt /> },
      { name: 'PostgreSQL', icon: <BiLogoPostgresql /> },
    ],
  },
  {
    category: 'DevOps & Version Control',
    accent: '#F59E0B',
    accentDim: 'rgba(245,158,11,0.12)',
    label: '04',
    items: [
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'GitHub', icon: <FaGithub /> },
      { name: 'Docker', icon: <FaDocker /> },
    ],
  },
];

const SkillCard = ({ group }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 bg-gradient-to-br from-gray-800/50 to-gray-900/50"
      style={{
        borderColor: group.accent + '33',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = group.accent + '88';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = group.accent + '33';
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{ background: group.accent }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div>
          <span
            className="text-xs md:text-sm font-bold tracking-widest uppercase block mb-2"
            style={{ color: group.accent }}
          >
            {group.category}
          </span>
          <div
            className="w-12 h-0.5 rounded-full"
            style={{ background: group.accent }}
          />
        </div>
        <span
          className="text-3xl md:text-4xl font-black opacity-5 select-none"
          style={{ color: group.accent }}
        >
          {group.label}
        </span>
      </div>

      {/* Skills Pills */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {group.items.map((skill, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border transition-all duration-200 bg-gray-900/50"
            style={{
              borderColor: hovered === i ? group.accent + '88' : 'rgba(255,255,255,0.1)',
              backgroundColor: hovered === i ? group.accentDim : 'rgba(255,255,255,0.02)',
            }}
          >
            <span
              className="text-lg md:text-xl flex-shrink-0 transition-colors duration-200"
              style={{
                color: hovered === i ? group.accent : 'rgba(255,255,255,0.5)',
              }}
            >
              {skill.icon}
            </span>
            <span
              className="text-sm md:text-base font-medium transition-colors duration-200"
              style={{
                color: hovered === i ? '#fff' : 'rgba(255,255,255,0.7)',
              }}
            >
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skill = () => {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            My Skills<span className="text-blue-400">.</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mb-6"></div>
          <p className="text-gray-400 text-base md:text-lg">
            Tools & technologies that power my work.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {skills.map((group, i) => (
            <SkillCard key={i} group={group} />
          ))}
        </div>
      </div>

      <div id="projects" />
    </section>
  );
};

export default Skill;