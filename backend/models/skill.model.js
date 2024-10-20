import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    section: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;