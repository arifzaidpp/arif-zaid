import { Lucide, TomSelect, Tippy, Litepicker } from "@/base-components";
import { useEffect, useState } from "react";
import useUploadImage from "../../hooks/useUploadImage";
import useDeleteImage from "../../hooks/useDeleteImage";

const Main = () => {
  const [date, setDate] = useState("");
  // State variables
  const [isCertificateImageOpen, setIsCertificateImageOpen] = useState(true);
  const [isCertificateInfoOpen, setIsCertificateInfoOpen] = useState(false);
  const [isCertificateImageValid, setIsCertificateImageValid] = useState(true);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");
  const [certificateName, setCertificateName] = useState('');
  const [category, setCategory] = useState([]); // Changed to array
  const [categories, setCategories] = useState([
    { label: '', value: '' },
    { label: 'Web Development', value: 'web-development' },
    { label: 'Android Development', value: 'android-development' },
    { label: 'iOS Development', value: 'ios-development' },
    { label: 'Design', value: 'design' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Business', value: 'business' },
    { label: 'Finance', value: 'finance' },
    { label: 'Health', value: 'health' },
    { label: 'Music', value: 'music' },
    { label: 'Photography', value: 'photography' },
    { label: 'Language', value: 'language' },
    { label: 'Education', value: 'education' },
    { label: 'Lifestyle', value: 'lifestyle' },
    { label: 'Personal Development', value: 'personal-development' },
    { label: 'Fitness', value: 'fitness' },
    { label: 'Food', value: 'food' },
    { label: 'Gaming', value: 'gaming' },
    { label: 'Sports', value: 'sports' },
    { label: 'Travel', value: 'travel' },
    { label: 'UI/UX', value: 'ui-ux' },
  ]);
  const [touchedCertificateName, setTouchedCertificateName] = useState(false);
  const [touchedCertificateCategory, setTouchedCertificateCategory] = useState(false);
  const [touchedCertificateImage, setTouchedCertificateImage] = useState(false);

  const { uploadImage, loading, error, data, publicId } = useUploadImage();
  const { deleteImage, deleteLoading, deleteError } = useDeleteImage();

  const maxCharacters = 100;

  // Validation functions
  const isCertificateNameValid = () => certificateName.trim().length > 0; // Changed to a function
  const isCertificateCategoryValid = () => category.length > 0; // Changed to a function

  // Toggle functions to show one section at a time
  const toggleCertificateImage = () => {
    setIsCertificateImageOpen(!isCertificateImageOpen);
    setIsCertificateInfoOpen(false); // Hide Certificate Info
  };

  const toggleCertificateInfo = () => {
    setIsCertificateInfoOpen(!isCertificateInfoOpen);
    setIsCertificateImageOpen(false); // Hide Certificate Image
  };

  // Handlers for file upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
      setIsCertificateImageValid(true);

      // Upload image and set the preview when the upload is complete
      await uploadImage(file);
    }
  };

  const handleRemoveImage = async () => {
    if (publicId) {
      await deleteImage(publicId); // Call deleteImage with the public ID
      setImagePreview(null); // Remove the image preview
      setImageName("");
      setTouchedCertificateImage(true);
      setIsCertificateImageValid(false); // Mark as invalid if image removed
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
      setIsCertificateImageValid(true);

      // Upload image and set the preview when the upload is complete
      await uploadImage(file);
    }
  };

  // Event Handlers
  const handleCertificateNameChange = (e) => setCertificateName(e.target.value);
  const handleCertificateNameBlur = () => setTouchedCertificateName(true);

  const handleCertificateCategoryChange = (value) => {
    setCategory(value);
    setTouchedCertificateCategory(true); // Mark as touched
  };

  const handleCertificateCategoryBlur = () => setTouchedCertificateCategory(true);

  const handleCreateCategory = (inputValue) => {
    const newCategory = { label: inputValue, value: inputValue };
    setCategories([...categories, newCategory]);
  };



  const handleAddCertificate = () => {
    // Check if all fields including the image are valid
    const isValid = isCertificateNameValid() && isCertificateCategoryValid() && isCertificateImageValid;

    if (!isValid) {
      console.log('Please fill out all required fields.');

      // Set touched states to trigger error messages
      setTouchedCertificateName(true);
      setTouchedCertificateCategory(true);
      setTouchedCertificateImage(true);

      // Check if the image is not uploaded
      if (!imagePreview) {
        setIsCertificateImageValid(false);
      }

      // Ensure both sections are open to display the errors
      setIsCertificateInfoOpen(true);
      setIsCertificateImageOpen(true);
    } else {
      // If validation is successful, proceed with adding the certificate
      setIsCertificateInfoOpen(true);
      setIsCertificateImageOpen(true);

      console.log('Certificate added successfully!', {
        imageName,
        certificateName,
        category,
        date // Include the selected date
      });

      // Logic to add the certificate
      // Your certificate addition logic goes here
    }
  };


  // Use useEffect to log data when it updates and set the image preview
  useEffect(() => {
    if (data) {
      console.log('Upload successful:', data); // Log when data updates
      setImagePreview(data); // Set the preview when data is available
    }
  }, [data]); // Runs whenever 'data' changes


  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="intro-y col-span-12 2xl:col-span-10">

          {/* BEGIN: Certificate Image Upload */}
          <div className="intro-y box p-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div
                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 cursor-pointer"
                onClick={toggleCertificateImage}
              >
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Upload Certificate Image
              </div>

              {isCertificateImageOpen && (
                <div className="mt-5">
                  <div className="flex items-center text-slate-500">
                    <span>
                      <Lucide icon="Lightbulb" className="w-5 h-5 text-warning" />
                    </span>
                    <div className="ml-2">
                      <span className="mr-1">
                        When uploading images of your certificate, please follow these guidelines to ensure a smooth and high-quality experience.
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
                          <div className="font-medium">Certificate Image</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          <div>
                            The image format is .jpg .jpeg .png and a minimum size of 300 x 300 pixels (For optimal images use a minimum size of 700 x 700 pixels).
                          </div>
                          <div className="mt-2">
                            Select certificate image or drag and drop image here. Add attractive images to make the certificate more appealing to viewers.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`form-control w-full mt-3 xl:mt-0 flex-1 border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4 ${!isCertificateImageValid && touchedCertificateImage ? "border-danger" : ""
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
                            {data && !loading && (
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

                      {!isCertificateImageValid && touchedCertificateImage && (
                        <div className="text-danger mt-2 ml-4">Certificate Image is required.</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* END: Certificate Image Upload */}


          {/* BEGIN: Certificate Information */}
          <div className="intro-y box p-5 mt-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div
                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 cursor-pointer"
                onClick={toggleCertificateInfo}
              >
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Certificate Information
              </div>

              {/* Conditionally render the certificate information section */}
              {isCertificateInfoOpen && (
                <div className="mt-5">
                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Certificate Name</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          <div>
                            You need to type the name of the certificate you want to add to your profile here.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <input
                        id="certificate-name"
                        type="text"
                        className={`form-control ${!isCertificateNameValid() && touchedCertificateName ? "border-danger" : ""}`}
                        placeholder="Certificate Name"
                        value={certificateName}
                        onChange={handleCertificateNameChange}
                        onBlur={handleCertificateNameBlur}
                        maxLength={maxCharacters}
                      />
                      {!isCertificateNameValid() && touchedCertificateName && (
                        <div className="text-danger mt-2">
                          Certificate name is required.
                        </div>
                      )}
                      <div className="form-help text-right">
                        Maximum character {certificateName.length}/{maxCharacters}
                      </div>
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
                      <div onBlur={handleCertificateCategoryBlur}>
                        <TomSelect
                          id="category-select"
                          value={category}
                          onChange={handleCertificateCategoryChange}
                          create={true} // Allow creating new categories
                          onCreate={handleCreateCategory}
                          placeholder="Select or add a category"
                          searchField="label"
                          className={`form-control w-full ${!isCertificateCategoryValid() && touchedCertificateCategory ? "border-danger" : ""}`}
                        >
                          {categories.map((categoryOption) => (
                            <option key={categoryOption.value} value={categoryOption.value}>
                              {categoryOption.label}
                            </option>
                          ))}
                        </TomSelect>
                      </div>
                      {!isCertificateCategoryValid() && touchedCertificateCategory && (
                        <div className="text-danger mt-2">
                          Certificate category is required.
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
                      <div className="relative w-full mx-auto">
                        <div className="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                          <Lucide icon="Calendar" className="w-4 h-4" />
                        </div>
                        <Litepicker id="input-group-datepicker" name="input-group-datepicker" // Added name attribute 
                          value={date} onChange={setDate} options={{
                            autoApply: false,
                            showWeekNumbers: true,
                            dropdowns: {
                              minYear: 2005,
                              maxYear: null,
                              months: true,
                              years: true,
                            },
                          }} className="form-control pl-12" />
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
          {/* END: Certificate Information */}

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
              onClick={handleAddCertificate}
            >
              Add New Certificate
            </button>
          </div>
        </div>
        <div className="intro-y col-span-2 hidden 2xl:block">
          <div className="pt-10 sticky top-0">
            <ul className="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:dark:bg-darkmode-600 before:h-full before:absolute before:left-0 before:z-[-1]">
              <li
                className={`mb-4 border-l-2 pl-5 ${isCertificateImageOpen ? "border-primary dark:border-primary text-primary font-medium" : "border-transparent dark:border-transparent"}`}
                onClick={toggleCertificateImage}
              >
                <a href="#">Upload Certificate</a>
              </li>
              <li
                className={`mb-4 border-l-2 pl-5 ${isCertificateInfoOpen ? "border-primary dark:border-primary text-primary font-medium" : "border-transparent dark:border-transparent"}`}
                onClick={toggleCertificateInfo}
              >
                <a href="#">Certificate Information</a>
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
                  Consider the target audience when naming your certificate to ensure the title resonates and communicates the intended theme effectively.
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


