import { useState } from 'react';
import toast from "react-hot-toast";

const useDeleteSkill = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState(null);

    const deleteSkill = async (id) => {
        setLoadingDelete(true);
        setErrorDelete(null);

        try {
            const response = await fetch(`/api/admin/delete-skill/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete skill');
            }

            const data = await response.json();
            // Reload the page after successful deletion
            window.location.reload();
            
            toast.success("Skill deleted successfully");
            return data; // return response data if necessary
        } catch (err) {
            setErrorDelete(err.message);
            toast.error("Failed to delete skill");
        } finally {
            setLoadingDelete(false);
        }
    };

    return { deleteSkill, loadingDelete, errorDelete };
};

export default useDeleteSkill;
