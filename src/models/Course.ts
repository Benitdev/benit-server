import mongoose from "mongoose"

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tags: [{ type: String }],
    feature: { type: String },
    courserChapter: [
      {
        title: String,
        description: String,
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
    status: { type: String },
  },
  { timestamps: true }
)

export const Course = mongoose.model("Course", courseSchema)
