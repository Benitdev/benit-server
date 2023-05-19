import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number },
    fullName: { type: String, required: true },
    avatar: { type: String },
    provider: { type: String },
    role: { type: String, required: true, default: "user" },
    status: { type: String, default: "active" },
    courseLearned: [
      {
        courseSlug: String,
        chapters: [
          {
            chapterID: String,
            lessons: [String],
          },
        ],
      },
    ],
  },
  { timestamps: true }
)

export const User = mongoose.model("User", userSchema)
