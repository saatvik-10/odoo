import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: Number,
      require: true,
      unique: true,
    },
    hash: {
      type: String,
      require: true,
    },
    address: {
      addressLine1: {
        type: String,
        trim: true,
      },

      street: {
        type: String,
        trim: true,
      },
      pincode: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
      },
    },
    verified : {
        type : Boolean,
        default : false,
    }
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;
