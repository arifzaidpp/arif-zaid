import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Banner from "../../components/banner/Banner";

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
          <div className="w-[95%] lg:w-[90%] mt-10 bg-white rounded-lg shadow-lg p-8 mx-auto">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Hello! I am Arif Zaid, a passionate MERN Stack Developer who loves
              building things that make a difference. I have a keen interest in
              developing efficient and scalable web applications using the
              latest technologies in the MERN stack (MongoDB, Express, React,
              Node.js). I am constantly learning and improving my skills to stay
              up-to-date with the latest industry trends.
            </p>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed">
              My goal is to create meaningful and impactful solutions that
              address real-world challenges. Whether it's building web
              applications, automating tasks, or working on innovative projects,
              I am always driven by a desire to make a positive difference.
            </p>
          </div>

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
