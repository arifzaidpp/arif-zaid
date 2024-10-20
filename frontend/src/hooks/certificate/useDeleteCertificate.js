import { useState } from 'react';
import toast from "react-hot-toast";

const useDeleteCertificate = () => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState(null);

    const deleteCertificate = async (id) => {
        setLoadingDelete(true);
        setErrorDelete(null);

        try {
            const response = await fetch(`/api/admin/delete-certificate/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete certificate');
            }

            const data = await response.json();
            // Reload the page after successful deletion
            window.location.reload();
            
            toast.success("Certificate deleted successfully");
            return data; // return response data if necessary
        } catch (err) {
            setErrorDelete(err.message);
            toast.error("Failed to delete certificate");
        } finally {
            setLoadingDelete(false);
        }
    };

    return { deleteCertificate, loadingDelete, errorDelete };
};

export default useDeleteCertificate;
