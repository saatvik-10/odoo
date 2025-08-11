import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    rental: {
      type: Number,
      required: true,
    },
    orderID: {
      type: String,
    },
    amount: {
      type: Number,
    },
    amount_paid: {
      type: Number,
    },
    amount_due: {
      type: Number,
    },
    currency: {
      type: String,
      enum: ["INR", "USD"],
    },
    status: {
      type: String,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    notes: [],
    createdAt: Number,
  },
  {
    timestamps: true,
  },
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
