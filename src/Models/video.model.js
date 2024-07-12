import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String, //Cloudinary URL
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)




videoSchema.plugin(mongooseAggregatePaginate);

const Video = mongoose.model("Video", videoSchema);
