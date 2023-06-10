import mongoose from "mongoose"

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    categoryId: {
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
        type: {
          index: Number,
          title: String,
          description: String,
          lessons: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Lesson",
            },
          ],
          createdAt: { type: Date, default: Date.now },
          updateAt: { type: Date, default: Date.now },
        },
        default: {},
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["pending", "published", "removed"],
      default: "published",
    },
  },
  { timestamps: true }
)

export const Course = mongoose.model("Course", courseSchema)
