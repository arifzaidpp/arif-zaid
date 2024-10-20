import { useState } from 'react';
import toast from "react-hot-toast";

const useDeleteEducation = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState(null);

    const deleteEducation = async (id) => {
        setLoadingDelete(true);
        setErrorDelete(null);

        try {
            const response = await fetch(`/api/admin/delete-education/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete education');
            }

            const data = await response.json();
            // Reload the page after successful deletion
            window.location.reload();
            
            toast.success("Education deleted successfully");
            return data; // return response data if necessary
        } catch (err) {
            setErrorDelete(err.message);
            toast.error("Failed to delete education");
        } finally {
            setLoadingDelete(false);
        }
    };

    return { deleteEducation, loadingDelete, errorDelete };
};

export default useDeleteEducation;
