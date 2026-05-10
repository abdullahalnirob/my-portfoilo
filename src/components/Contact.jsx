import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: User,
      label: "Name",
      value: "Abdullah Al Nirob",
    },
    {
      icon: Mail,
      label: "Email",
      value: "abdullahalnirob12@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+88 01305719889",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bogura, Bangladesh",
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Get in Touch<span className="text-blue-400">.</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mb-6"></div>
          <p className="text-gray-400 text-base md:text-lg">
            Have a project in mind? Let's collaborate and bring your ideas to life.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8">
              Contact Information
            </h3>

            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-500/5 transition-colors duration-200 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 flex items-center justify-center group-hover:border-blue-400/60 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">
                      {info.label}
                    </p>
                    <p className="text-white text-base font-semibold">
                      {info.value}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Additional Info */}
            <div className="mt-8 p-6 rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hello, feel free to reach out!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Name
              </label>
              <input
                className="w-full px-4 py-3 text-base rounded-lg bg-gray-900/50 text-white border border-gray-700 hover:border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 placeholder-gray-500 transition-all duration-200 outline-none"
                type="text"
                name="name"
                placeholder="Abdullah Al Nirob"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Email
              </label>
              <input
                className="w-full px-4 py-3 text-base rounded-lg bg-gray-900/50 text-white border border-gray-700 hover:border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 placeholder-gray-500 transition-all duration-200 outline-none"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Subject Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                className="w-full px-4 py-3 text-base rounded-lg bg-gray-900/50 text-white border border-gray-700 hover:border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 placeholder-gray-500 transition-all duration-200 outline-none"
                type="text"
                name="subject"
                placeholder="Project or collaboration inquiry"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                className="w-full px-4 py-3 text-base rounded-lg bg-gray-900/50 text-white border border-gray-700 hover:border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 placeholder-gray-500 transition-all duration-200 outline-none resize-none"
                name="message"
                rows="5"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-3 px-6 text-base rounded-lg hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              Send Message
            </button>

            {/* Success Message */}
            {submitted && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium animate-fadeIn">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Contact;