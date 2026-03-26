import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  phone: { type: String, unique: true },
  balance: { type: Number, default: 0 }
});

export default mongoose.model("Account", accountSchema);