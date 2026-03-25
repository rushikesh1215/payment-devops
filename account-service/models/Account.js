

import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);
export default Account;