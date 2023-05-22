import { Router } from "express"
import {
  createCourse,
  getCourseDetail,
  getCourses,
  updateCourse,
} from "@src/controllers/course.controller"
import { getLesson } from "@src/controllers/lesson.controlller"

const courseRoutes = Router()

courseRoutes.get("/", getCourses)
courseRoutes.get("/:slug", getCourseDetail)
courseRoutes.get("/lessons/:id", getLesson)
courseRoutes.post("/", createCourse)
courseRoutes.put("/:id", updateCourse)

export default courseRoutes
