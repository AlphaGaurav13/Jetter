import express from 'express';
import { authMiddleware } from '../middleware.js';
import Transaction from '../models/transactionModel.js';
import Account from '../models/accountModel.js';

const router = express.Router();

// Get dashboard summary
router.get("/summary", authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.userId });
        
        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((acc, curr) => acc + curr.amount, 0);

        const totalExpense = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);

        const currentBalance = totalIncome - totalExpense;

        // Group expenses by category
        const expensesByCategory = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, curr) => {
                acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
                return acc;
            }, {});

        res.json({
            totalIncome,
            totalExpense,
            currentBalance,
            expensesByCategory
        });

    } catch (error) {
        res.status(500).json({ message: "Error generating analytics" });
    }
});

export default router;
