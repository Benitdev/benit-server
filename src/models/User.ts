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
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        lessons: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
            required: true,
          },
        ],
      },
    ],
  },
  { timestamps: true }
)

export const User = mongoose.model("User", userSchema)
