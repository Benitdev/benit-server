import { Router } from "express"
import { isAuthenticated } from "./../middlewares/auth"

const userRoutes = Router()

userRoutes.get(
  "/",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  isAuthenticated,
  (req, res) => {
    res.json(req.user)
  }
)

export default userRoutes
