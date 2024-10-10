import React, { useState } from "react";
import Profile from "./Profile";
import Menu from "./Menu";
import Footer from "./footer";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar - Visible on lg screens with 10% width, larger on md and below */}
      <div
        className={`lg:w-[25%] md:w-[30%] sm:w-[35%] xl:w-[22%] 2xl:w-[18%] w-60 md:left-0 md:h-full md:top-0 left-0 h-full top-0 z-20 bg-gray-400 text-white lg:block ${
          sidebarOpen ? "block" : "hidden"
        } fixed lg:static p-5`}
      >
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <Profile />
          {/* Menu Section */}
          <Menu />
          {/* Footer Section */}
          <Footer />
        </div>
      </div>

      {/* Top bar with menu button */}
      <div className="lg:hidden fixed left-0 right-0 top-0 bg-white h-[50px] shadow-md flex justify-between items-center z-10 p-4">
        <h1 className="text-2xl font-bold">Page Title</h1>
        <button
          className="btn btn-primary"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          Menu
        </button>
      </div>
    </>
  );
};

export default Sidebar;
