import { useState } from 'react';
import toast from "react-hot-toast";

const useUpdateContact = () => {
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [errorUpdate, setErrorUpdate] = useState(null);

    const updateContact = async (id, contactData) => {
        setLoadingUpdate(true);
        setErrorUpdate(null);

        try {
            const response = await fetch(`/api/admin/update-contact/${id}`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            if (!response.ok) {
                throw new Error('Failed to update contact');
            }

            const data = await response.json();

            // Save flag to sessionStorage before reload
            sessionStorage.setItem('contactUpdated', 'true');

            return data;
        } catch (err) {
            setErrorUpdate(err.message);
            toast.error("Failed to update contact");
        } finally {
            setLoadingUpdate(false);
        }
    };

    return { updateContact, loadingUpdate, errorUpdate };
};

export default useUpdateContact;