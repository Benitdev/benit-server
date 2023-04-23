import type { Request, Response } from "express"

import { Course } from "@src/models/Course"

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find()
    res.status(200).json({ data: courses, message: "Get courses successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}

/* export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, slug, content, authorId } = req.body as TPost
    await Post.create({
      title,
      slug,
      content,
      authorId,
    })
    res.status(200).json({ message: "oke" })
  } catch (err) {
    res.status(500).json(err)
  }
}
 */
