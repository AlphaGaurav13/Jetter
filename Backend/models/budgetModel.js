import mongoose from 'mongoose';

const { Schema } = mongoose;

const budgetSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    limit: {
        type: Number,
        required: true,
        min: 0
    },
    month: {
        type: String, // format YYYY-MM
        required: true
    }
}, { timestamps: true });

// Ensure one budget per category per month for a user
budgetSchema.index({ userId: 1, category: 1, month: 1 }, { unique: true });

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
