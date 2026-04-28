import mongoose from 'mongoose';

const { Schema } = mongoose;

const transactionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0.01
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        default: 'General'
    },
    description: {
        type: String,
        trim: true,
        maxlength: 255
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
