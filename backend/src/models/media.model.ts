import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    eTag: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MediaModel = mongoose.model("Media", mediaSchema);
