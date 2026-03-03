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
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = group.accent + '55';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: group.accent,
          opacity: 0.06,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: group.accent,
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            {group.category}
          </span>
          <div
            style={{
              width: '28px',
              height: '2px',
              background: group.accent,
              borderRadius: '2px',
              opacity: 0.6,
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: '28px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.04)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            userSelect: 'none',
          }}
        >
          {group.label}
        </span>
      </div>

      {/* Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {group.items.map((skill, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '7px 12px',
              borderRadius: '8px',
              background:
                hovered === i ? group.accentDim : 'rgba(255,255,255,0.04)',
              border: `1px solid ${hovered === i ? group.accent + '44' : 'rgba(255,255,255,0.06)'}`,
              transition: 'all 0.2s ease',
              cursor: 'default',
            }}
          >
            <span
              style={{
                fontSize: '15px',
                color: hovered === i ? group.accent : 'rgba(255,255,255,0.5)',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s ease',
              }}
            >
              {skill.icon}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                color: hovered === i ? '#fff' : 'rgba(255,255,255,0.65)',
                letterSpacing: '0.01em',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
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
    <div style={{ paddingTop: '64px', paddingBottom: '12px' }}>
      <div style={{ marginBottom: '36px' }}>
        <div
          style={{
            alignItems: 'center',
            gap: '12px',
            marginBottom: '10px',
          }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            My Skills<span className="text-blue-400">.</span>
          </h1>
          <p className="mb-8 text-gray-400">
            Tools & technologies that power my work.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {skills.map((group, i) => (
          <SkillCard key={i} group={group} />
        ))}
      </div>

      <div id="projects" />
    </div>
  );
};

export default Skill;
