import { Router } from "express"
import authRoutes from "./auth.route"
import postRoutes from "./post.route"
import userRoutes from "./user.route"
import courseRoutes from "./course.route"
import categoriesRoutes from "./category.route"
import codeTemplateRoutes from "./code-template.route"
import uploadRoutes from "./upload.route"

const router = Router()

router.use("/posts", postRoutes)
router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/courses", courseRoutes)
router.use("/categories", categoriesRoutes)
router.use("/code-template", codeTemplateRoutes)
router.use("/upload", uploadRoutes)

export default router
