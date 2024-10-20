import { useState } from 'react';
import toast from "react-hot-toast";

const useAddCertificate = () => {
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [errorAdd, setErrorAdd] = useState(null);

    const addCertificate = async (certificateData) => {
        
        setLoadingAdd(true);
        setErrorAdd(null);

        try {
            const response = await fetch('/api/admin/add-certificate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(certificateData),
            });

            if (!response.ok) {
                throw new Error('Failed to add certificate');
            }

            const data = await response.json();
            return data; // return response data if necessary
        } catch (err) {
            setErrorAdd(err.message);
            toast.error("Failed to add certificate");
        } finally {
            setLoadingAdd(false);
        }
    };

    return { addCertificate, loadingAdd, errorAdd };
};

export default useAddCertificate;
