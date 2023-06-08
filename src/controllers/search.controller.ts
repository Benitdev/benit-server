import type { Request, Response } from "express"

import { Course } from "@src/models/Course"
import { Post } from "@src/models/Post"

export const generalSearch = async (req: Request, res: Response) => {
  try {
    const { text } = req.query

    const courses = await Course.find({
      title: new RegExp(`${text as string}`, "i"),
    })
      .sort({ createdAt: -1 })
      .limit(5)

    const posts = await Post.find({
      title: new RegExp(`${text as string}`, "i"),
    })
      .sort({ createdAt: -1 })
      .limit(5)

    res
      .status(200)
      .json({ data: { courses, posts }, message: "Get posts successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}
