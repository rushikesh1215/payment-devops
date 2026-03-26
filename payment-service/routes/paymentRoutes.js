// routes/paymentRoutes.js
import express from "express";
import { sendMoney } from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate, sendSchema } from "../middlewares/validate.js";

const router = express.Router();

router.post("/send", authMiddleware, validate(sendSchema), sendMoney);

export default router;