import React from "react";

const Projects = () => {
  const projects = [
    {
      img: "https://i.ibb.co/RJrqWty/Screenshot-2025-06-29-110534.png",
      title: "Samusa Blog",
      decription:
        "This modern and responsive blog platform is designed to deliver a smooth reading and publishing experience. Built using React, Firebase, and Tailwind CSS, it showcases clean design, fast performance, and dynamic feature",
      tech: ["React", "Tailwindcss", "Firbase", "Express", "MongoDB", "JWT"],
      link: "https://samusa-blog.web.app/",
    },
    {
      img: "https://i.ibb.co/hxBW5qxy/Screenshot-2025-05-22-203943.png",
      title: "HobbyHub",
      decription:
        "A social media platform where people can share their hobbies and interests. Users can create profiles. They can also create groups, join existing ones, and engage with hobby-based communities.",
      tech: ["React", "Tailwindcss", "Firbase", "Express", "MongoDB"],
      link: "https://test-new-a8773.web.app/",
    },
    {
      img: "https://i.ibb.co/jvDNgy4d/Screenshot-2025-06-25-105913.png",
      title: "Phudu",
      decription:
        "A social media platform where people can share their hobbies and interests. Users can create profiles, share updates, and interact through comments and likes. They can also create groups, join existing ones, and engage with hobby-based communities.",
      tech: ["React", "Tailwindcss", "Recharts", "LocalStorage"],
      link: "https://phudu.vercel.app/",
    },
  ];

  return (
    <div className="py-16">
      <div className="">
        <h1 className="text-4xl font-bold text-white mb-12">
          Projects<span className="text-blue-400">.</span>
        </h1>

        <div className="grid gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#111111] rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row transition-transform hover:scale-[1.01] h-auto"
            >
              <div className="md:w-1/2 max-h-[250px] overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 p-6 text-white flex flex-col justify-center">
                <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-4">
                  {project.decription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-blue-600 text-xs text-white px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 text-blue-400 hover:underline text-sm"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="education"></div>
    </div>
  );
};

export default Projects;
