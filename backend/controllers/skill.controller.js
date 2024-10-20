import Skill from '../models/skill.model.js'; // Import your skill model

// Add a new skill
export const addSkill = async (req, res) => {
    const { image, name, section, category } = req.body;
    
    // Check if required fields are provided
    if (!image || !name || !section || !category) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    try {
        const skill = new Skill({
            image,
            name,
            section,
            category
        });

        await skill.save();
        return res.status(201).json({ message: 'Skill created successfully', skill });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating skill' });
    }
};

// Get all skills
export const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find(); // Retrieve all skills from the database
        return res.status(200).json({ skills }); // Return the list of skills
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching skills' });
    }
};

// Edit an existing skill
export const editSkill = async (req, res) => {
    const { id } = req.params;
    const { image, name, section, category } = req.body;

    // Check if required fields are provided
    if (!image || !name || !section || !category) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    try {
        const updatedSkill = await Skill.findByIdAndUpdate(
            id,
            {
                image,
                name,
                section,
                category
            },
            { new: true } // Return the updated document
        );

        if (!updatedSkill) {
            return res.status(404).json({ error: 'Skill not found' });
        }

        return res.status(200).json({ message: 'Skill updated successfully', updatedSkill });
    } catch (error) {
        return res.status(500).json({ error: 'Error updating skill' });
    }
};

// Delete a skill
export const deleteSkill = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSkill = await Skill.findByIdAndDelete(id);

        if (!deletedSkill) {
            return res.status(404).json({ error: 'Skill not found' });
        }

        return res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting skill' });
    }
};
