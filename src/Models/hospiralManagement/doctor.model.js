import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 32,
    },
    salary: {
      type: String,
      required: true,
    },
    doctorImage: {
      type: String,
    },
    qualification: {
      type: String,
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
    expirienceInYear: {
      type: Number,
      required: true,
      default: 0,
    },
    speciality: {
      type: String,
      required: true,
    },
    worksIn: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
            required: true,
        },
    ]
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
