import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    readingTime: Number,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "removed"],
      default: "pending",
    },
    feature: {
      type: String,
      enum: ["featured", "common"],
      default: "featured",
    },
  },
  { timestamps: true }
)

export const Post = mongoose.model("Post", postSchema)
