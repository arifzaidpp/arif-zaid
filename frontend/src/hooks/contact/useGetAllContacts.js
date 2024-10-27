import { useState, useEffect } from 'react';

const useGetAllContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Define the fetchContacts function for fetching data
    const fetchContacts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/admin/contacts'); // Adjust URL as necessary

            if (!response.ok) {
                throw new Error('Failed to fetch contacts');
            }

            const data = await response.json();
            setContacts(data.contacts); // Assuming contacts are in data.contacts
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch contacts on mount
    useEffect(() => {
        fetchContacts();
    }, []);

    // Return contacts, loading, error, and the refetch function
    return { contacts, loading, error, refetch: fetchContacts };
};

export default useGetAllContacts;
