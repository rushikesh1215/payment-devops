// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ledgerRoutes from "./routes/ledgerRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import "./workers/ledgerWorker.js"; // start worker

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/ledger", ledgerRoutes);

app.get("/", (req, res) => res.send("Ledger Service Running"));

app.use(errorHandler);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));