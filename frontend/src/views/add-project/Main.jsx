import {
  Lucide,
  Tippy,
  TomSelect,
} from "@/base-components";
import { useEffect, useState } from "react";
import useUploadImage from "../../hooks/useUploadImage";
import useDeleteImage from "../../hooks/useDeleteImage";
import useAddProject from "../../hooks/project/useAddProject";
import useEditProject from "../../hooks/project/useEditProject";

import { useLocation, useParams, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function Main() {
  const location = useLocation(); // Access location state to get project data for update
  const existingProject = location.state?.project; // Check if a project is passed for editing

  // State variables for form fields
  const [projectName, setProjectName] = useState(existingProject?.name || "");
  const [imageName, setImageName] = useState(existingProject?.image || "");
  const [imagePreview, setImagePreview] = useState(existingProject?.image || "");
  const [projectDescription, setProjectDescription] = useState(existingProject?.description || "");
  const [projectLink, setProjectLink] = useState(existingProject?.live || ""); // Optional
  const [githubLink, setGithubLink] = useState(existingProject?.github || "");
  const [category, setCategory] = useState(existingProject?.languages || []);
  const [language, setLanguage] = useState(existingProject?.languages || []);
  const [feature, setFeature] = useState(existingProject?.features || []);
  const [projectStatus, setProjectStatus] = useState(existingProject?.status || false); // Default to false

  const { addProject, loadingAdd, errorAdd } = useAddProject();
  const { editProject, loadingEdit, errorEdit } = useEditProject();
  const { uploadImage, loading, error, data, publicId } = useUploadImage();
  const { deleteImage, deleteLoading, deleteError } = useDeleteImage();
  // State variables for form fields

  const extractPublicId = (imageUrl) => {
    // Regex to match everything after 'upload/' until the file extension
    const regex = /upload\/(?:[^\/]+\/)?([^\.]+)/;
    const match = imageUrl.match(regex);

    // If there's a match, return the captured group (the public_id), else return null
    return match ? match[1] : null;
};
var publicIdEdit = null;


// Check if existingProject and its image exist
useEffect(() => {
  if (existingProject?.image) {
    const imageUrl = existingProject.image;
    // Extract public_id
    const extractedPublicId = extractPublicId(imageUrl);
    if (extractedPublicId) {
      publicIdEdit = extractedPublicId;
    } else {
      toast.error("No existing project or image found.");
    }
  }
}, [existingProject]);



  // Validation states
  const [isProjectImageValid, setIsProjectImageValid] = useState(true);
  const isProjectNameValid = () => projectName.trim() !== ""; // Simple validation for project name
  const isProjectDescriptionValid = () => projectDescription.trim() !== ""; // Check that description is not empty
  const isGithubValid = () => validateGithubURL(githubLink);
  const isProjectCategoryValid = () => category.length > 0; // Changed to a function
  const isProjectLanguageValid = () => language.length >= 2;
  const isProjectFeatureValid = () => feature.length >= 1;
  const [isProjectLinkValid, setIsProjectLinkValid] = useState(true);

  useEffect(() => {
    if (existingProject) {
      // Pre-fill the form with project data if available
      setProjectName(existingProject.name);
      setProjectDescription(existingProject.description);
      setProjectLink(existingProject.live || "");
      setGithubLink(existingProject.github);
      setCategory(existingProject.category || []);
      setLanguage(existingProject.languages || []);
      setFeature(existingProject.features || []);
      setProjectStatus(existingProject.status || false);
    }
  }, [existingProject]);

  // Touched states
  const [touchedProjectName, setTouchedProjectName] = useState(false);
  const [touchedProjectImage, setTouchedProjectImage] = useState(false);
  const [touchedProjectDescription, setTouchedProjectDescription] = useState(false);
  const [touchedProjectCategory, setTouchedProjectCategory] = useState(false);
  const [touchedProjectLanguage, setTouchedProjectLanguage] = useState(false);
  const [touchedProjectFeature, setTouchedProjectFeature] = useState(false);
  const [touchedGithub, setTouchedGithub] = useState(false);

  // Constants
  const maxCharacters = 70;
  const maxDetailCharacters = 2000;

  // Toggle states
  const [isProjectImageOpen, setIsProjectImageOpen] = useState(true); // State for "Upload Project"
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false); // State for "Project Information"
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false); // State for "Project Details"
  const [isProjectLanFeOpen, setIsProjectLanFeOpen] = useState(false); // State for "Languages & Features"
  const [isProjectManagementOpen, setIsProjectManagementOpen] = useState(false); // State for "Project Management"

  // Toggle functions
  const toggleProjectImage = () => {
    setIsProjectImageOpen(!isProjectImageOpen);
    setIsProjectInfoOpen(false);
    setIsProjectDetailsOpen(false);
    setIsProjectLanFeOpen(false);
    setIsProjectManagementOpen(false);
  };

  const toggleProjectInfo = () => {
    setIsProjectInfoOpen(true);
    setIsProjectImageOpen(false);
    setIsProjectDetailsOpen(false);
    setIsProjectLanFeOpen(false);
    setIsProjectManagementOpen(false);
  };

  const toggleProjectDetails = () => {
    setIsProjectDetailsOpen(true);
    setIsProjectImageOpen(false);
    setIsProjectInfoOpen(false);
    setIsProjectLanFeOpen(false);
    setIsProjectManagementOpen(false);
  };

  const toggleProjectLanFe = () => {
    setIsProjectLanFeOpen(true);
    setIsProjectImageOpen(false);
    setIsProjectInfoOpen(false);
    setIsProjectDetailsOpen(false);
    setIsProjectManagementOpen(false);
  };

  const toggleProjectManagement = () => {
    setIsProjectManagementOpen(true);
    setIsProjectImageOpen(false);
    setIsProjectInfoOpen(false);
    setIsProjectDetailsOpen(false);
    setIsProjectLanFeOpen(false);
  };

  // Data for TomSelect

  const [categories, setCategories] = useState([
    { label: '', value: '' },
    { value: "MERN Stack", label: "MERN Stack" },
    { value: "MEAN Stack", label: "MEAN Stack" },
    { value: "MEVN Stack", label: "MEVN Stack" },
    { value: "LAMP Stack", label: "LAMP Stack" },
    { value: "Laravel", label: "Laravel" },
    { value: "Django", label: "Django" },
    { value: "Flask", label: "Flask" },
    { value: "Spring Boot", label: "Spring Boot" },
    { value: "ASP.NET", label: "ASP.NET" },
    { value: "Ruby on Rails", label: "Ruby on Rails" },
    { value: "web-development", label: "Web Development" },
    { value: "data-science", label: "Data Science" },
    { value: "mobile-apps", label: "Mobile Apps" },
    { value: "desktop-apps", label: "Desktop Apps" },
    { value: "machine-learning", label: "Machine Learning" },
    { value: "artificial-intelligence", label: "Artificial Intelligence" },
    { value: "blockchain", label: "Blockchain" },
    { value: "cloud-computing", label: "Cloud Computing" },
    { value: "devops", label: "DevOps" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "iot", label: "Internet of Things" },
    { value: "robotics", label: "Robotics" },
    { value: "game-development", label: "Game Development" },
    { value: "other", label: "Other" },
  ]);

  const [languages, setLanguages] = useState([
    { label: '', value: '' },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "c#", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "c++", label: "C++" },
    { value: "swift", label: "Swift" },
    { value: "typescript", label: "TypeScript" },
    { value: "go", label: "Go" },
    { value: "kotlin", label: "Kotlin" },
    { value: "rust", label: "Rust" },
    { value: "scala", label: "Scala" },
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue" },
    { value: "ember", label: "Ember" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "spring", label: "Spring" },
    { value: "express", label: "Express" },
    { value: "laravel", label: "Laravel" },
    { value: "rails", label: "Rails" },
    { value: "node", label: "Node" },
    { value: "react-native", label: "React Native" },
    { value: "flutter", label: "Flutter" },
  ]);

  const [features, setFeatures] = useState([
    { label: '', value: '' },
    { value: "login", label: "Login" },
    { value: "image-upload", label: "Image Upload" },
    { value: "notifications", label: "Notifications" },
    { value: "search", label: "Search" },
    { value: "authentication", label: "Authentication" },
    { value: "file-sharing", label: "File Sharing" },
    { value: "chat", label: "Chat" },
    { value: "payment-integration", label: "Payment Integration" },
    { value: "maps", label: "Maps" },
    { value: "social-media-integration", label: "Social Media Integration" },
    { value: "video-streaming", label: "Video Streaming" },
    { value: "audio-streaming", label: "Audio Streaming" },
    { value: "e-commerce", label: "E-Commerce" },
    { value: "blog", label: "Blog" },
    { value: "forum", label: "Forum" },
    { value: "calendar", label: "Calendar" },
    { value: "todo-list", label: "Todo List" },
    { value: "weather", label: "Weather" },
    { value: "news", label: "News" },
    { value: "portfolio", label: "Portfolio" },
    { value: "dashboard", label: "Dashboard" },
    { value: "api-integration", label: "API Integration" },
    { value: "web-scraper", label: "Web Scraper" },
    { value: "data-visualization", label: "Data Visualization" },
    { value: "machine-learning", label: "Machine Learning" },
    { value: "artificial-intelligence", label: "Artificial Intelligence" },
    { value: "blockchain", label: "Blockchain" },
    { value: "virtual-reality", label: "Virtual Reality" },
    { value: "augmented-reality", label: "Augmented Reality" },
    { value: "internet-of-things", label: "Internet of Things" },
    { value: "cloud-computing", label: "Cloud Computing" },
    { value: "serverless", label: "Serverless" },
    { value: "microservices", label: "Microservices" },
  ]);
  // Handlers
  const handleProjectNameChange = (e) => setProjectName(e.target.value);

  const handleProjectLinkChange = (e) => {setProjectLink(e.target.value); validateURL(e.target.value);}

  const handleGithubChange = (e) => setGithubLink(e.target.value);

  const handleProjectDescriptionChange = (e) => setProjectDescription(e.target.value);

  // Image handling
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setImageName(file.name);
      setIsProjectImageValid(true);

      await uploadImage(file);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
      setIsProjectImageValid(true);
      await uploadImage(file);
    }
  };

  const handleRemoveImage = async () => {    
    if (publicId || publicIdEdit) {
      await deleteImage(publicId || publicIdEdit);
      setImagePreview(null);
      setImageName("");
      setTouchedProjectImage(true);
      setIsProjectImageValid(false); 
    }
  };

  // Category selection
  const handleCategoryChange = (value) => {
    if (existingProject?.category) {
      setCategory(existingProject.category);
    }
    setCategory(value);
    setTouchedProjectCategory(true);
  };

  // Handle new category creation
  const handleCreateCategory = (inputValue) => {
    const newCategory = { label: inputValue, value: inputValue };
    setCategories([...categories, newCategory]);
  };

  // Language selection
  const handleLanguageChange = (value) => {
    setLanguage(value);
    setTouchedProjectLanguage(true);
  };

  // Handle language creation
  const handleCreateLanguage = (inputValue) => {
    const newLanguage = { label: inputValue, value: inputValue };
    setLanguages([...languages, newLanguage]);
  };

  // Feature selection
  const handleFeatureChange = (value) => {
    setFeature(value);
    setTouchedProjectFeature(true);
  };
  // Handle feature creation
  const handleCreateFeature = (inputValue) => {
    const newFeature = { label: inputValue, value: inputValue };
    setFeatures([...features, newFeature]);
  };

  

  // Blur handlers
  const handleProjectNameBlur = () => setTouchedProjectName(true);

  const handleProjectDescriptionBlur = () => setTouchedProjectDescription(true);

  const handleGithubBlur = () => setTouchedGithub(true);

  const handleCategoryBlur = () => {
    setTouchedProjectCategory(true);
  };

  const handleLanguageBlur = () => {
    setTouchedProjectLanguage(true);
  };

  const handleFeatureBlur = () => {
    setTouchedProjectFeature(true);
  };

 

  const validateURL = (url) => {
    const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + "([\\w-]+\\.)+[\\w-]{2,}" + "(:\\d+)?(\\/.*)?$",
        "i"
    );
    
    const isValid = urlPattern.test(url);
    
    // Set the state based on the validation result
    if (projectStatus) {
        setIsProjectLinkValid(isValid);
      
    }
    
    return isValid;
};


  const validateGithubURL = (url) => {
    const githubRepoPattern = new RegExp(
      "^https:\\/\\/github\\.com\\/[\\w-]+\\/[\\w-]+$",
      "i"
    );
    return githubRepoPattern.test(url);
  };


