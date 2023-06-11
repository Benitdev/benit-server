import type { Request, Response } from "express"
import TurndownService from "turndown"

import { Post } from "@src/models/Post"
import type { TPost, TUser } from "@src/types"
import { stringToSlug } from "@src/utils/slug-util"
import { Comment } from "@src/models/Comment"
import { Code } from "@src/models/Code"

/* const turndownService = new TurndownService({
  codeBlockStyle: "fenced",
})
 */
export const getPosts = async (req: Request, res: Response) => {
  try {
    const {
      feature,
      categoryId,
      title,
      status,
      authorId,
      likes,
      page = 1,
    } = req.query
    const limit = 10
    const skip = (Number(page) - 1) * limit

    const criteria = []
    if (feature) criteria.push({ feature })
    if (categoryId) criteria.push({ tags: { $in: categoryId } })
    if (title) criteria.push({ title: new RegExp(`${title as string}`, "i") })
    if (status) criteria.push({ status })
    if (authorId) criteria.push({ authorId })
    if (likes) criteria.push({ likes })

    const query = criteria.length > 0 ? { $and: criteria } : {}
    const posts = await Post.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("authorId", ["fullName", "avatar"])
      .populate("tags", ["title"])

    const totalDocuments = await Post.countDocuments(query)
    const lastPage = Math.ceil(totalDocuments / limit)
    res.status(200).json({
      data: { data: posts, lastPage },
      message: "Get posts successfully",
    })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const getSimilarPosts = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.query as { categoryId: string }

    const posts = await Post.find({ tags: { $in: categoryId.split(",") } })
      .limit(10)
      .sort({ createdAt: -1 })
      .populate("authorId", ["fullName", "avatar"])
      .populate("tags", ["title"])

    res.status(200).json({
      data: posts,
      message: "Get posts successfully",
    })
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
      {
        ...data,
        slug,
        authorId: _id,
        readingTime,
      }
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
    const { type } = req.query

    if (type === "code") {
      const likedCode = await Code.find({
        _id: id,
        likes: userId,
      })
      if (likedCode.length !== 0)
        return res.status(200).json({ data: { liked: true } })
      else return res.status(200).json({ data: { liked: false } })
    }

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
    const { action, type } = req.query

    if (type === "code") {
      if (action === "add") {
        await Code.updateOne(
          { _id: id },
          {
            $push: {
              likes: userId,
            },
          }
        )
        return res
          .status(200)
          .json({ message: "Thêm code vào yêu thích thành công!" })
      } else {
        await Code.updateOne(
          { _id: id },
          {
            $pull: {
              likes: userId,
            },
          }
        )
        return res
          .status(200)
          .json({ message: "Xoá code khỏi yêu thích thành công!" })
      }
    }

    if (action === "add") {
      await Post.updateOne(
        { _id: id },
        {
          $push: {
            likes: userId,
          },
        }
      )
      return res
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
      return res
        .status(200)
        .json({ message: "Xoá bài viết khỏi yêu thích thành công!" })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

export const updateView = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await Post.updateOne(
      { _id: id },
      {
        $inc: {
          views: 1,
        },
      }
    )
    res.status(200).json({ message: "Thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}
