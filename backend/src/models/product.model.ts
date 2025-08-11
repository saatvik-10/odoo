import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    price: {
      hourly: Number,
      daily: Number,
      monthly: Number,
      yearly: Number,
    },
    specialPrices: [
      {
        hourly: Number,
        daily: Number,
        monthly: Number,
        yearly: Number,
      },
    ],
    extraPricing: {
      hourly: Number,
      daily: Number,
      monthly: Number,
      yearly: Number,
    },
    images: [String],
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    public: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
