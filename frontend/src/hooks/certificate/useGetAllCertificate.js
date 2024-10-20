// hooks/useGetAllCertificates.js
import { useState, useEffect } from 'react';

const useGetAllCertificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCertificates = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/admin/certificates'); // Adjust URL as necessary

            if (!response.ok) {
                throw new Error('Failed to fetch certificates');
            }

            const data = await response.json();
            setCertificates(data.certificates); // Assuming the certificates are in data.certificates
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates(); // Fetch certificates on component mount
    }, []);

    return { certificates, loading, error };
};

export default useGetAllCertificates;
