import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        length: 50
    },
    email: {
        type: String,
        length: 50,
    },
    phone: {
        type: String,
        required: true,
        length: 50,
    },
    message: {
        type: String,
        length: 500,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('Contact', contactSchema);  // Exporting the model