import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: true,
        trim: true
    },
    languages: {
        type: [String],
        required: true,
    },
    features : {
        type: [String],
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    live: {
        type: String,
    },
    github: {
        type: String,
        required: true,
    }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;