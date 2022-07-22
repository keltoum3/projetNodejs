import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Message', messageSchema);
