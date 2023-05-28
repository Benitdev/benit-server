import { Router } from "express"

import { isAuthenticated } from "../middlewares/auth"
import {
  deleteUser,
  getUsers,
  registerCourse,
  updateProgress,
  updateUser,
} from "@src/controllers/user.controller"

const userRoutes = Router()

userRoutes.get("/", isAuthenticated, (req, res) => {
  res.json(req.user)
})
userRoutes.get("/list", getUsers)
userRoutes.patch("/:id", updateUser)
userRoutes.delete("/:id", deleteUser)
userRoutes.post("/register-course", isAuthenticated, registerCourse)
userRoutes.post("/update-progress", isAuthenticated, updateProgress)

export default userRoutes
