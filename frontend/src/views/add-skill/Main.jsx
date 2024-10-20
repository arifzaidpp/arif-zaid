import { Lucide, TomSelect, Tippy } from "@/base-components";
import { useEffect, useState } from "react";
import useUploadImage from "../../hooks/useUploadImage";
import useDeleteImage from "../../hooks/useDeleteImage";
import useAddSkill from "../../hooks/skill/useAddSkill";
import useEditSkill from "../../hooks/skill/useEditSkill";

import { useLocation, useParams, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";


const Main = () => {
  const location = useLocation();
  const existingSkill = location.state?.skill;

  // State variables
  const [isSkillImageOpen, setIsSkillImageOpen] = useState(true);
  const [isSkillInfoOpen, setIsSkillInfoOpen] = useState(false);
  const [isSkillImageValid, setIsSkillImageValid] = useState(true);

  const { uploadImage, loading, error, data, publicId } = useUploadImage();
  const { deleteImage, deleteLoading, deleteError } = useDeleteImage();
  const { addSkill, loadingAdd, errorAdd } = useAddSkill();
  const { editSkill, loadingEdit, errorEdit } = useEditSkill();

  const extractPublicId = (imageUrl) => {
    // Regex to match everything after 'upload/' until the file extension
    const regex = /upload\/(?:[^\/]+\/)?([^\.]+)/;
    const match = imageUrl.match(regex);

    // If there's a match, return the captured group (the public_id), else return null
    return match ? match[1] : null;
  };
  var publicIdEdit = null;


  // Check if existingSkill and its image exist
  if (existingSkill?.image) {
    const imageUrl = existingSkill.image;

    // Extract public_id
    publicIdEdit = extractPublicId(imageUrl);

  } else {
    toast.error("No existing skill or image found.");
  }


  const [imagePreview, setImagePreview] = useState(existingSkill?.image || null);
  const [imageName, setImageName] = useState(existingSkill?.image || "");
  const [skillName, setSkillName] = useState(existingSkill?.name || "");
  const [category, setCategory] = useState(existingSkill?.category || []); // Changed to array
  const [section, setSection] = useState(existingSkill?.section || []); // Changed to array
  const [categories, setCategories] = useState([
    { label: '', value: '' },
    { label: 'Markup Languages', value: 'Markup Languages' },
    { label: 'Stylesheets', value: 'Stylesheets' },
    { label: 'JavaScript Libraries/Frameworks', value: 'JavaScript Libraries/Frameworks' },
    { label: 'Languages and Frameworks', value: 'Languages and Frameworks' },
    { label: 'Testing Frameworks', value: 'Testing Frameworks' },
    { label: 'Databases', value: 'Databases' },
    { label: 'Build Tools', value: 'Build Tools' },
    { label: 'Web Development', value: 'Web Development' },
    { label: 'Mobile Development', value: 'Mobile= Development' },
    { label: 'Design', value: 'Design' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Business', value: 'Business' },
    { label: 'Other Tools', value: 'Other Tools' },
  ]);
  const [sections, setSections] = useState([
    { label: '', value: '' },
    { label: 'Frontend Technologies', value: 'Frontend Technologies' },
    { label: 'Backend Technologies', value: 'Backend Technologies' },
    { label: 'Fullstack', value: 'Fullstack' },
    { label: 'UI/UX', value: 'UI/UX' },
    { label: 'SEO', value: 'SEO' },
    { label: 'Other Tools', value: 'Other Tools' },
  ]);
  const [touchedSkillName, setTouchedSkillName] = useState(false);
  const [touchedSkillCategory, setTouchedSkillCategory] = useState(false);
  const [touchedSkillSection, setTouchedSkillSection] = useState(false);
  const [touchedSkillImage, setTouchedSkillImage] = useState(false);

  const maxCharacters = 100;

  // Validation functions
  const isSkillNameValid = () => skillName.trim().length > 0; // Changed to a function
  const isSkillCategoryValid = () => category.length > 0; // Changed to a function
  const isSkillSectionValid = () => section.length > 0; // Changed to a function

  // Toggle functions to show one section at a time
  const toggleSkillImage = () => {
    setIsSkillImageOpen(!isSkillImageOpen);
    setIsSkillInfoOpen(false); // Hide Skill Info
  };

  const toggleSkillInfo = () => {
    setIsSkillInfoOpen(!isSkillInfoOpen);
    setIsSkillImageOpen(false); // Hide Skill Image
  };

  // Handlers for file upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
      setIsSkillImageValid(true);

      await uploadImage(file);
    }
  };

  const handleRemoveImage = async () => {
    if (publicId || publicIdEdit) {
      await deleteImage(publicId || publicIdEdit);
      setImagePreview(null);
      setImageName("");
      setTouchedSkillImage(true);
      setIsSkillImageValid(false); // Mark as invalid if image removed
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setImageName(file.name);
      setIsSkillImageValid(true);

      await uploadImage(file);
    }
  };

  // Event Handlers
  const handleSkillNameChange = (e) => setSkillName(e.target.value);
  const handleSkillNameBlur = () => setTouchedSkillName(true);

  const handleSkillCategoryChange = (value) => {
    setCategory(value);
    setTouchedSkillCategory(true); // Mark as touched
  };

  const handleSkillCategoryBlur = () => setTouchedSkillCategory(true);

  const handleSkillSectionChange = (value) => {
    setSection(value);
    setTouchedSkillSection(true); // Mark as touched
  };

  const handleSkillSectionBlur = () => setTouchedSkillSection(true);

  const handleCreateCategory = (inputValue) => {
    const newCategory = { label: inputValue, value: inputValue };
    setCategories([...categories, newCategory]);
  };

  const handleCreateSection = (inputValue) => {
    const newSection = { label: inputValue, value: inputValue };
    setSections([...sections, newSection]);
  };

  const handleAddOrUpdateSkill = async () => {
    // Check if all fields including the image are valid
    const isValid = isSkillNameValid() && isSkillCategoryValid() && isSkillSectionValid() && isSkillImageValid;

    if (!isValid) {
      toast.error('Please fill out all required fields.');

      // Set touched states to trigger error messages
      setTouchedSkillName(true);
      setTouchedSkillCategory(true);
      setTouchedSkillSection(true);
      setTouchedSkillImage(true);

      // Check if the image is not uploaded
      if (!imagePreview) {
        setIsSkillImageValid(false);
      }

      // Ensure both sections are open to display the errors
      setIsSkillInfoOpen(true);
      setIsSkillImageOpen(true);
    } else {
      // If validation is successful, proceed with adding the skill
      setIsSkillInfoOpen(true);
      setIsSkillImageOpen(true);

      const skillData = {
        image: imagePreview,
        name: skillName,
        category: category,
        section: section,
      };

      try {
        if (existingSkill) {
          // Edit skill
          await editSkill(existingSkill._id, skillData);
        } else {
          // Add new skill
          await addSkill(skillData);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to add skill");
      }


      // Logic to add the skill
      // Your skill addition logic goes here
    }
  };


  useEffect(() => {
    if (data) {
      if (imagePreview) {
        setImagePreview(null); // Clear the preview when new image is uploaded
        setImagePreview(data)
        existingSkill.image = null;
      }
      setImagePreview(data); // Set the preview when data is available
    }
  }, [data]);

  useEffect(() => {
    const skillUpdated = sessionStorage.getItem('skillUpdated');
    if (skillUpdated) {
      toast.success("Skill updated successfully");
      sessionStorage.removeItem('skillUpdated'); // Clean up flag
    }
  }, []);


  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="intro-y col-span-12 2xl:col-span-10">

          {/* BEGIN: Skill Image Upload */}
          <div className="intro-y box p-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div
                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 cursor-pointer"
                onClick={toggleSkillImage}
              >
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Upload Skill Image
              </div>

              {isSkillImageOpen && (
                <div className="mt-5">
                  <div className="flex items-center text-slate-500">
                    <span>
                      <Lucide icon="Lightbulb" className="w-5 h-5 text-warning" />
                    </span>
                    <div className="ml-2">
                      <span className="mr-1">
                        When uploading images of your skill, please follow these guidelines to ensure a smooth and high-quality experience.
                      </span>
                      <a href="#" className="text-primary font-medium">
                        Learn More
                      </a>
                    </div>
                  </div>

                  <div className="form-inline items-start flex-col xl:flex-row mt-10">
                    <div className="form-label w-full xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Skill Image</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          <div>
                            The image format is .jpg .jpeg .png and a minimum size of 300 x 300 pixels (For optimal images use a minimum size of 700 x 700 pixels).
                          </div>
                          <div className="mt-2">
                            Select skill image or drag and drop image here. Add attractive images to make the skill more appealing to viewers.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`form-control w-full mt-3 xl:mt-0 flex-1 border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4 ${!isSkillImageValid && touchedSkillImage ? "border-danger" : ""
                        }`}
                    >
                      <div className="flex justify-center items-center h-28 relative">
                        {loading || deleteLoading ? (
                          // Show loading spinner when loading is true
                          <div className="relative h-28 w-auto flex justify-center items-center">
                            <Lucide className="animate-spin w-8 h-8 text-primary" icon="Loader" />
                          </div>
                        ) : imagePreview ? (
                          <div className="relative h-28 w-auto">
                            <img
                              className="rounded-md max-h-full max-w-full object-contain"
                              alt="Uploaded Preview"
                              src={imagePreview}
                            />
                            {/* Show Remove icon only when image is uploaded and loading is false */}
                            {data && existingSkill?.image || !loading && (
                              <Tippy
                                content="Remove this image?"
                                className="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2 cursor-pointer"
                                onClick={handleRemoveImage}
                              >
                                <Lucide icon="X" className="w-4 h-4" />
                              </Tippy>
                            )}
                          </div>
                        ) : (
                          <div className="relative h-28 w-32 flex flex-col justify-center items-center">
                            <Lucide icon="Image" className="w-16 h-16 mx-auto" />
                            <span className="text-sm text-gray-500 mt-2">No image uploaded</span>
                            <input
                              id="horizontal-form-1"
                              type="file"
                              className="w-full h-full top-0 left-0 absolute opacity-0"
                              onChange={handleFileChange}
                              onDragOver={handleDragOver}
                              onDrop={handleDrop}
                            />
                          </div>
                        )}
                      </div>
                      <div className="px-4 pb-4 mt-5 flex items-center justify-center cursor-pointer relative">
                        <Lucide icon="Image" className="w-4 h-4 mr-2" />
                        <span className="text-primary mr-1">Upload a file</span> or drag and drop
                        <input
                          id="horizontal-form-1"
                          type="file"
                          className="w-full h-full top-0 left-0 absolute opacity-0"
                          onChange={handleFileChange}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                        />
                      </div>
                      {imageName && (
                        <div className="mt-2 text-center text-sm text-gray-500">{imageName}</div>
                      )}

                      {!isSkillImageValid && touchedSkillImage && (
                        <div className="text-danger mt-2 ml-4">Skill Image is required.</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* END: Skill Image Upload */}

          {/* BEGIN: Skill Information */}
          <div className="intro-y box p-5 mt-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div
                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 cursor-pointer"
                onClick={toggleSkillInfo}
              >
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Skill Information
              </div>

              {/* Conditionally render the skill information section */}
              {isSkillInfoOpen && (
                <div className="mt-5">
                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Skill Name</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          <div>
                            You need to type the name of the skill you want to add to your profile here.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <input
                        id="skill-name"
                        type="text"
                        className={`form-control ${!isSkillNameValid() && touchedSkillName ? "border-danger" : ""}`}
                        placeholder="Skill Name"
                        value={skillName}
                        onChange={handleSkillNameChange}
                        onBlur={handleSkillNameBlur}
                        maxLength={maxCharacters}
                      />
                      {!isSkillNameValid() && touchedSkillName && (
                        <div className="text-danger mt-2">
                          Skill name is required.
                        </div>
                      )}
                      <div className="form-help text-right">
                        Maximum character {skillName.length}/{maxCharacters}
                      </div>
                    </div>
                  </div>

                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Section</div>
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
                      <div onBlur={handleSkillSectionBlur}>
                        <TomSelect
                          id="section-select"
                          value={section}
                          onChange={handleSkillSectionChange}
                          create={true} // Allow creating new categories
                          onCreate={handleCreateSection}
                          placeholder="Select or add a section"
                          searchField="label"
                          className={`form-control w-full ${!isSkillSectionValid() && touchedSkillSection ? "border-danger" : ""}`}
                        >
                          {sections.map((sectionOption) => (
                            <option key={sectionOption.value} value={sectionOption.value}>
                              {sectionOption.label}
                            </option>
                          ))}
                        </TomSelect>
                      </div>
                      {!isSkillSectionValid() && touchedSkillSection && (
                        <div className="text-danger mt-2">
                          Skill Section is required.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Category</div>
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
                      <div onBlur={handleSkillCategoryBlur}>
                        <TomSelect
                          id="category-select"
                          value={category}
                          onChange={handleSkillCategoryChange}
                          create={true} // Allow creating new categories
                          onCreate={handleCreateCategory}
                          placeholder="Select or add a category"
                          searchField="label"
                          className={`form-control w-full ${!isSkillCategoryValid() && touchedSkillCategory ? "border-danger" : ""}`}
                        >
                          {categories.map((categoryOption) => (
                            <option key={categoryOption.value} value={categoryOption.value}>
                              {categoryOption.label}
                            </option>
                          ))}
                        </TomSelect>
                      </div>
                      {!isSkillCategoryValid() && touchedSkillCategory && (
                        <div className="text-danger mt-2">
                          Skill category is required.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* END: Skill Information */}

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
              onClick={handleAddOrUpdateSkill}
            >{loadingAdd ? (
              <div className="relative h-6 w-6 flex justify-center items-center">
                <Lucide className="animate-spin w-4 h-4 text-primary" icon="Loader" />
              </div>
            ) : (
              existingSkill ? "Update Skill" : "Add Skill"
            )
              }
            </button>
          </div>
        </div>
        <div className="intro-y col-span-2 hidden 2xl:block">
          <div className="pt-10 sticky top-0">
            <ul className="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:dark:bg-darkmode-600 before:h-full before:absolute before:left-0 before:z-[-1]">
              <li
                className={`mb-4 border-l-2 pl-5 ${isSkillImageOpen ? "border-primary dark:border-primary text-primary font-medium" : "border-transparent dark:border-transparent"}`}
                onClick={toggleSkillImage}
              >
                <a href="#">Upload Skill</a>
              </li>
              <li
                className={`mb-4 border-l-2 pl-5 ${isSkillInfoOpen ? "border-primary dark:border-primary text-primary font-medium" : "border-transparent dark:border-transparent"}`}
                onClick={toggleSkillInfo}
              >
                <a href="#">Skill Information</a>
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
                  Consider the target audience when naming your skill to ensure the title resonates and communicates the intended theme effectively.
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


