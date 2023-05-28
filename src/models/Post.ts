import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    tags: [{ type: String }],
    readingTime: Number,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        authorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    views: { type: Number },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "removed"],
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
