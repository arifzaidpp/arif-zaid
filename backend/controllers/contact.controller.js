import Contact from '../models/contact.model.js'; // Import your contact model

// Add a new contact
export const addContact = async (req, res) => {
    const { firstName, lastName, email, phone, subject, message } = req.body;
    
    // Check if required fields are provided
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
        return res.status(400).json({ error: 'All required fields must be filled' });
    }

    try {
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            phone,
            subject,
            message
        });

        await newContact.save();
        return res.status(201).json({ message: 'Contact created successfully', newContact });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating contact' });
    }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find(); // Retrieve all contacts from the database
        return res.status(200).json({ contacts }); // Return the list of contacts
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching contacts' });
    }
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { isStared } = req.body;

    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { isRead: true, isStared },
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        return res.status(200).json({ message: 'Contact updated successfully', updatedContact });
    } catch (error) {
        return res.status(500).json({ error: 'Error updating contact' });
    }
};

// Delete a contact
export const deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        return res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting contact' });
    }
};