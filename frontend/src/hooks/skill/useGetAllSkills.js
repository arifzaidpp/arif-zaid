// hooks/useGetAllSkills.js
import { useState, useEffect } from 'react';

const useGetAllSkills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSkills = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/admin/skills'); // Adjust URL as necessary

            if (!response.ok) {
                throw new Error('Failed to fetch skills');
            }

            const data = await response.json();
            setSkills(data.skills); // Assuming the skills are in data.skills
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills(); // Fetch skills on component mount
    }, []);

    return { skills, loading, error };
};

export default useGetAllSkills;
