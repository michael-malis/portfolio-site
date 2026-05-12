import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { FancyVisualisationSection } from "./components/RegressionProjection/FancyVisualisationSection";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import HonorsAwards from "./components/HonorsAwards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen text-white" style={{ position: 'relative', zIndex: 1 }}>
      <Navbar />
      <Hero />
      <FancyVisualisationSection />
      <HonorsAwards />
      <Projects />
      <About />
      <Education />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
