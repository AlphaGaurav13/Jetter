import express from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

router.post("/signup", async (req, res) => {
    try {
        const parsed = signupSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ message: "Invalid inputs" });
        }

        const { email, password } = parsed.data;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User Already Exists" });
        }

        const user = await User.create({ email, password });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
