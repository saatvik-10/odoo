import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    rentalID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rental",
      required: true,
    },
    invoiceAddress: {
      addressLine1: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
        trim: true,
      },
      pincode: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    deliveryAddress: {
      addressLine1: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
        trim: true,
      },
      pincode: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    sourceAddress: {
      addressLine1: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
        trim: true,
      },
      pincode: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    transferType: {
      type: String,
      enum: ["pickup", "return"],
    },
    transferMethod: {
      type: String,
    },
    status: {
      type: String,
      enum: ["initiated", "processing", "completed", "cancelled"],
      default: "initiated",
    },
  },
  {
    timestamps: true,
  },
);

const Transfer = mongoose.model("Transfer", transferSchema);
export default Transfer;
