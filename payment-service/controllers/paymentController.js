import mongoose from "mongoose";
import Account from "../models/Account.js";
import { ledgerQueue } from "../config/queue.js";

export const sendMoney = async (req, res, next) => {
  const { receiverPhone, amount } = req.body;
  const senderId = req.user.userId;

//   const session = await mongoose.startSession();
//   session.startTransaction();

  try {
    const sender = await Account.findOneAndUpdate(
      { userId: senderId, balance: { $gte: amount } },
      { $inc: { balance: -amount } }
    //   { new: true, session }
    );

    if (!sender) throw new Error("Insufficient balance");

    const receiver = await Account.findOneAndUpdate(
      { phone: receiverPhone },
      { $inc: { balance: amount } },
      { new: true, session }
    );

    if (!receiver) throw new Error("Receiver not found");

    // await session.commitTransaction();

    const txnId = `txn_${Date.now()}`;

    await ledgerQueue.add("transaction", {
      transactionId: txnId,
      userId: senderId,
      type: "DEBIT",
      amount,
      balance: sender.balance
    });

    await ledgerQueue.add("transaction", {
      transactionId: txnId,
      userId: receiver.userId,
      type: "CREDIT",
      amount,
      balance: receiver.balance
    });

    res.json({
      message: "Transfer success",
      transactionId: txnId
    });

  } catch (err) {
    // await session.abortTransaction();
    next(err);
  } finally {
    // session.endSession();
  }
};