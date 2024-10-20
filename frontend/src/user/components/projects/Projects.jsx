import React, { useState } from "react";
import SectionHeaders from "../sectionHeaders/SectionHeaders";
import { Lucide } from "@/base-components"; // Import Lucide icons
import useGetAllProjects from "../../../hooks/project/useGetAllProjects";

const Projects = () => {
  // State to manage the index of the currently opened sliding div
  const [activeIndex, setActiveIndex] = useState(null);

  // Get all projects from the API
  const { projects, loading, error } = useGetAllProjects();

  // State to manage hovered sections for each project individually
  const [hoveredSection, setHoveredSection] = useState({});

  // Toggle function to show/hide details
  const toggleDetails = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleMouseEnter = (index, section) => {
    setHoveredSection((prevState) => ({
      ...prevState,
      [index]: section,
    }));
  };

  const handleMouseLeave = (index) => {
    setHoveredSection((prevState) => ({
      ...prevState,
      [index]: null,
    }));
  };

  return (
    <>
      <SectionHeaders section="Projects" />
      <div className="grid grid-cols-12 p-6 sm:p-10 lg:p-28 mx-auto bg-[url('./src/assets/bg.png')] gap-6 mt-5">
        {/* Card Template */}
        {projects.map((project, projectKey) => (
          <div
            key={projectKey}
            className="intro-y col-span-12 md:col-span-6 lg:col-span-8 xl:col-span-6"
          >
            <div className="box">
              <div className="p-5">
                <div className="h-52 sm:h-56 md:h-64 xl:h-60 2xl:h-80 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                  <img
                    alt="Midone - HTML Admin Template"
                    className="rounded-md"
                    src={project.image}
                  />
                  <div className="absolute bottom-0 text-white px-5 pb-6 z-10">
                    <a href="#" className="block font-medium text-base">
                      {project.name}
                    </a>
                    <span className="text-white/90 text-xs mt-3 cursor-default">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  {/* The main content */}
                  <div className="text-slate-600 dark:text-slate-500 mt-5">
                    <div
                      className="flex items-center cursor-zoom-in"
                      onMouseEnter={() => handleMouseEnter(projectKey, "description")}
                      onMouseLeave={() => handleMouseLeave(projectKey)}
                    >
                      <Lucide icon="SquarePen" className="w-4 h-4 mr-2" />
                      {project.description}
                    </div>

                    <div
                      className="flex items-center mt-2 cursor-zoom-in"
                      onMouseEnter={() => handleMouseEnter(projectKey, "languages")}
                      onMouseLeave={() => handleMouseLeave(projectKey)}
                    >
                      <Lucide icon="Binary" className="w-4 h-4 mr-2" />
                      {project.languages.join(", ")}
                    </div>

                    <div
                      className="flex items-center mt-2 cursor-zoom-in"
                      onMouseEnter={() => handleMouseEnter(projectKey, "features")}
                      onMouseLeave={() => handleMouseLeave(projectKey)}
                    >
                      <Lucide icon="Layers" className="w-4 h-4 mr-2" />
                      {project.features.join(", ")}
                    </div>

                    <div className="flex items-center mt-2 cursor-default">
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                      Status: {project.status ? "Active" : "Inactive"}
                    </div>
                  </div>

                  {/* Detailed view div that slides in above the hovered section */}
                  {hoveredSection[projectKey] && (
                    <div
                      className={`absolute bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out`}
                      style={{
                        // Positioning it just above the hovered section
                        bottom:
                          hoveredSection[projectKey] === "description"
                            ? "calc(90% + 0.5rem)"
                            : hoveredSection[projectKey] === "languages"
                            ? "calc(60% + 0.5rem)"
                            : hoveredSection[projectKey] === "features"
                            ? "calc(35% + 0.5rem)"
                            : "", // Adjust as necessary for spacing
                        left: "0%", // Keep left as 0% for all
                        right: "0%", // Keep right as 0% for all
                        transform: hoveredSection[projectKey]
                          ? "translateY(-10px)"
                          : "translateY(0)", // Slight upward movement for effect
                        opacity: hoveredSection[projectKey] ? 1 : 0, // Fades in and out
                        pointerEvents: hoveredSection[projectKey] ? "auto" : "none", // Only allow interactions when shown
                        zIndex: 10, // Ensure it's above other elements
                      }}
                    >
                      {hoveredSection[projectKey] === "description" && (
                        <div>
                          <h4 className="font-bold">Project Description</h4>
                          <hr />
                          <p className="mt-2">{project.description}</p>
                        </div>
                      )}
                      {hoveredSection[projectKey] === "languages" && (
                        <div>
                          <h4 className="font-bold">Languages Used</h4>
                          <hr />
                          <ul className="mt-2">
                            {project.languages.map((lang, index) => (
                              <li key={index}>{lang}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {hoveredSection[projectKey] === "features" && (
                        <div>
                          <h4 className="font-bold">Project Features</h4>
                          <hr />
                          <ul className="mt-2">
                            {project.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center lg:justify-end items-center p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                {project.status ? (
                  <a className="flex items-center text-primary mr-4" href={project.live}>
                    <Lucide icon="Eye" className="w-4 h-4 mr-1" /> Preview
                  </a>
                ) : (
                  ""
                )}
                <a className="flex items-center text-primary mr-auto" href={project.github}>
                  <Lucide icon="Github" className="w-4 h-4 mr-1" /> Github
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
