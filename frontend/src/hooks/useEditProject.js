import { useState } from 'react';
import toast from "react-hot-toast";

const useEditProject = () => {
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [errorEdit, setErrorEdit] = useState(null);

    const editProject = async (id, projectData) => {
        setLoadingEdit(true);
        setErrorEdit(null);

        try {
            const response = await fetch(`/api/admin/edit-project/${id}`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error('Failed to edit project');
            }

            const data = await response.json();

            // Save flag to sessionStorage before reload
            sessionStorage.setItem('projectUpdated', 'true');

            // Reload the page
            window.location.replace('/admin/projects');

            return data;
        } catch (err) {
            setErrorEdit(err.message);
            toast.error("Failed to update project");
        } finally {
            setLoadingEdit(false);
        }
    };

    return { editProject, loadingEdit, errorEdit };
};

export default useEditProject;
