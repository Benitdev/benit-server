import type { Request, Response } from "express"

import { Post } from "@src/models/Post"
import type { TPost, TUser } from "@src/types"
import { stringToSlug } from "@src/utils/slug-util"
import { Comment } from "@src/models/Comment"

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { feature, categoryId, title, status, authorId, likes } = req.query
    const criteria = []
    if (feature) criteria.push({ feature })
    if (categoryId) criteria.push({ tags: { $in: categoryId } })
    if (title) criteria.push({ title: new RegExp(`${title as string}`, "i") })
    if (status) criteria.push({ status })
    if (authorId) criteria.push({ authorId })
    if (likes) criteria.push({ likes })

    const query = criteria.length > 0 ? { $and: criteria } : {}
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .populate("authorId", ["fullName", "avatar"])
      .populate("tags", ["title"])

    res.status(200).json({ data: posts, message: "Get posts successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const getPostDetail = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const post = await Post.findOne({ slug })
      .populate("authorId", ["fullName", "avatar"])
      .populate("tags", ["title"])

    if (post) {
      const totalComment = await Comment.countDocuments({ postId: post._id })

      return res.status(200).json({
        data: {
          ...post.toObject(),
          totalComment,
        },
        message: "Get post successfully",
      })
    }

    return res.status(404)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const createPost = async (req: Request, res: Response) => {
  const wordsPerMinute = 800
  try {
    const { _id } = req.user as TUser
    const data = req.body as TPost

    const readingTime = Math.ceil(
      data.content.split(" ").length / wordsPerMinute
    )

    const slug = stringToSlug(data.title)
    const post = await Post.create({
      ...data,
      slug,
      authorId: _id,
      readingTime,
    })
    if (post)
      return res.status(200).json({ message: "Thêm bài viết thành công!" })
    return res.status(400).json({ message: "Thêm bài viết không thành công" })
  } catch (err) {
    return res.status(500).json(err)
  }
}

export const updatePost = async (req: Request, res: Response) => {
  const wordsPerMinute = 800
  try {
    const { _id } = req.user as TUser
    const { id } = req.params
    const data = req.body as TPost

    const readingTime = Math.ceil(
      data.content.split(" ").length / wordsPerMinute
    )

    const slug = stringToSlug(data.title)
    await Post.updateOne(
      { _id: id },
      { ...data, slug, authorId: _id, readingTime }
    )
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

export const getFavoritePost = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = req.user as TUser
    const { id } = req.params

    const likedPost = await Post.find({
      _id: id,
      likes: userId,
    })
    if (likedPost.length !== 0)
      return res.status(200).json({ data: { liked: true } })
    else return res.status(200).json({ data: { liked: false } })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const favoritePost = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = req.user as TUser
    const { id } = req.params
    const { action } = req.query

    if (action === "add") {
      await Post.updateOne(
        { _id: id },
        {
          $push: {
            likes: userId,
          },
        }
      )
      res
        .status(200)
        .json({ message: "Thêm bài viết vào yêu thích thành công!" })
    } else {
      await Post.updateOne(
        { _id: id },
        {
          $pull: {
            likes: userId,
          },
        }
      )
      res
        .status(200)
        .json({ message: "Xoá bài viết khỏi yêu thích thành công!" })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
