import mongoose from "mongoose"

const courseLearnSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
  },
  { timestamps: true }
)

export const CourseLearned = mongoose.model("CourseLearned", courseLearnSchema)
