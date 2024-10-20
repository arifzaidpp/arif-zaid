// hooks/useGetAllProjects.js
import { useState, useEffect } from 'react';

const useGetAllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/admin/projects'); // Adjust URL as necessary

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const data = await response.json();
            setProjects(data.projects); // Assuming the projects are in data.projects
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects(); // Fetch projects on component mount
    }, []);

    return { projects, loading, error };
};

export default useGetAllProjects;
