
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    phone: { type: String, unique: true },
    password: String
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;