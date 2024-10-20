import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
    },
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;