import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    addition: { type: Boolean, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    note: String,
    type: { type: String, required: true },
    user: { type: mongoose.ObjectId, required: true },
  },
  { timestamps: true }
);
export default mongoose.model("Transaction", TransactionSchema);
