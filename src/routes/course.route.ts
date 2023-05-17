import { Router } from "express"
import {
  createCourse,
  getCourseDetail,
  getCourses,
  updateCourse,
} from "@src/controllers/course.controller"

const courseRoutes = Router()

courseRoutes.get("/", getCourses)
courseRoutes.get("/:slug", getCourseDetail)
courseRoutes.post("/", createCourse)
courseRoutes.put("/:id", updateCourse)

export default courseRoutes
