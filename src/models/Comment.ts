import mongoose from "mongoose"

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    allReplies: {
      type: Number,
      default: 0,
    },
    content: String,
  },
  { timestamps: true }
)

export const Comment = mongoose.model("Comment", commentSchema)
