import { Router } from "express"

import { isAuthenticated } from "../middlewares/auth"
import { getUsers, updateUser } from "@src/controllers/user.controller"

const userRoutes = Router()

userRoutes.get(
  "/",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  isAuthenticated,
  (req, res) => {
    res.json(req.user)
  }
)
userRoutes.get("/list", getUsers)
userRoutes.patch("/:id", updateUser)

export default userRoutes
