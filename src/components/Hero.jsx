import {
  Mail,
  MapPin,
  Download,
  Github,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";

const Hero = () => {
  return (
    <div className="text-white py-20" id="hero">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Section */}
        <div className="flex-1 text-left">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Abdullah Al Nirob<span className="text-blue-400">.</span>
          </h1>
          <p className="text-md text-gray-400 mt-2">Full Stack Developer</p>
          <div className="my-5 flex flex-col sm:flex-row items-start sm:space-x-6 space-y-3 sm:space-y-0">
            <div className="flex items-center gap-2">
              <Mail className="text-blue-400 w-5 h-5" />
              <span className="text-gray-400 text-sm">abdullahalnirob12@gmail.com</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="text-blue-400 w-5 h-5" />
              <span className="text-gray-400 text-sm">Bangladesh</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed max-w-xl mx-auto md:mx-0 my-4">
            A goal-oriented web developer with experience in building web
            applications using modern technologies like React, Node.js, Express,
            and MongoDB. Seeking to leverage my technical skills to deliver
            exceptional user experiences.
          </p>
          <div className="flex flex-wrap justify-start items-center gap-4 mb-12">
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-md font-medium hover:bg-blue-600 transition-colors">
              <Download className="w-4 h-4" />
              Resume
            </button>
            <a target="_blank" href="https://github.com/abdullahalnirob">
              <button className="cursor-pointer px-3 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                <Github className="w-5 h-5" />
              </button>
            </a>
            <a target="_blank" href="https://x.com/AbdullahN66467">
              <button className="cursor-pointer px-3 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
            </a>
            <a target="_blank" href="https://facebook.com/dev.abdullahalnirob/">
              <button className="cursor-pointer px-3 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
            </a>
          </div>
        </div>

        {/* Right Section (Image & Link) */}
        <div className="flex-1 flex justify-center">
          <div className="w-full  max-w-xs text-center">
            <img
              src="me.jpg"
              alt="Profile"
              className="w-48 h-48 sm:w-52 sm:h-52 rounded-full mb-4 mx-auto"
            />
            <p className="text-gray-400">Follow me on GitHub</p>
            <a
              href="https://github.com/abdullahalnirob"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:underline"
            >
              <span className="text-blue-400">@</span>abdullahalnirob
            </a>
          </div>
        </div>
      </div>
      <div id="about"></div>
    </div>
  );
};

export default Hero;
