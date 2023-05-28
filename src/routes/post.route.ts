import { Router } from "express"
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostDetail,
} from "@src/controllers/post.controller"
import { isAuthenticated } from "@src/middlewares/auth"

const postRoutes = Router()

postRoutes.get("/", getPosts)
postRoutes.get("/:slug", getPostDetail)
postRoutes.post("/", isAuthenticated, createPost)
postRoutes.put("/:id", isAuthenticated, updatePost)
postRoutes.delete("/:id", deletePost)

export default postRoutes
