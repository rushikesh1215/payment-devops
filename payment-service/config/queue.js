// FIX: force ioredis to use IPv4 (not ::1)

import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379
});

export const ledgerQueue = new Queue("ledger-queue", { connection });