import mongoose from 'mongoose'
import User from "../models/userModel.js";
const { Schema } = mongoose;

const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);

export default Account;
