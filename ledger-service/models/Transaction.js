
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Transaction = sequelize.define("Transaction", {
  transactionId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  userId: DataTypes.STRING,
  type: DataTypes.STRING, // CREDIT / DEBIT
  amount: DataTypes.FLOAT,
  balance: DataTypes.FLOAT,
  status: DataTypes.STRING
});

export default Transaction;