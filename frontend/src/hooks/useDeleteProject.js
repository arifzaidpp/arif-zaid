import { useState } from 'react';
import toast from "react-hot-toast";

const useDeleteProject = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState(null);

    const deleteProject = async (id) => {
        setLoadingDelete(true);
        setErrorDelete(null);

        try {
            const response = await fetch(`/api/admin/delete-project/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete project');
            }

            const data = await response.json();
            // Reload the page after successful deletion
            window.location.reload();
            
            toast.success("Project deleted successfully");
            return data; // return response data if necessary
        } catch (err) {
            setErrorDelete(err.message);
            toast.error("Failed to delete project");
        } finally {
            setLoadingDelete(false);
        }
    };

    return { deleteProject, loadingDelete, errorDelete };
};

export default useDeleteProject;