const handleAddOrUpdateProject = async (e) => {
  e.preventDefault();

  const isValid = isProjectNameValid() && isProjectImageValid && isProjectDescriptionValid() && isProjectCategoryValid() && isProjectLanguageValid() && isProjectFeatureValid() && isGithubValid() && isProjectLinkValid;

  if (!isValid) {
    // Set touched states to trigger error messages
    setTouchedProjectName(true);
    setTouchedProjectImage(true);
    setTouchedProjectDescription(true);
    setTouchedProjectCategory(true);
    setTouchedProjectLanguage(true);
    setTouchedProjectFeature(true);
    setTouchedGithub(true);

    if (!imagePreview) {
      setIsProjectImageValid(false);
  }

    // Ensure all sections are open to display the errors
    setIsProjectImageOpen(true);
    setIsProjectInfoOpen(true);
    setIsProjectDetailsOpen(true);
    setIsProjectLanFeOpen(true);
    setIsProjectManagementOpen(true);
  } else {
    const projectData = {
      image: imagePreview,
      name: projectName,
      description: projectDescription,
      category,
      languages: language,
      features: feature,
      status: projectStatus,
      live: projectLink,
      github: githubLink,
    };

    try {
      if (existingProject) {
        // Update project if editing
        await editProject(existingProject._id, projectData);
      } else {
        // Add new project
        const result = await addProject(projectData);
        if (result) {
          window.location.reload(); // Refresh page on success
        }
      }
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  }
};

useEffect(() => {
  if (data) {
    if (imagePreview) {
      setImagePreview(null); // Clear the preview when new image is uploaded
      setImagePreview(data)
      existingProject.image = null;
    }
    setImagePreview(data); // Set the preview when data is available
  }
}, [data]);

useEffect(() => {
  const projectUpdated = sessionStorage.getItem('projectUpdated');
  if (projectUpdated) {
    toast.success("Project updated successfully");
    sessionStorage.removeItem('projectUpdated'); // Clean up flag
  }
}, []);

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Add Project</h2>
      </div>
      <div className="grid grid-cols-11 gap-x-6 mt-5 pb-20">
        <div className="intro-y col-span-11 2xl:col-span-9">
          {/* BEGIN: Upload Project */}
          <div className="intro-y box p-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div
                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5"
                onClick={toggleProjectImage}
              >
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Upload
                Project
              </div>

              {/* Conditionally render the upload section based on isOpen */}
              {isProjectImageOpen && (
                <div className="mt-5">
                  <div className="flex items-center text-slate-500">
                    <span>
                      <Lucide
                        icon="Lightbulb"
                        className="w-5 h-5 text-warning"
                      />
                    </span>
                    <div className="ml-2">
                      <span className="mr-1">
                        When uploading images of your project, please follow
                        these guidelines to ensure a smooth and high-quality
                        experience.
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
                          <div className="font-medium">Project Image</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          <div>
                            The image format is .jpg .jpeg .png and a minimum
                            size of 300 x 300 pixels (For optimal images use a
                            minimum size of 700 x 700 pixels).
                          </div>
                          <div className="mt-2">
                            Select project image or drag and drop image here.
                            Add attractive images to make the project more
                            attractive to viewers.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`form-control w-full mt-3 xl:mt-0 flex-1 border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4 ${!isProjectImageValid && touchedProjectImage
                        ? "border-danger"
                        : ""
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
                            {data && existingProject?.image || !loading && (
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
                            <Lucide
                              icon="Image"
                              className="w-16 h-16 mx-auto"
                            />
                            <span className="text-sm text-gray-500 mt-2">
                              No image uploaded
                            </span>
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
                        <span className="text-primary mr-1">Upload a file</span>
                        or drag and drop
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
                        <div className="mt-2 text-center text-sm text-gray-500">
                          {imageName}
                        </div>
                      )}
                      {/* Error message positioned at the bottom-left corner */}
                      {!isProjectImageValid && touchedProjectImage && (
                        <div className="text-danger mt-2 ml-4">
                          Project Image is required.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* END: Upload Project */}
          {/* BEGIN: Project Information */}
          <div className="intro-y box p-5 mt-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div
                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 cursor-pointer"
                onClick={toggleProjectInfo}
              >
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Project
                Information
              </div>

              {/* Conditionally render the project information section */}
              {isProjectInfoOpen && (
                <div className="mt-5">
                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Project Name</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          Consider the target audience when naming your project
                          to ensure the title resonates and communicates the
                          intended theme effectively.
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <input
                        id="project-name"
                        type="text"
                        className={`form-control ${!isProjectNameValid() && touchedProjectName
                          ? "border-danger"
                          : ""
                          }`}
                        placeholder="Project Name"
                        value={projectName}
                        onChange={handleProjectNameChange}
                        onBlur={handleProjectNameBlur}
                        maxLength={maxCharacters}
                      />
                      {!isProjectNameValid() && touchedProjectName && (
                        <div className="text-danger mt-2">
                          Project name is required.
                        </div>
                      )}
                      <div className="form-help text-right">
                        Maximum character {projectName.length}/{maxCharacters}
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
                          You can add a category or choose from the existing
                          category list.
                        </div>
                      </div>
                    </div>

                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <div onBlur={handleCategoryBlur}>
                        <TomSelect
                          id="category-select"
                          value={category}
                          onChange={handleCategoryChange}
                          create={true} // Allow creating new categories
                          onCreate={handleCreateCategory}
                          placeholder="Select or add a category"
                          searchField="label"
                          options={categories}
                          className={`form-control w-full ${!isProjectCategoryValid() && touchedProjectCategory
                            ? "border-danger"
                            : ""
                            }`}
                        >
                          {/* Rendering options from the categories list */}
                          {categories.map((categoryOption) => (
                            <option
                              key={categoryOption.value}
                              value={categoryOption.value}
                            >
                              {categoryOption.label}
                            </option>
                          ))}
                        </TomSelect>
                      </div>

                      {/* Error message for validation */}
                      {!isProjectCategoryValid() && touchedProjectCategory && (
                        <div className="text-danger mt-2">
                          Project category is required.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* END: Project Information */}
          {/* BEGIN: Project Detail */}
          <div className="intro-y box p-5 mt-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div
                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5"
                onClick={toggleProjectDetails}
              >
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Project
                Details
              </div>
              {isProjectDetailsOpen && (
                <div className="mt-5">
                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Project Description</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          <div>
                            Make sure the project description provides a
                            detailed explanation of your project so that it is
                            easy to understand and find your project.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <label className="form-control">
                        <textarea
                          className={`form-control textarea textarea-bordered h-52 w-full rounded-md ${!isProjectDescriptionValid() && touchedProjectDescription
                            ? "border-danger"
                            : ""
                            }`}
                          placeholder="Project Description"
                          value={projectDescription}
                          onChange={handleProjectDescriptionChange}
                          onBlur={handleProjectDescriptionBlur}
                          maxLength={maxCharacters}
                        ></textarea>
                        {!isProjectDescriptionValid() && touchedProjectDescription && (
                          <div className="text-danger mt-2">
                            Project Description is required.
                          </div>
                        )}
                        <div className="form-help text-right">
                          Maximum character {projectDescription.length}/
                          {maxDetailCharacters}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* END: Project Details */}

          {/* BEGIN: Project Language & Features */}
          <div className="intro-y box p-5 mt-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div
                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5"
                onClick={toggleProjectLanFe}
              >
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Project
                Language & Features
              </div>
              {isProjectLanFeOpen && (
                <div className="mt-5">
                  {/* Project Languages Section */}
                  <div className="form-inline items-start flex-col xl:flex-row mt-2 pt-2 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Project Languages</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          Add languages such as React, Node, or more. Choose a
                          minimum of 2 language types.
                        </div>
                      </div>
                    </div>

                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <div className="relative pl-5 pr-5 py-10 bg-slate-50 dark:bg-transparent dark:border rounded-md z-30">
                        <div>
                          <div className="form-inline mt-5 first:mt-0">
                            <div className="flex items-center flex-1">
                              <div className="input-group flex-1" onBlur={handleLanguageBlur}>
                                <TomSelect
                                  id="project-languages"
                                  value={language} // The selected languages
                                  onChange={handleLanguageChange} // Handle selection change
                                  create={true} // Allow creating new languages
                                  onCreate={handleCreateLanguage} // Handle custom language creation
                                  searchField="label"
                                  placeholder="Select Languages used"
                                  options={languages}
                                  className={`form-control w-full z-30 ${!isProjectLanguageValid() &&
                                    touchedProjectLanguage
                                    ? "border-danger"
                                    : ""
                                    }`}
                                  multiple
                                >
                                  {languages.map((language) => (
                                    <option
                                      key={language.value}
                                      value={language.value}
                                    >
                                      {language.label}
                                    </option>
                                  ))}
                                </TomSelect>
                              </div>
                              <div className="w-20 flex text-slate-500 mt-3 xl:mt-0">
                                <Lucide
                                  icon="Trash2"
                                  onClick={() => setLanguage([])}
                                  className="w-4 h-4 ml-3 xl:ml-5"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Error message if the input is invalid */}
                      {!isProjectLanguageValid() && touchedProjectLanguage && (
                        <div className="text-danger mt-2">
                          Please select at least one language.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Features Section */}
                  <div className="form-inline items-start flex-col xl:flex-row mt-2 pt-2 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Project Features</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          Add features such as login, image upload, or more.
                          Choose a minimum of 1 feature type.
                        </div>
                      </div>
                    </div>

                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <div className="relative pl-5 pr-5 py-10 bg-slate-50 dark:bg-transparent dark:border rounded-md z-20">
                        <div>
                          <div className="form-inline mt-5 first:mt-0">
                            <div className="flex items-center flex-1">
                              <div className="input-group flex-1" onBlur={handleFeatureBlur}>
                                <TomSelect
                                  id="project-features"
                                  value={feature} // The selected features
                                  onChange={handleFeatureChange} // Handle selection change
                                  create={true} // Allow creating new features
                                  onCreate={handleCreateFeature} // Handle custom feature creation
                                  placeholder="Select Features"
                                  options={features}
                                  className={`form-control w-full z-20 ${!isProjectFeatureValid() &&
                                    touchedProjectFeature
                                    ? "border-danger"
                                    : ""
                                    }`}
                                  multiple
                                >
                                  {features.map((feature) => (
                                    <option
                                      key={feature.value}
                                      value={feature.value}
                                    >
                                      {feature.label}
                                    </option>
                                  ))}
                                </TomSelect>
                              </div>

                              <div className="w-20 flex text-slate-500 mt-3 xl:mt-0">
                                <Lucide
                                  icon="Trash2"
                                  onClick={() => setFeature([])}
                                  className="w-4 h-4 ml-3 xl:ml-5"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Error message if the input is invalid */}
                      {!isProjectFeatureValid() && touchedProjectFeature && (
                        <div className="text-danger mt-2">
                          Please select at least one feature.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* END: Project Language & Features */}
          {/* BEGIN: Project Management */}
          <div className="intro-y box p-5 mt-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div
                className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5"
                onClick={toggleProjectManagement}
              >
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Project
                Management
              </div>
              {isProjectManagementOpen && (
                <div className="mt-5">
                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Project Status</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                          If the status is 'Active,' your project is live and
                          visible to visitors.
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <div className="form-check form-switch">
                        <input
                          id="product-status-active"
                          className="form-check-input"
                          type="checkbox"
                          checked={projectStatus}
                          onChange={(e) => setProjectStatus(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="product-status-active"
                        >
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Project Link</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <input
                        id="project-link"
                        type="text"
                        className={`form-control ${!isProjectLinkValid ? "border-danger" : ""
                          }`} // Add a red border if invalid
                        placeholder="Input Live Project Link"
                        value={projectLink}
                        onChange={handleProjectLinkChange}
                      />
                      {!isProjectLinkValid && (
                        <div className="text-danger mt-2">
                          Please enter a valid project link (e.g.,
                          https://example.com)
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                    <div className="form-label xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">GitHub Link</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full mt-3 xl:mt-0 flex-1">
                      <input
                        id="github-link"
                        type="text"
                        className={`form-control ${!isGithubValid() && touchedGithub ? "border-danger" : ""
                          }`} // Add a red border if invalid
                        placeholder="Input GitHub Repository Link"
                        value={githubLink}
                        onChange={handleGithubChange}
                        onBlur={handleGithubBlur} // Validate on blur (when focus is lost)
                      />

                      {/* Only show the error message if the input is invalid and has been touched */}
                      {!isGithubValid() && touchedGithub && (
                        <div className="text-danger mt-2">
                          Please enter a valid GitHub repository link (e.g.,
                          https://github.com/username/repo-name)
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* END: Project Management */}

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
              onClick={handleAddOrUpdateProject}
            >{loadingAdd ? (  
              <div className="relative h-6 w-6 flex justify-center items-center">
                <Lucide className="animate-spin w-4 h-4 text-primary" icon="Loader" />
              </div>
            ) : (
              existingProject ? "Update Project" : "Add Project"
            )
            }
            </button>
          </div>
        </div>
        <div className="intro-y col-span-2 hidden 2xl:block">
          <div className="pt-10 sticky top-0">
            <ul className="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:dark:bg-darkmode-600 before:h-full before:absolute before:left-0 before:z-[-1]">
              <li
                className={`mb-4 border-l-2 pl-5 ${isProjectImageOpen
                  ? "border-primary dark:border-primary text-primary font-medium"
                  : "border-transparent dark:border-transparent"
                  }`}
                onClick={toggleProjectImage}
              >
                <a href="#">Upload Project</a>
              </li>
              <li
                className={`mb-4 border-l-2 pl-5 ${isProjectInfoOpen
                  ? "border-primary dark:border-primary text-primary font-medium"
                  : "border-transparent dark:border-transparent"
                  }`}
                onClick={toggleProjectInfo}
              >
                <a href="#">Project Information</a>
              </li>
              <li
                className={`mb-4 border-l-2 pl-5 ${isProjectDetailsOpen
                  ? "border-primary dark:border-primary text-primary font-medium"
                  : "border-transparent dark:border-transparent"
                  }`}
                onClick={toggleProjectDetails}
              >
                <a href="#">Project Details</a>
              </li>
              <li
                className={`mb-4 border-l-2 pl-5 ${isProjectLanFeOpen
                  ? "border-primary dark:border-primary text-primary font-medium"
                  : "border-transparent dark:border-transparent"
                  }`}
                onClick={toggleProjectLanFe}
              >
                <a href="#">Project Language & Features</a>
              </li>
              <li
                className={`mb-4 border-l-2 pl-5 ${isProjectManagementOpen
                  ? "border-primary dark:border-primary text-primary font-medium"
                  : "border-transparent dark:border-transparent"
                  }`}
                onClick={toggleProjectManagement}
              >
                <a href="#">Project Management</a>
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
                  The image format is .jpg .jpeg .png and a minimum size of 300
                  x 300 pixels (For optimal images use a minimum size of 700 x
                  700 pixels).
                </div>
                <div className="mt-2">
                  Consider the target audience when naming your project to
                  ensure the title resonates and communicates the intended theme
                  effectively.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;