import {
  Lucide,
  Tippy,
  Modal,
  ModalBody,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import { useState } from "react";
import useGetAllSkills from "../../hooks/skill/useGetAllSkills";
import useDeleteSkill from "../../hooks/skill/useDeleteSkill";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";


function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null); // Track selected skill ID
  const { skills, loading, error } = useGetAllSkills();
  const { deleteSkill, loadingDelete } = useDeleteSkill(); // Use delete hook
  const navigate = useNavigate();

  // Handle skill deletion after confirmation
  const confirmDeleteSkill = async () => {
    if (selectedSkillId) {
      try {
        await deleteSkill(selectedSkillId); // Call delete function from hook
        setDeleteConfirmationModal(false); // Close the modal after deletion
        setSelectedSkillId(null); // Reset selected skill ID
      } catch (error) {
        console.error("Failed to delete skill:", error);
        toast.error("Failed to delete skill. Please try again.");
      }
    }
  };


  // Handle delete skill button click (opens the modal)
  const handleDeleteSkill = (skillId) => {
    setSelectedSkillId(skillId); // Set the selected project ID
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
      <h2 className="intro-y text-lg font-medium mt-10">Edit Skills</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <a href="/admin/add-skill">
            <button className="btn btn-primary shadow-md mr-2">
              Add New Skill
            </button>

          </a>
          <a href="/admin/add-skill">
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
        {/* BEGIN: Data List */}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap uppercase">IMAGE</th>
                <th className="whitespace-nowrap uppercase">Skill NAME</th>
                <th className="whitespace-nowrap uppercase">Section</th>
                <th className="whitespace-nowrap uppercase">Category</th>
                <th className="text-center whitespace-nowrap uppercase">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, skillKey) => (
                <tr key={skillKey} className="intro-x">
                  <td className="w-40">
                    <div className="flex">
                      <div className="w-10 h-10 image-fit zoom-in">
                        <Tippy
                          tag="img"
                          alt="Skill Image"
                          className="rounded-full"
                          src={skill.image}
                          content={`Uploaded at `}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href="" className="font-medium whitespace-nowrap">
                      {skill.name}
                    </a>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {skill.category}
                    </div>
                  </td>
                  <td className="text-left">{skill.section}</td> {/* Changed from text-center to text-left */}
                  <td className="text-left">
                    {skill.category}
                  </td>
                  <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                      <a className="flex items-center mr-3"
                      onClick={() => navigate(`/admin/edit-skill/${skill._id}`, { state: { skill } })}>
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                        Edit
                      </a>
                      <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={() => handleDeleteSkill(skill._id)}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
        {/* END: Data List */}
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
          <select className="w-20 form-select box mt-3 sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
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
            Do you really want to delete this skill? This process cannot be undone.
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="button"
              onClick={confirmDeleteSkill} // Trigger project deletion
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
