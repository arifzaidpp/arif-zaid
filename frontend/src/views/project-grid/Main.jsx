import {
  Lucide,
  Modal,
  ModalBody,
} from "@/base-components";
import useGetAllProjects from '../../hooks/useGetAllProjects';
import useDeleteProject from '../../hooks/useDeleteProject'; // Import delete hook
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null); // Track selected project ID
  const { projects, loading, error } = useGetAllProjects();
  const { deleteProject, loadingDelete } = useDeleteProject(); // Use delete hook
  const navigate = useNavigate();

  const [hoveredSection, setHoveredSection] = useState(null);

  const handleMouseEnter = (section) => {
    setHoveredSection(section);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
  };

  // Handle project deletion after confirmation
  const confirmDeleteProject = async () => {
    if (selectedProjectId) {
      try {
        await deleteProject(selectedProjectId); // Call delete function from hook
        setDeleteConfirmationModal(false); // Close the modal after deletion
        setSelectedProjectId(null); // Reset selected project ID
      } catch (error) {
        console.error("Failed to delete project:", error);
        toast.error("Failed to delete project. Please try again.");
      }
    }
  };


  // Handle delete project button click (opens the modal)
  const handleDeleteProject = (projectId) => {
    setSelectedProjectId(projectId); // Set the selected project ID
    setDeleteConfirmationModal(true); // Open the modal
  };

  // Render loading state
  if (loading) {
    return <div className="text-center">Loading projects...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-red-600 text-center">Error: {error}</div>;
  }

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Product Grid</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <a href="/admin/add-project">
            <button className="btn btn-primary shadow-md mr-2">
              Add New Product
            </button>
          </a>
          <a href="/add-project">
            <button className="btn px-2 box">
              <span className="w-5 h-5 flex items-center justify-center">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </button>
          </a>
          <div className="hidden md:block mx-auto text-slate-500">
            Showing 1 to 10 of 150 entries
          </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                id="search-input-edit-project"
                name="search"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>
        {projects.map((project, projectKey) => (
          <div
            key={projectKey}
            className="intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
          >
            <div className="box">
              <div className="p-5">
                <div className="h-40 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                  <img
                    alt="Midone - HTML Admin Template"
                    className="rounded-md"
                    src={project.image}
                  />
                  <div className="absolute bottom-0 text-white px-5 pb-6 z-10">
                    <a href="" className="block font-medium text-base">
                      {project.name}
                    </a>
                    <span className="text-white/90 text-xs mt-3">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  {/* The main content */}
                  <div className="text-slate-600 dark:text-slate-500 mt-5">
                    <div
                      className="flex items-center"
                      onMouseEnter={() => handleMouseEnter("description")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Lucide icon="SquarePen" className="w-4 h-4 mr-2" />
                      {project.description}
                    </div>

                    <div
                      className="flex items-center mt-2"
                      onMouseEnter={() => handleMouseEnter("languages")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Lucide icon="Binary" className="w-4 h-4 mr-2" />
                      {project.languages.join(", ")}
                    </div>

                    <div
                      className="flex items-center mt-2"
                      onMouseEnter={() => handleMouseEnter("features")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Lucide icon="Layers" className="w-4 h-4 mr-2" />
                      {project.features.join(", ")}
                    </div>

                    <div
                      className="flex items-center mt-2"
                      onMouseEnter={() => handleMouseEnter("status")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                      Status: {project.status ? "Active" : "Inactive"}
                    </div>
                  </div>

                  {/* Detailed view div that slides in above the hovered section */}
                  {hoveredSection && (
                    <div
                      className={`absolute bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out`}
                      style={{
                        // Positioning it just above the hovered section
                        bottom: hoveredSection === "description" ? 'calc(90% + 0.5rem)' :
                          hoveredSection === "languages" ? 'calc(60% + 0.5rem)' :
                            hoveredSection === "features" ? 'calc(35% + 0.5rem)' :
                              hoveredSection === "status" ? 'calc(10% + 0.5rem)' :
                                '', // Adjust as necessary for spacing
                        left: '0%', // Keep left as 0% for all
                        right: '0%', // Keep right as 0% for all
                        transform: hoveredSection ? 'translateY(-10px)' : 'translateY(0)', // Slight upward movement for effect
                        opacity: hoveredSection ? 1 : 0, // Fades in and out
                        pointerEvents: hoveredSection ? 'auto' : 'none', // Only allow interactions when shown
                        zIndex: 10 // Ensure it's above other elements
                      }}
                    >
                      {hoveredSection === "description" && (
                        <div>
                          <h4 className="font-bold">Project Description</h4>
                          <hr />
                          <p className="mt-2">{project.description}</p>
                        </div>
                      )}
                      {hoveredSection === "languages" && (
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
                      {hoveredSection === "features" && (
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
                      {hoveredSection === "status" && (
                        <div>
                          <h4 className="font-bold">Project Status</h4>
                          <hr />
                          <p className="mt-2">{project.status ? "Active" : "Inactive"}</p>
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
                <a
                  className="flex items-center mr-3 text-primary"
                  onClick={() => navigate(`/admin/edit-project/${project._id}`, { state: { project } })}
                >
                  <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" /> Edit
                </a>
                <a
                  className="flex items-center text-danger"
                  href="#"
                  onClick={() => handleDeleteProject(project._id)}
                >
                  <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                </a>
              </div>
            </div>
          </div>
        ))}
        {/* BEGIN: Pagination */}
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </nav>
          <select
            id="items-per-page"
            name="itemsPerPage"
            className="w-20 form-select box mt-3 sm:mt-0"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="35">35</option>
            <option value="50">50</option>
          </select>
        </div>
        {/* END: Pagination */}
      </div>

      {/* BEGIN: Modal for Deleting */}
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-5 text-center">
          <Lucide icon="XCircle" className="w-16 h-16 text-danger mx-auto mt-3" />
          <div className="text-3xl mt-5">Are you sure?</div>
          <div className="text-slate-500 mt-2">
            Do you really want to delete this project? This process cannot be undone.
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="button"
              onClick={confirmDeleteProject} // Trigger project deletion
              className="btn btn-danger w-24"
              disabled={loadingDelete} // Disable button if delete is in progress
            >
              {loadingDelete ? "Deleting..." : "Delete"}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary w-24 ml-2"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Modal for Deleting */}
    </>
  );
}

export default Main;
