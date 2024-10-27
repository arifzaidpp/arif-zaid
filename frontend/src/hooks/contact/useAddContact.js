import { useState } from 'react';
import toast from "react-hot-toast";

const useAddContact = () => {
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [errorAdd, setErrorAdd] = useState(null);

    const addContact = async (contactData) => {
        
        setLoadingAdd(true);
        setErrorAdd(null);

        try {
            const response = await fetch('/api/user/add-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            if (!response.ok) {
                throw new Error('Failed to add contact');
            }

            const data = await response.json();
            toast.success("Message send successfully.")
            return data; // return response data if necessary
        } catch (err) {
            setErrorAdd(err.message);
            toast.error("Failed to add contact");
        } finally {
            setLoadingAdd(false);
        }
    };

    return { addContact, loadingAdd, errorAdd };
};

export default useAddContact;
