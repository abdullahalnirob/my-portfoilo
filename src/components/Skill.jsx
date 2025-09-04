import React from "react";
import { DiMongodb } from "react-icons/di";
import { FaHtml5, FaJs, FaNode } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { RiReactjsLine, RiTailwindCssFill } from "react-icons/ri";
import { SiExpress } from "react-icons/si";
import { TbApi } from "react-icons/tb";

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
        <div className="flex justify-center  items-center flex-wrap gap-4 md:gap-10 py-10">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white text-sm font-medium">HTML</span>
            <div className="w-px h-8 bg-gray-400"></div>
            <div className="bg-blue-500 ring-1 ring-gray-200 text-white text-3xl rounded-xl p-3 shadow-lg">
              <FaHtml5 />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white text-sm font-medium">CSS</span>
            <div className="w-px h-8 bg-gray-400"></div>
            <div className="bg-blue-500 ring-1 ring-gray-200 text-white text-3xl rounded-xl p-3 shadow-lg">
              <IoLogoCss3 />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white text-sm font-medium">Tailwindcss</span>
            <div className="w-px h-8 bg-gray-400"></div>
            <div className="bg-blue-500 ring-1 ring-gray-200 text-white text-3xl rounded-xl p-3 shadow-lg">
              <RiTailwindCssFill />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white text-sm font-medium">JavaScript</span>
            <div className="w-px h-8 bg-gray-400"></div>
            <div className="bg-blue-500 ring-1 ring-gray-200 text-white text-3xl rounded-xl p-3 shadow-lg">
              <FaJs />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white text-sm font-medium">ReactJS</span>
            <div className="w-px h-8 bg-gray-400"></div>
            <div className="bg-blue-500 ring-1 ring-gray-200 text-white text-3xl rounded-xl p-3 shadow-lg">
              <RiReactjsLine />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white text-sm font-medium">NodeJS</span>
            <div className="w-px h-8 bg-gray-400"></div>
            <div className="bg-blue-500 ring-1 ring-gray-200 text-white text-3xl rounded-xl p-3 shadow-lg">
              <FaNode />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white text-sm font-medium">ExpressJS</span>
            <div className="w-px h-8 bg-gray-400"></div>
            <div className="bg-blue-500 ring-1 ring-gray-200 text-white text-3xl rounded-xl p-3 shadow-lg">
              <SiExpress />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white text-sm font-medium">MongoDB</span>
            <div className="w-px h-8 bg-gray-400"></div>
            <div className="bg-blue-500 ring-1 ring-gray-200 text-white text-3xl rounded-xl p-3 shadow-lg">
              <DiMongodb />
            </div>
          </div>
          {/* <div className="flex flex-col items-center space-y-2">
                    <span className="text-white text-sm font-medium">RESTful API</span>
                    <div className="w-px h-8 bg-gray-400"></div>
                    <div className="bg-blue-500 ring-1 ring-gray-200 text-white text-3xl rounded-xl p-3 shadow-lg">
                        <TbApi />
                    </div>
                </div> */}
        </div>
        <div id="projects"></div>
      </div>
    );
};

export default Skill;
