import mongoose from "mongoose"

const lessonSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    videoID: String,
    duration: String,
  },
  { timestamps: true }
)

export const Lesson = mongoose.model("Lesson", lessonSchema)
