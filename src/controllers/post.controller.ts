import type { Request, Response } from "express"
import { Post } from "@src/models/Post"
import type { TPost } from "@src/types"
import { stringToSlug } from "@src/utils/slug-util"

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
    const data = req.body as TPost
    const slug = stringToSlug(data.title)
    const post = await Post.create({ ...data, slug })
    if (post) return res.status(200).json({ message: "oke" })
    return res.status(400).json({ message: "Thêm bài viết không thành công" })
  } catch (err) {
    return res.status(500).json(err)
  }
}

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = req.body as TPost
    const slug = stringToSlug(data.title)
    await Post.updateOne({ _id: id }, { ...data, slug })
    res.status(200).json({ message: "Chỉnh sửa bài viết thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await Post.deleteOne({ _id: id })
    if (result.deletedCount !== 0)
      return res.status(200).json({ message: "Xoá bài viết thành công!" })
    return res.status(400).json({ message: "Xoá bài viết không thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}
