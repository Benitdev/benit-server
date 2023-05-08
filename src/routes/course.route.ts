import { Router } from "express"
import {
  createCourse,
  getCourses,
  updateCourse,
} from "@src/controllers/course.controller"

const courseRoutes = Router()

courseRoutes.get("/", getCourses)
courseRoutes.post("/", createCourse)
courseRoutes.put("/:id", updateCourse)

export default courseRoutes
