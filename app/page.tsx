import Hero from "./components/Hero";
import ScrollingHeadline from "./components/ScrollingHeadline";
import About from "./components/About";
import BanglaKrisi from "./components/BanglaKrisi";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
// import Services2 from "./components/Services2";
// import SlidingEaseVerticalBars from "./components/SlidingEaseVerticalBars";

export default function Home() {
  return (
    <div>
      <Hero />
      <ScrollingHeadline />
      <BanglaKrisi />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <Footer />
      {/* <SlidingEaseVerticalBars
        backgroundColor="#F4F4F2"
        lineColor="#DEDEDA"
        barColor="#2B2B2B"
        animationSpeed={0.02}
      />
      <Services2 /> */}
    </div>
  );
}
