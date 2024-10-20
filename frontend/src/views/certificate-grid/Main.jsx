import {
  Lucide,
  Modal,
  ModalBody,
} from "@/base-components";
import { faker as $f } from "@/utils";
import { useState } from "react";
import useDeleteCertificate from "../../hooks/certificate/useDeleteCertificate";
import useGetAllCertificates from "../../hooks/certificate/useGetAllCertificate";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";


function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [selectedCertificateId, setSelectedCertificateId] = useState(null); // Track selected certificate ID
  const { certificates, loading, error } = useGetAllCertificates();
  const { deleteCertificate, loadingDelete } = useDeleteCertificate(); // Use delete hook
  const navigate = useNavigate();

  // Handle certificate deletion after confirmation
  const confirmDeleteCertificate = async () => {
    if (selectedCertificateId) {
      try {
        await deleteCertificate(selectedCertificateId); // Call delete function from hook
        setDeleteConfirmationModal(false); // Close the modal after deletion
        setSelectedCertificateId(null); // Reset selected certificate ID
      } catch (error) {
        console.error("Failed to delete certificate:", error);
        toast.error("Failed to delete certificate. Please try again.");
      }
    }
  };


  // Handle delete certificate button click (opens the modal)
  const handleDeleteCertificate = (certificateId) => {
    setSelectedCertificateId(certificateId); // Set the selected project ID
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
      <h2 className="intro-y text-lg font-medium mt-10">Edit Certificates</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <a href="/admin/add-certificate">
            <button className="btn btn-primary shadow-md mr-2">
              Add New Certificate
            </button>

          </a>
          <a href="/admin/add-certificate">
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
        {/* BEGIN: Users Layout */}
        {certificates.map((certificate, certificateKey) => (
          <div key={certificateKey} className="intro-y col-span-12 md:col-span-6">
            <div className="box">
              <div className="flex flex-col lg:flex-row items-center p-5">
                <div className="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
                  <img
                    alt="Certificate Image"
                    className="rounded-full"
                    src={certificate.image}
                  />
                </div>
                <div className="lg:ml-2 lg:mr-4 text-center lg:text-left mt-3 lg:mt-0">
                  <a href="" className="font-medium">
                    {certificate.name}
                  </a>
                  <div className="text-slate-500 text-xs mt-0.5">
                    {certificate.category}
                  </div>
                </div>
                <div className="flex mt-4 lg:mr-auto lg:mt-0 items-center space-x-2">
                  <div className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-lg">
                    {new Date(certificate.date).toLocaleDateString('en-CA')}
                  </div>
                </div>
                <div className="flex mt-4 lg:mt-0">
                  <a className="btn btn-primary py-1 px-2 mr-2"
                    onClick={() => navigate(`/admin/edit-certificate/${certificate._id}`, { state: { certificate } })}>
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                    Edit
                  </a>
                  <button className="btn btn-outline-secondary py-1 px-2" onClick={() => {
                    handleDeleteCertificate(certificate._id);
                  }}>
                    <Lucide icon="Trash2" className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* BEGIN: Users Layout */}
        {/* END: Pagination */}
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
            Do you really want to delete this certificate? This process cannot be undone.
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="button"
              onClick={confirmDeleteCertificate} // Trigger project deletion
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
