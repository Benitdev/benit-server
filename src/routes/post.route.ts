import { Router } from "express"
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostDetail,
  favoritePost,
  getFavoritePost,
  updateView,
} from "@src/controllers/post.controller"
import { isAuthenticated } from "@src/middlewares/auth"

const postRoutes = Router()

postRoutes.get("/", getPosts)
postRoutes.get("/:slug", getPostDetail)
postRoutes.post("/", isAuthenticated, createPost)
postRoutes.get("/favorite/:id", isAuthenticated, getFavoritePost)
postRoutes.get("/views/:id", updateView)
postRoutes.post("/favorite/:id", isAuthenticated, favoritePost)
postRoutes.put("/:id", isAuthenticated, updatePost)
postRoutes.delete("/:id", deletePost)

export default postRoutes
