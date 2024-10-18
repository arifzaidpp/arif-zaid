// utils/uploadImage.js (ES module)
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

const upload = async (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'uploads',
            },
            (error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

export default upload;
