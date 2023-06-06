import type { Request, Response } from "express"

import { Comment } from "@src/models/Comment"
import { TComment, TUser } from "@src/types"

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const { postId, type, reply } = req.query

    if (postId) {
      const comments = await Comment.find({ [type as string]: postId, reply })
        .sort({
          createdAt: reply ? 1 : -1,
        })
        .populate("authorId", ["fullName", "avatar"])
      return res.status(200).json({
        data: comments,
        message: "Get comments successfully",
      })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

export const createComment = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as TUser
    const data = req.body as TComment
    const comment = await Comment.create({ ...data, authorId: _id })

    if (data.reply)
      await Comment.updateOne(
        {
          _id: data.reply,
        },
        { $inc: { allReplies: 1 } }
      )

    if (comment) return res.status(200).json({ message: "oke" })
    return res.status(400).json({ message: "Bình luận không thành công" })
  } catch (err) {
    return res.status(500).json(err)
  }
}
