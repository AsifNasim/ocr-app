// backend/src/models/Image.js

import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Image model
const Image = mongoose.model('Image', imageSchema);

export default Image;