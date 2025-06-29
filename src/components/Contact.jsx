import React, { useState } from "react";
import { User, Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Message sent!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="my-12">
      <h1 className="text-3xl font-bold text-white mb-8">
        Contact<span className="text-blue-400">.</span>
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-[#111111] p-6 rounded-lg shadow-md text-white flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <User className="text-blue-400 w-5 h-5" />
            <span className="text-gray-400 text-sm">Abdullah Al Nirob</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-blue-400 w-5 h-5" />
            <span className="text-gray-400 text-sm">
              abdullahalnorob12@gmail.com
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-blue-400 w-5 h-5" />
            <span className="text-gray-400 text-sm">+880 1889396315</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="text-blue-400 w-5 h-5" />
            <span className="text-gray-400 text-sm">Bogura, Bangladesh</span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] p-6 rounded-lg shadow-md text-white flex-1 space-y-4"
        >
          <div>
            <input
              className="w-full px-4 py-2 text-sm rounded bg-[#1a1a1a] text-white border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              className="w-full px-4 py-2 text-sm rounded bg-[#1a1a1a] text-white border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              className="w-full px-4 py-2 text-sm rounded bg-[#1a1a1a] text-white border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div>
            <textarea
              className="w-full px-4 py-2 text-sm rounded bg-[#1a1a1a] text-white border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
              name="message"
              rows="4"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 text-sm rounded transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
