
import express from "express";
import { getBalance, addMoney } from "../controllers/accountController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate, addMoneySchema } from "../middlewares/validate.js";

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/add-money", authMiddleware, validate(addMoneySchema), addMoney);

export default router;