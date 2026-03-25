

import Account from "../models/Account.js";
import { ledgerQueue } from "../config/queue.js";

const getOrCreateAccount = async (userId) => {
  return await Account.findOneAndUpdate(
    { userId },
    { $setOnInsert: { userId, balance: 0 } },
    { new: true, upsert: true }
  );
};

export const getBalance = async (req, res) => {
  try {
    const account = await getOrCreateAccount(req.user.userId);
    res.json({ balance: account.balance });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

export const addMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    const account = await Account.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $inc: { balance: amount },
        $setOnInsert: { userId: req.user.userId }
      },
      { new: true, upsert: true }
    );

    //🔥 push to queue (async ledger)
    await ledgerQueue.add("transaction", {
      type: "CREDIT",
      userId: req.user.userId,
      amount,
      balance: account.balance,
      timestamp: new Date()
    });

    res.json({
      message: "Money added",
      balance: account.balance
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};