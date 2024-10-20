import { set } from 'lodash';
import { useState } from 'react';

const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [publicId, setPublicId] = useState(null);

  const uploadImage = async (imageFile) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      

      setPublicId(result.public_id); // Assuming the public ID is returned in result.public_id
      setData(result.image); // Assuming the image URL is returned in result.image
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error, data, publicId };
};

export default useUploadImage;
