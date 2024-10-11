import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Banner from "../../components/banner/Banner";
import About from "../../components/about/About";
import Projects from "../../components/projects/Projects";
import Skills from "../../components/skills/Skills";
import Certificates from "../../components/certificates/Certificates";
import Education from "../../components/education/Education";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      {/* Wrapper for the entire layout, 90% width */}
      <div className="relative w-[95%] lg:w-[90%] h-[calc(100vh-30px)] bg-white rounded-lg shadow-lg flex overflow-hidden">
        <Sidebar />

        {/* Main content area */}
        <div className="w-full overflow-y-auto scrollbar-hide mt-12 lg:mt-0">
          {/* Banner Section */}
          <Banner />

          {/* About Section */}
          <About />

          {/* Projects Section */}
          <Projects />

          {/* Skills Section */}
          <Skills />

          {/* Certificates Section */}
          <Certificates />

          {/* Education Section */}
          <Education />
          
          {/* Additional space for better scrolling */}
          <div className="h-20"></div>
        </div>
      </div>

      {/* Fixed top and bottom spacing */}
      <div className="fixed left-0 right-0 top-0 bg-transparent h-[15px]"></div>
      <div className="fixed left-0 right-0 bottom-0 bg-transparent h-[15px]"></div>
    </div>
  );
};

export default Home;
