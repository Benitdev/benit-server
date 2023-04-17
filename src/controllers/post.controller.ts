import type { Request, Response } from "express"
import { Post } from "@src/models/Post"

type Body = {
  title: string
  content: string
  authorId: string
}

export const createPosts = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId } = req.body as Body
    await Post.create({
      title,
      content,
      authorId,
    })
    res.status(200).json({ message: "oke" })
  } catch (err) {
    res.status(500).json(err)
  }
}
