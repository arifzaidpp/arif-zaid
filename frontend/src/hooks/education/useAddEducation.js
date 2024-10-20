import { useState } from 'react';
import toast from "react-hot-toast";

const useAddEducation = () => {
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [errorAdd, setErrorAdd] = useState(null);

    const addEducation = async (educationData) => {
        
        setLoadingAdd(true);
        setErrorAdd(null);

        try {
            const response = await fetch('/api/admin/add-education', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(educationData),
            });

            if (!response.ok) {
                throw new Error('Failed to add education');
            }

            const data = await response.json();

            window.location.replace('/admin/educations');
            return data; // return response data if necessary
        } catch (err) {
            setErrorAdd(err.message);
            toast.error("Failed to add education");
        } finally {
            setLoadingAdd(false);
        }
    };

    return { addEducation, loadingAdd, errorAdd };
};

export default useAddEducation;
