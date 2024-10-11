import React, { useState, useRef } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Banner from "../../components/banner/Banner";
import About from "../../components/about/About";
import Projects from "../../components/projects/Projects";
import Skills from "../../components/skills/Skills";
import Certificates from "../../components/certificates/Certificates";
import Education from "../../components/education/Education";
import Contact from "../../components/contact/Contact";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Create refs for each section
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const certificatesRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll to section function
  const scrollToSection = (section) => {
    switch (section) {
      case "About":
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "Projects":
        projectsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "Skills":
        skillsRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "Certificates":
        certificatesRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "Education":
        educationRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "Contact":
        contactRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      {/* Wrapper for the entire layout, 90% width */}
      <div className="relative w-[95%] lg:w-[90%] h-[calc(100vh-30px)] bg-white rounded-lg shadow-lg flex overflow-hidden">
        <Sidebar onMenuItemClick={scrollToSection} />

        {/* Main content area */}
        <div className="w-full overflow-y-auto scrollbar-hide mt-12 lg:mt-0">
          {/* Banner Section */}
          <Banner />

          {/* About Section */}
          <div ref={aboutRef}>
            <About />
          </div>

          {/* Projects Section */}
          <div ref={projectsRef}>
            <Projects />
          </div>

          {/* Skills Section */}
          <div ref={skillsRef}>
            <Skills />
          </div>

          {/* Certificates Section */}
          <div ref={certificatesRef}>
            <Certificates />
          </div>

          {/* Education Section */}
          <div ref={educationRef}>
            <Education />
          </div>

          {/* Contact Section */}
          <div ref={contactRef}>
            <Contact />
          </div>
        </div>
      </div>

      {/* Fixed top and bottom spacing */}
      <div className="fixed left-0 right-0 top-0 bg-transparent h-[15px]"></div>
      <div className="fixed left-0 right-0 bottom-0 bg-transparent h-[15px]"></div>
    </div>
  );
};

export default Home;
