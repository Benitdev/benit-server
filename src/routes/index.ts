import { Router } from "express"
import authRoutes from "./auth.route"
import postRoutes from "./post.route"
import userRoutes from "./user.route"
import courseRoutes from "./course.route"

const router = Router()

router.use("/posts", postRoutes)
router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/courses", courseRoutes)

export default router
