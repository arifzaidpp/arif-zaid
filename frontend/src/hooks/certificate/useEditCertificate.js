import { useState } from 'react';
import toast from "react-hot-toast";

const useEditCertificate = () => {
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [errorEdit, setErrorEdit] = useState(null);

    const editCertificate = async (id, certificateData) => {
        setLoadingEdit(true);
        setErrorEdit(null);

        try {
            const response = await fetch(`/api/admin/edit-certificate/${id}`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(certificateData),
            });

            if (!response.ok) {
                throw new Error('Failed to edit certificate');
            }

            const data = await response.json();

            // Save flag to sessionStorage before reload
            sessionStorage.setItem('certificateUpdated', 'true');

            // Reload the page
            window.location.replace('/admin/certificates');

            return data;
        } catch (err) {
            setErrorEdit(err.message);
            toast.error("Failed to update certificate");
        } finally {
            setLoadingEdit(false);
        }
    };

    return { editCertificate, loadingEdit, errorEdit };
};

export default useEditCertificate;
