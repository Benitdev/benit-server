import mongoose from "mongoose"

const codeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    htmlCode: String,
    cssCode: String,
    jsCode: String,
    favorites: Number,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "removed"],
    },
  },
  { timestamps: true }
)

export const Code = mongoose.model("Code", codeSchema)
