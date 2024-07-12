import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 32,
    },
    diagonadeWith: {
      type: String,
      required: true,
    },
    patientImage: {
      type: String,
    },
    age: {
        type: Number,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum:['M','F','O'],
        required: true,
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
    addmitedIn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);
