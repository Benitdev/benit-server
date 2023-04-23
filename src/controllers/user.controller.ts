import type { Request, Response } from "express"
import { User } from "@src/models/User"

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    res.status(200).json({ data: users, message: "Get posts successfully" })
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
