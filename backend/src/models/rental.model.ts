import mongoose from "mongoose";

export const rentalSchema = new mongoose.Schema(
  {
    rentalID: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      durationType: {
        type: String,
        required: true,
        enum: ["Months", "Days", "Hours"],
      },
      durationValue: {
        type: Number,
        required: true,
      },
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
    status: {
      type: String,
      required: true,
      enum: [
        "Quotation",
        "Reserved",
        "Picked Up",
        "Delivered",
        "Returned",
        "Received By Vendor",
        "Cancelled",
      ],
    },
    reasonForCancellation: {
      type: String,
      default: null,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    couponCode: {
      type: String,
      default: null,
    },
    couponDiscount: {
      type: Number,
      default: 0,
    },
    totalAmt: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Rental = mongoose.model("Rental", rentalSchema);
export default Rental;
