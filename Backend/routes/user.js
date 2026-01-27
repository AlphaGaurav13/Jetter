import express from "express";
import { Z } from 'zod';
import jwt from 'jsonwebtoken';
const router = express.Router();
import User from '../models/User.js';


// zod schema 
const signupSchema = Z.object({
    email: Z.string().email(),
    password: Z.string().min(6)
});

router.post("/signup", async (req, res) => {
    try{
        const parsed = signupSchema.safeParse(req.body);
        if(!parsed.success) {
            return res.status(400).json({message: "Invalid inputs"});
        }

        const { email, password } = parsed.data;
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(409).json({ message: "User Already Exists" });
        }

        const user = await User.create({ email, password });

        const token  = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET
        );

        res.json({ token });

    }catch(err) {
        res.status(500).json({ message: "Server Error" });
    }
})


export default router;
