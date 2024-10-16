import { Lucide, TomSelect, Tippy } from "@/base-components";
import { useState } from "react";

const Main = () => {
  // State variables
  const [educationName, setEducationName] = useState('');
  const [touchedEducationName, setTouchedEducationName] = useState(false);
  const [educationInstitution, setEducationInstitution] = useState('');
  const [touchedEducationInstitution, setTouchedEducationInstitution] = useState(false);
  const [educationYear, setEducationYear] = useState('');
  const [touchedEducationYear, setTouchedEducationYear] = useState(false);
  const [educationStatus, setEducationStatus] = useState(false);

  const maxCharacters = 100;
  const maxCharactersYear = 4;

  // Validation functions
  const isEducationNameValid = () => educationName.trim().length > 0;
  const isEducationInstitutionValid = () => educationName.trim().length > 0;
  const isEducationYearValid = () => educationName.trim().length > 0;


  // Event Handlers
  const handleEducationNameChange = (e) => setEducationName(e.target.value);
  const handleEducationNameBlur = () => setTouchedEducationName(true);
  const handleEducationInstitutionChange = (e) => setEducationInstitution(e.target.value);
  const handleEducationInstitutionBlur = () => setTouchedEducationInstitution(true);
  const handleEducationYearChange = (e) => setEducationYear(e.target.value);
  const handleEducationYearBlur = () => setTouchedEducationYear(true);



  const handleAddEducation = () => {
    // Check if all fields including the image are valid
    const isValid = isEducationNameValid() && isEducationInstitutionValid() && isEducationYearValid();

    if (!isValid) {
      console.log('Please fill out all required fields.');

      // Set touched states to trigger error messages
      setTouchedEducationName(true);
      setTouchedEducationInstitution(true);
      setTouchedEducationYear(true);

    } else {


      console.log('Education added successfully!' + educationName , educationInstitution, educationYear, educationStatus);


      // Logic to add the education
      // Your education addition logic goes here
    }
  };



  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="intro-y col-span-12 2xl:col-span-10">

          {/* BEGIN: Education Information */}
          <div className="intro-y box p-5 mt-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div
                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 cursor-pointer"
              >
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Education Information
              </div>

              {/* Conditionally render the education information section */}
                <div className="mt-5">
                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Education</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          <div>
                            You need to type the name of the education you want to add to your profile here.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <input
                        id="education-name"
                        type="text"
                        className={`form-control ${!isEducationNameValid() && touchedEducationName ? "border-danger" : ""}`}
                        placeholder="Education"
                        value={educationName}
                        onChange={handleEducationNameChange}
                        onBlur={handleEducationNameBlur}
                        maxLength={maxCharacters}
                      />
                      {!isEducationNameValid() && touchedEducationName && (
                        <div className="text-danger mt-2">
                          Education name is required.
                        </div>
                      )}
                      <div className="form-help text-right">
                        Maximum character {educationName.length}/{maxCharacters}
                      </div>
                    </div>
                  </div>

                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Institution</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          You can add a Section or choose from the existing Section list.
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                    <input
                        id="education-name"
                        type="text"
                        className={`form-control ${!isEducationInstitutionValid() && touchedEducationInstitution ? "border-danger" : ""}`}
                        placeholder="Institution Name" 
                        value={educationInstitution}
                        onChange={handleEducationInstitutionChange}
                        onBlur={handleEducationInstitutionBlur}
                        maxLength={maxCharacters}
                      />
                      {!isEducationInstitutionValid() && touchedEducationInstitution && (
                        <div className="text-danger mt-2">
                          Education name is required.
                        </div>
                      )}
                      <div className="form-help text-right">
                        Maximum character {educationInstitution.length}/{maxCharacters}
                      </div>
                    </div>
                  </div>

                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Year</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          You can add a category or choose from the existing category list.
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                    <input
                        id="education-name"
                        type="text"
                        className={`form-control ${!isEducationYearValid() && touchedEducationYear ? "border-danger" : ""}`}
                        placeholder="Year of Completion"
                        value={educationYear}
                        onChange={handleEducationYearChange}
                        onBlur={handleEducationYearBlur}
                        maxLength={maxCharactersYear}
                      />
                      {!isEducationYearValid() && touchedEducationYear && (
                        <div className="text-danger mt-2">
                          Education name is required.
                        </div>
                      )}
                      <div className="form-help text-right">
                        Maximum character {educationYear.length}/{maxCharactersYear}
                      </div>
                    </div>
                  </div>


                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Status</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          If the status is 'Completed,' your education is completed else it is expected to be completed.
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <div className="form-check form-switch">
                        <input
                          id="product-status-active"
                          className="form-check-input"
                          type="checkbox"
                          checked={educationStatus}
                          onChange={(e) => setEducationStatus(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="product-status-active"
                        >
                          Completed
                        </label>
                      </div>
                    </div>
                  </div>


                </div>
            </div>
          </div>
          {/* END: Education Information */}

          <div className="flex justify-end flex-col md:flex-row gap-2 mt-5">
            <button
              type="button"
              className="btn py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 w-full md:w-52"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 w-full md:w-52"
              onClick={handleAddEducation}
            >
              Add New Education
            </button>
          </div>
        </div>
        <div className="intro-y col-span-2 hidden 2xl:block">
          <div className="pt-10 sticky top-0">
            <ul className="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:dark:bg-darkmode-600 before:h-full before:absolute before:left-0 before:z-[-1]">
              <li
                className={`mb-4 border-l-2 pl-5 border-primary dark:border-primary text-primary font-medium`}
              >
                <a href="#">Education Information</a>
              </li>
            </ul>
            <div className="mt-10 bg-warning/20 dark:bg-darkmode-600 border border-warning dark:border-0 rounded-md relative p-5">
              <Lucide
                icon="Lightbulb"
                className="w-12 h-12 text-warning/80 absolute top-0 right-0 mt-5 mr-3"
              />
              <h2 className="text-lg font-medium">Tips</h2>
              <div className="mt-5 font-medium">Price</div>
              <div className="leading-relaxed text-xs mt-2 text-slate-600 dark:text-slate-500">
                <div>
                  The image format is .jpg .jpeg .png and a minimum size of 300 x 300 pixels (For optimal images use a minimum size of 700 x 700 pixels).
                </div>
                <div className="mt-2">
                  Consider the target audience when naming your education to ensure the title resonates and communicates the intended theme effectively.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;


