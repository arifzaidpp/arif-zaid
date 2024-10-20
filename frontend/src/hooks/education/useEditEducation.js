import { useState } from 'react';
import toast from "react-hot-toast";

const useEditEducation = () => {
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [errorEdit, setErrorEdit] = useState(null);

    const editEducation = async (id, educationData) => {
        setLoadingEdit(true);
        setErrorEdit(null);
        

        try {
            const response = await fetch(`/api/admin/edit-education/${id}`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(educationData),
            });

            if (!response.ok) {
                throw new Error('Failed to edit education');
            }

            const data = await response.json();

            // Save flag to sessionStorage before reload
            sessionStorage.setItem('educationUpdated', 'true');

            // Reload the page
            window.location.replace('/admin/educations');

            return data;
        } catch (err) {
            setErrorEdit(err.message);
            toast.error("Failed to update education");
        } finally {
            setLoadingEdit(false);
        }
    };

    return { editEducation, loadingEdit, errorEdit };
};

export default useEditEducation;
