
import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

export const connection = new IORedis(process.env.REDIS_URL);

export const ledgerQueue = new Queue("ledger-queue", {
  connection
});