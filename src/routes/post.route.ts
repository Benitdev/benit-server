import { Router } from "express"
import { getPosts, createPost } from "@src/controllers/post.controller"

const postRoutes = Router()

postRoutes.get("/", getPosts)
postRoutes.post("/", createPost)

export default postRoutes
