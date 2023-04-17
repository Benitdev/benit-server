import { Router } from "express"
import { createPosts } from "@src/controllers/post.controller"

const postRoutes = Router()

postRoutes.get("/", (_, res) => res.send("hello"))
postRoutes.post("/", createPosts)

export default postRoutes
