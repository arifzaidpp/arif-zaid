import React, { useState } from "react";
import Profile from "./Profile";
import Menu from "./Menu";
import { FaBars } from "react-icons/fa"; // Import menu and close icons
import Footer from "./footer";

const Sidebar = ({ onMenuItemClick }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to close the sidebar when clicking outside
  const closeSidebar = () => {
    if (sidebarOpen) setSidebarOpen(false);
  };

  return (
    <>
      {/* Sidebar with sliding animation */}
      <div
        className={`lg:w-[32%] md:w-[30%] sm:w-[35%] xl:w-[27%] 2xl:w-[22%] w-60 md:left-0 md:h-full md:top-0 left-0 h-full top-0 z-30 bg-gray-400 text-white fixed lg:static p-5 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`} // Hide/show sidebar with sliding effect
      >
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <Profile />
          {/* Menu Section */}
          <Menu onMenuItemClick={onMenuItemClick} /> {/* Pass the scroll function */}
          {/* Footer Section */}
          <Footer />
        </div>
      </div>

      {/* Blur effect overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-20"
          onClick={closeSidebar} // Clicking outside sidebar closes it
        ></div>
      )}

      {/* Top bar with menu button */}
      <div className="lg:hidden fixed left-0 right-0 top-0 bg-stone-300 h-auto shadow-md flex justify-between items-center z-10 px-4">
        <button
          className="text-teal-500 text-3xl" // Menu icon on the left
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Menu"
        >
          <FaBars />
        </button>
        <div className="flex my-2 flex-col items-center">
          {/* Title and subtitle */}
          <h1 className="text-3xl font-bold text-teal-700">Arif Zaid P P</h1>
          <p className="text-sm text-yellow-900 -mt-2">MERN Stack Developer</p>
        </div>
        <div className="w-8"></div>{" "}
        {/* Placeholder to keep the title centered */}
      </div>
    </>
  );
};

export default Sidebar;
