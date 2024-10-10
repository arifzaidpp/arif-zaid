import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      {/* Wrapper for the entire layout, 90% width */}
      <div className="relative w-[95%] lg:w-[90%] h-[calc(100vh-30px)] bg-white rounded-lg shadow-lg flex overflow-hidden">

        <Sidebar/>

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto p-5 mt-[35px] lg:mt-0 h-[calc(100vh-30px)] ">
          {/* Content that will scroll */}
          <div className="h-[calc(150vh-50px)]">
            <h1 className="text-3xl font-bold mb-4">Scrollable Web Page</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              vehicula urna eget varius facilisis. Praesent non lorem id lectus
              faucibus bibendum. Fusce sit amet erat nec magna gravida luctus
              non at lorem. Pellentesque habitant morbi tristique senectus et
              netus et malesuada fames ac turpis egestas.
            </p>
            {/* More content as needed */}
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
