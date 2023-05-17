import { Router } from "express"
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "@src/controllers/post.controller"

const postRoutes = Router()

postRoutes.get("/", getPosts)
postRoutes.post("/", createPost)
postRoutes.put("/:id", updatePost)
postRoutes.delete("/:id", deletePost)

export default postRoutes
