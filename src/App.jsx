import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skill from "./components/Skill";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Review from "./components/Review";

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Subtle animated background GIF layer */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-repeat opacity-5 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://68.media.tumblr.com/b85f7d06171a43eec004d0be2df7eafc/tumblr_ovrf25nuJ61urz3l2o1_500.gif')",
          backgroundSize: "300px",
        }}
      />

      {/* Main content with relative z-index */}
      <main className="relative z-10">
        <div className="max-w-4xl px-6 md:px-0 mx-auto">
          <Navbar />
          <div className="pt-16">
            <Hero />
            <About />
            <Skill />
            <Projects />
            <Review />
            {/* <Education /> */}
            <Contact />
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
