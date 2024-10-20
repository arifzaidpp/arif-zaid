import { useState } from 'react';
import toast from "react-hot-toast";

const useAddProject = () => {
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [errorAdd, setErrorAdd] = useState(null);

    const addProject = async (projectData) => {
        
        setLoadingAdd(true);
        setErrorAdd(null);

        try {
            const response = await fetch('/api/admin/add-project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error('Failed to add project');
            }

            const data = await response.json();
            window.location.replace('/admin/projects');
            return data; // return response data if necessary
        } catch (err) {
            setErrorAdd(err.message);
            toast.error("Failed to add project");
        } finally {
            setLoadingAdd(false);
        }
    };

    return { addProject, loadingAdd, errorAdd };
};

export default useAddProject;
