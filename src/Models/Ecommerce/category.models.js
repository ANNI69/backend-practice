import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000,
    },
    parentId: {
        type: String,
    },
    type: {
        type: String,
    },
    categoryImage: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);