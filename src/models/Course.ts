import mongoose from "mongoose"

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    goals: [String],
    tags: [{ type: String }],
    feature: { type: String },
    type: { type: String },
    level: String,
    courseChapters: [
      {
        index: Number,
        title: String,
        description: String,
        lessons: [
          {
            title: String,
            slug: String,
            videoID: String,
            duration: String,
          },
        ],
        createdAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now },
      },
    ],
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
    status: {
      type: String,
      enum: ["pending", "released", "removed"],
      default: "released",
    },
  },
  { timestamps: true }
)

export const Course = mongoose.model("Course", courseSchema)
