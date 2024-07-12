import mongoose from "mongoose";
const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 2000,
    },
    medicalRecordImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);