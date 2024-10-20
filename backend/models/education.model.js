import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    education: {
        type: String,
        required: true,
        trim: true
    },
    institution: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false,
    }
});

const Education = mongoose.model('Education', educationSchema);

export default Education;