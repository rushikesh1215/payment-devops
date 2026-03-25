
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import accountRoutes from "./routes/accountRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/account", accountRoutes);

app.get("/", (req, res) => res.send("Account Service Running"));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));