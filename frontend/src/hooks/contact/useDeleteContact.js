import { useState } from 'react';
import toast from "react-hot-toast";

const useDeleteContact = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState(null);

    const deleteContact = async (id) => {
        setLoadingDelete(true);
        setErrorDelete(null);

        try {
            const response = await fetch(`/api/admin/delete-contact/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete contact');
            }

            const data = await response.json();
            
            toast.success("Contact deleted successfully");
            return data; // return response data if necessary
        } catch (err) {
            setErrorDelete(err.message);
            toast.error("Failed to delete contact");
        } finally {
            setLoadingDelete(false);
        }
    };

    return { deleteContact, loadingDelete, errorDelete };
};

export default useDeleteContact;
