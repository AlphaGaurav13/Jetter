import express from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Account from "../models/accountModel.js";

const router = express.Router();

const signupSchema = z.object({
    username: z.string().min(3).max(9),
    password: z.string().min(8),
    firstName: z.string().max(9),
    lastName: z.string().max(9)
});

router.post("/signup", async (req, res) => {
    try {
        const parsed = signupSchema.safeParse(req.body);

        console.log("Incoming body:", req.body);
        console.log("Parsed result:", parsed);

        if (!parsed.success) {
            return res.status(400).json({ message: "Invalid inputs" });
        }

        const { username, password, firstName, lastName } = parsed.data;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ message: "User Already Exists" });
        }

        const user = await User.create({
            username,
            password,
            firstName,
            lastName
        });

        await Account.create({
            userId: user._id,
            balance: 1000   
        });

        console.log("User created in DB:", user);

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET
        );

        res.json({ token });

    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});


export default router;
