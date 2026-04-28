import express from 'express';
import { authMiddleware } from '../middleware.js';
import { GoogleGenAI } from '@google/genai';
import Transaction from '../models/transactionModel.js';

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/chat", authMiddleware, async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }

        // Fetch user's recent transactions to provide context to the AI
        const transactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 }).limit(50);
        
        const contextString = transactions.map(t => `${t.date.toISOString().split('T')[0]} - ${t.type.toUpperCase()}: $${t.amount} (${t.category}) - ${t.description || 'No description'}`).join('\n');

        const prompt = `
You are a highly intelligent and helpful financial AI assistant for the JETTER app.
The user is asking: "${message}"

Here are their recent transactions for context:
${contextString}

Provide a helpful, precise, and concise answer based on their spending history and general financial advice. Format your response nicely.
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        res.json({ reply: response.text });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ message: "Failed to process AI request" });
    }
});

export default router;
