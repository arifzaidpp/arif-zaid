// hooks/useGetAllEducations.js
import { useState, useEffect } from 'react';

const useGetAllEducations = () => {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEducations = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/admin/educations'); // Adjust URL as necessary

            if (!response.ok) {
                throw new Error('Failed to fetch educations');
            }

            const data = await response.json();
            setEducations(data.educations); // Assuming the educations are in data.educations
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEducations(); // Fetch educations on component mount
    }, []);

    return { educations, loading, error };
};

export default useGetAllEducations;
