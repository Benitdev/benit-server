import { Router } from "express"
import { getCourses } from "@src/controllers/course.controller"

const courseRoutes = Router()

courseRoutes.get("/", getCourses)

export default courseRoutes
