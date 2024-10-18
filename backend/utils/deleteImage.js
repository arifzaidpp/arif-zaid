import cloudinary from '../config/cloudinary.js';

const deleteImg = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id, { invalidate: true });
        if (result.result !== 'ok') {
            console.error("Error deleting image from Cloudinary", result);
            return { success: false, message: "Failed to delete image", result };
        }
        return { success: true, message: 'Image deleted successfully', result };
    } catch (error) {
        console.error("Error in deleteImage utility", error.message);
        return { success: false, message: "Internal Server Error", error: error.message };
    }
};

export default deleteImg;