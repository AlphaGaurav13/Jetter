import express from 'express';
import { authMiddleware } from '../middleware.js';
import Transaction from '../models/transactionModel.js';

const router = express.Router();

// Get all transactions for a user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 });
        res.json({ transactions });
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions" });
    }
});

// Add a new transaction
router.post("/", authMiddleware, async (req, res) => {
    const { amount, type, category, description, date } = req.body;

    if (!amount || !type || !category) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const transaction = await Transaction.create({
            userId: req.userId,
            amount,
            type,
            category,
            description,
            date: date || new Date()
        });

        res.status(201).json({ message: "Transaction added successfully", transaction });
    } catch (error) {
        res.status(500).json({ message: "Error adding transaction", error: error.message });
    }
});

// Delete a transaction
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting transaction" });
    }
});

export default router;
