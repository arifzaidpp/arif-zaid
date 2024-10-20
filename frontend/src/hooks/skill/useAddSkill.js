import { useState } from 'react';
import toast from "react-hot-toast";

const useAddSkill = () => {
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [errorAdd, setErrorAdd] = useState(null);

    const addSkill = async (skillData) => {
        
        setLoadingAdd(true);
        setErrorAdd(null);

        try {
            const response = await fetch('/api/admin/add-skill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(skillData),
            });

            if (!response.ok) {
                throw new Error('Failed to add skill');
            }

            const data = await response.json();
            return data; // return response data if necessary
        } catch (err) {
            setErrorAdd(err.message);
            toast.error("Failed to add skill");
        } finally {
            setLoadingAdd(false);
        }
    };

    return { addSkill, loadingAdd, errorAdd };
};

export default useAddSkill;
