
import { Worker } from "bullmq";
import { connection } from "../config/queue.js";
import Transaction from "../models/Transaction.js";
import { sequelize } from "../config/db.js";

await sequelize.sync();

const worker = new Worker(
  "ledger-queue",
  async (job) => {
    const data = job.data;
console.log("first")
    await Transaction.create({
      transactionId: data.transactionId || `txn_${Date.now()}`,
      userId: data.userId,
      type: data.type,
      amount: data.amount,
      balance: data.balance,
      status: "SUCCESS"
    });
  },
  { connection }
);
worker.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed successfully!`);
  console.log("Result:", result);
});
worker.on("failed", (job, err) => {
  console.error("Job failed:", err);
});