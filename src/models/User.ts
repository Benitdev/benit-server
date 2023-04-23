import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number },
    fullName: { type: String, required: true },
    avatar: { type: String },
    provider: { type: String },
    role: { type: String, required: true, default: "user" },
    status: { type: String, default: "active" },
    courserLearned: {},
  },
  { timestamps: true }
)

export const User = mongoose.model("User", userSchema)
