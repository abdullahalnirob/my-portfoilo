import React from "react";

const About = () => {
    return (
        <div>
            <div>
                <h1 className="text-4xl text-white font-bold">
                    About me<span className="text-blue-400">.</span>
                </h1>
            </div>
            <div>
                <p className="text-white py-5">Hi! I'm Abdullah. I am a MERN stack developer who enjoys making websites and web apps that are fast, easy to use, and work well. I use MongoDB, Express.js, React, and Node.js to build both the front and back parts of websites.

                    I know how to create strong APIs, design nice-looking pages, and make sure everything works smoothly. I can also add other tools to the website, set up login systems, put apps online, and make sure they run fast. I enjoy working on the full website from start to finish.

                    <div id="skills"></div>
                </p>
            </div>
        </div>
    );
};

export default About;
