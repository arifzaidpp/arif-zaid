import Project from '../models/project.model.js'; // Import your project model

// Add a new project
export const addProject = async (req, res) => {
    const { image, name, category, description, languages, features, status, live, github } = req.body;
    
    // Check if required fields are provided
    if (!image || !name || !category || !description || !languages || !features || !github) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    try {
        const project = new Project({
            image,
            name,
            category,
            description,
            languages,
            features,
            status,
            live,
            github
        });

        await project.save();
        return res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating project' });
    }
};

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find(); // Retrieve all projects from the database
        return res.status(200).json({ projects }); // Return the list of projects
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching projects' });
    }
};

// Edit an existing project
export const editProject = async (req, res) => {
    const { id } = req.params;
    const { image, name, category, description, languages, features, status, live, github } = req.body;
    

    // Check if required fields are provided
    if (!image || !name || !category || !languages || !features || !github) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                image,
                name,
                category,
                description,
                languages,
                features,
                status,
                live,
                github
            },
            { new: true } // Return the updated document
        );

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        
        return res.status(200).json({ message: 'Project updated successfully', updatedProject });
    } catch (error) {
        return res.status(500).json({ error: 'Error updating project' });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting project' });
    }
};
