import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 2000,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 32,
    },
    productImage: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

