import express  from 'express';
import userRouter from "./user.js";
import accountRoutes from './accounts.js'


const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRoutes);

export default router;