import Certificate from '../models/certificate.model.js'; // Import your certificate model

// Add a new certificate
export const addCertificate = async (req, res) => {
    const { image, name, category, date } = req.body;
    
    // Check if required fields are provided
    if (!image || !name || !category || !date) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    try {
        const certificate = new Certificate({
            image,
            name,
            category,
            date
        });

        await certificate.save();
        return res.status(201).json({ message: 'Certificate created successfully', certificate });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating certificate' });
    }
};

// Get all certificates
export const getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find(); // Retrieve all certificates from the database
        return res.status(200).json({ certificates }); // Return the list of certificates
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching certificates' });
    }
};

// Edit an existing certificate
export const editCertificate = async (req, res) => {
    const { id } = req.params;
    const { image, name, category, date } = req.body;

    // Check if required fields are provided
    if (!image || !name || !category || !date) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    try {
        const updatedCertificate = await Certificate.findByIdAndUpdate(
            id,
            {
                image,
                name,
                category,
                date
            },
            { new: true } // Return the updated document
        );

        if (!updatedCertificate) {
            return res.status(404).json({ error: 'Certificate not found' });
        }

        return res.status(200).json({ message: 'Certificate updated successfully', updatedCertificate });
    } catch (error) {
        return res.status(500).json({ error: 'Error updating certificate' });
    }
};

// Delete a certificate
export const deleteCertificate = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCertificate = await Certificate.findByIdAndDelete(id);

        if (!deletedCertificate) {
            return res.status(404).json({ error: 'Certificate not found' });
        }

        return res.status(200).json({ message: 'Certificate deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting certificate' });
    }
};
