import {
  Lucide,
  Tippy,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalBody,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import { useState } from "react";
import classnames from "classnames";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Edit Education</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
        <a href="/add-education">
            <button className="btn btn-primary shadow-md mr-2">
              Add New Education
            </button>

          </a>
          <a href="/add-education">
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
                <th className="whitespace-nowrap uppercase">Education</th>
                <th className="whitespace-nowrap uppercase">Institution</th>
                <th className="whitespace-nowrap uppercase">Year</th>
                <th className="whitespace-nowrap uppercase">Status</th>
                <th className="text-center whitespace-nowrap uppercase">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {$_.take($f(), 9).map((faker, fakerKey) => (
                <tr key={fakerKey} className="intro-x">
                  <td className="font-medium whitespace-nowrap">
                  {faker.products[0].name}
                  </td>
                  <td className="font-medium whitespace-nowrap">
                  {faker.products[0].category}
                  </td>
                  <td className="font-medium whitespace-nowrap">
                  {faker.stocks[0]}
                  </td>
                  <td className="text-left">
                  {faker.trueFalse[0] ? "Completed" : "In Progress"}
                  </td>
                  <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                      <a className="flex items-center mr-3" href="#">
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                        Edit
                      </a>
                      <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={() => {
                          setDeleteConfirmationModal(true);
                        }}
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
      {/* BEGIN: Delete Confirmation Modal */}
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 text-danger mx-auto mt-3"
            />
            <div className="text-3xl mt-5">Are you sure?</div>
            <div className="text-slate-500 mt-2">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger w-24">
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal */}
    </>
  );
}

export default Main;
