import Education from '../models/education.model.js'; // Import your education model

// Add a new education
export const addEducation = async (req, res) => {
    const { education, institution, year, status } = req.body;
    
    // Check if required fields are provided
    if (!education || !institution || !year || !status) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    try {
        const newEducation = new Education({
            education,
            institution,
            year,
            status
        });

        await newEducation.save();
        return res.status(201).json({ message: 'Education created successfully', newEducation });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating education' });
    }
};

// Get all educations
export const getAllEducations = async (req, res) => {
    try {
        const educations = await Education.find(); // Retrieve all educations from the database
        return res.status(200).json({ educations }); // Return the list of educations
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching educations' });
    }
};

// Edit an existing education
export const editEducation = async (req, res) => {
    console.log(req.body);
    
    const { id } = req.params;
    const { education, institution, year, status } = req.body;

    // Check if required fields are provided
    if (!education || !institution || !year ) {
        console.log("success ");
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    try {
        const updatedEducation = await Education.findByIdAndUpdate(
            id,
            {
                education,
                institution,
                year,
                status
            },
            { new: true } // Return the updated document
        );

        if (!updatedEducation) {
            return res.status(404).json({ error: 'Education not found' });
        }

        
        return res.status(200).json({ message: 'Education updated successfully', updatedEducation });
    } catch (error) {
        return res.status(500).json({ error: 'Error updating education' });
    }
};

// Delete an education
export const deleteEducation = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEducation = await Education.findByIdAndDelete(id);

        if (!deletedEducation) {
            return res.status(404).json({ error: 'Education not found' });
        }

        return res.status(200).json({ message: 'Education deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting education' });
    }
};
