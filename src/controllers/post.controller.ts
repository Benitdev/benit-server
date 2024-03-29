import type { Request, Response } from "express"
import { Post } from "@src/models/Post"
import type { TPost } from "@src/types"

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
    res.status(200).json({ data: posts, message: "Get posts successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const createPost = async (req: Request, res: Response) => {
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
