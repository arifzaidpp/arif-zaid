import { useState } from 'react';
import toast from "react-hot-toast";

const useEditSkill = () => {
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [errorEdit, setErrorEdit] = useState(null);

    const editSkill = async (id, skillData) => {
        setLoadingEdit(true);
        setErrorEdit(null);

        try {
            const response = await fetch(`/api/admin/edit-skill/${id}`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(skillData),
            });

            if (!response.ok) {
                throw new Error('Failed to edit skill');
            }

            const data = await response.json();

            // Save flag to sessionStorage before reload
            sessionStorage.setItem('skillUpdated', 'true');

            // Reload the page
            window.location.replace('/admin/skills');

            return data;
        } catch (err) {
            setErrorEdit(err.message);
            toast.error("Failed to update skill");
        } finally {
            setLoadingEdit(false);
        }
    };

    return { editSkill, loadingEdit, errorEdit };
};

export default useEditSkill;
