import React from "react";
import { MapPin, Calendar, GraduationCap } from "lucide-react";

const educationData = [
    {
        title: "PEC",
        institution: "Nasaratpur Adarsha K.G School",
        description: " Pass in Covid 19, 2020",
        location: "Nasaratpur, Bogura",
        gpa: "N/A",
        year: "2020",
    },
    {
        title: "SSC",
        institution: "Nasaratpur M.L High School",
        description: "Ongoing",
        location: "Nasaratpur, Bogura",
        gpa: "Pending",
        year: "Expected 2026",
    },
];

const Education = () => {
    return (
        <div className="my-16">
            <h1 className="text-4xl font-bold text-white mb-12">
                Education<span className="text-blue-400">.</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
                {educationData.map((edu, index) => (
                    <div
                        key={index}
                        className="bg-[#111111] ring-1 ring-blue-400/20 rounded-lg p-6 text-white  flex-1"
                    >
                        <h2 className="text-2xl font-bold mb-1">{edu.title}</h2>
                        <h3 className="text-lg text-gray-300 mb-2">{edu.institution}</h3>
                        <p className="text-sm text-gray-400 mb-3">{edu.description}</p>

                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="text-blue-400 w-5 h-5" />
                            <span className="text-gray-400 text-sm">{edu.location}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-1">
                            <GraduationCap className="text-blue-400 w-5 h-5" />
                            <span className="text-gray-400 text-sm">
                                <span className="font-medium text-white">GPA:</span> {edu.gpa}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="text-blue-400 w-5 h-5" />
                            <span className="text-gray-400 text-sm">
                                <span className="font-medium text-white">Year:</span> {edu.year}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div id="contact"></div>
        </div>
    );
};

export default Education;
