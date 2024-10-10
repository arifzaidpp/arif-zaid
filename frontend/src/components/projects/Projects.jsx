import React, { useState } from "react";
import SectionHeaders from "../sectionHeaders/SectionHeaders";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"; // Importing the GitHub and Live icons

const Projects = () => {
  // State to manage the index of the currently opened sliding div
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle function to show/hide details
  const toggleDetails = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <SectionHeaders section="Projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 p-6 sm:p-10 lg:p-28 mx-auto bg-[url('./bg.png')]">
        {/* Card Template */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="mx-3 mt-6 flex flex-col relative rounded-lg bg-white shadow-lg text-surface dark:bg-surface-dark dark:text-white overflow-hidden"
          >
            <a href="#!">
              <img
                className="rounded-t-lg"
                src={`https://tecdn.b-cdn.net/img/new/standard/city/0${
                  41 + index
                }.webp`}
                alt={`Card ${index + 1}`}
              />
            </a>
            <div className="card-body text-black p-4 flex flex-col">
              <div className="flex justify-between items-center">
                <h2 className="card-title text-lg font-bold">
                  Shoes!
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                {/* Three Dots Icon */}
                <button
                  onClick={() => toggleDetails(index)}
                  className="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a2 2 0 100-4 2 2 0 000 4zm4 0a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <p className="mb-4 text-base">
                If a dog chews shoes whose shoes does he choose?
              </p>
              <div className="card-actions justify-end mt-auto">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>

            {/* Sliding Div */}
            <div
              className={`absolute bottom-0 left-0 w-full bg-white text-black transition-all duration-300 ease-in-out overflow-hidden ${
                activeIndex === index
                  ? "h-full opacity-100 p-4"
                  : "h-0 opacity-0"
              }`} // Adjust the height as needed
            >
              <div className="flex justify-between">
                <h3 className="text-xl font-bold mb-2">Features</h3>

                {/* Close Icon */}
                <button
                  onClick={() => toggleDetails(index)}
                  className="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9.293l4.146-4.147a1 1 0 111.414 1.414L11.414 10l4.146 4.147a1 1 0 11-1.414 1.414L10 11.414l-4.146 4.147a1 1 0 01-1.414-1.414L8.586 10 4.44 5.854a1 1 0 111.414-1.414L10 9.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <ul className="list-disc list-inside mb-4 ml-4">
                <li>Login</li>
                <li>Signup</li>
                <li>User Dashboard</li>
                <li>Profile Management</li>
                <li>Real-time Notifications</li>
                {/* Add more features as needed */}
              </ul>

              {/* Horizontal Line */}
              <hr className="border-t border-gray-400 my-2 w-full max-w-[90%] bottom-16 absolute" />

              {/* Navigation Icons positioned at the bottom left */}
              <div className="absolute bottom-4 left-4 flex space-x-4">
                <a href="#!" className="flex justify-center items-center">
                  <div className="flex justify-center items-center h-10 w-10 bg-green-500 rounded-full text-white">
                    <FaExternalLinkAlt className="h-5 w-5" />
                  </div>
                </a>
                <a href="#!" className="flex justify-center items-center">
                  <div className="flex justify-center items-center h-10 w-10 bg-gray-800 rounded-full text-white">
                    <FaGithub className="h-5 w-5" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Projects;
