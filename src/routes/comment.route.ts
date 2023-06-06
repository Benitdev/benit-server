import { Router } from "express"

import { isAuthenticated } from "@src/middlewares/auth"
import {
  createComment,
  getAllComments,
} from "@src/controllers/comment.controller"

const commentRoutes = Router()

commentRoutes.get("/", getAllComments)
commentRoutes.post("/", isAuthenticated, createComment)

export default commentRoutes
