import upload from '../utils/uploadImage.js';
import deleteImg from '../utils/deleteImage.js';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const image = req.file;

    const result = await upload(image);

    const imageUrl = result.secure_url;
    const publicId = result.public_id;
    

    return res.status(201).json({ message:" Success ", image: imageUrl, public_id: publicId });
  } catch (error) {
    console.error("Error in uploadImage controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteImage = async (req, res) => {
    const { public_id } = req.body;

    try {
      if (!public_id) {
        return res.status(400).json({ message: 'No public ID provided' });
      }
  
      const result = await deleteImg(public_id);

      const message = result.success ? result.message : result.error.message;
      const status = result.success ? 200 : 400
      
  
      return res.status(status).json({ message: message });
    }
    catch (error) {
      console.error("Error in deleteImage controller", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  
    
  };