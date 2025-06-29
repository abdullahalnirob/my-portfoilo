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
                <p className="text-white py-5">Hi! I’m Abdullah, a dedicated MERN stack developer with a passion for
                    building fast, scalable, and user-friendly web applications. I
                    specialize in full-stack development using MongoDB, Express.js, React,
                    and Node.js  from crafting powerful REST APIs to developing
                    responsive frontends. With a strong understanding of both backend
                    logic and frontend design, I enjoy creating seamless user experiences
                    that are not only functional but also visually appealing. I'm
                    comfortable working across the entire stack, integrating third-party
                    APIs, handling authentication, deploying apps, and optimizing
                    performance.
                    <div id="skills"></div>
                </p>
            </div>
        </div>
    );
};

export default About;
