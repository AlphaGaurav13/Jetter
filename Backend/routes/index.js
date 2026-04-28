import express  from 'express';
import userRouter from "./user.js";
import accountRoutes from './accounts.js';
import transactionRoutes from './transactions.js';
import analyticsRoutes from './analytics.js';
import aiRoutes from './ai.js';

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRoutes);
router.use("/transactions", transactionRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/ai", aiRoutes);

export default router;