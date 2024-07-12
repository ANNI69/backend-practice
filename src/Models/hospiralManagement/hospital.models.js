import mongoose from "mongoose";
const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 32,
    },
    hospitalImage: {
      type: String,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxLength: 2000,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    speciality: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Hospital = mongoose.model("Hospital", hospitalSchema);
