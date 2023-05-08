import { Router } from "express"

import {
  createCourseCate,
  deleteCategory,
  getCourseCate,
  updateCourseCate,
} from "@src/controllers/category.controller"

const categoriesRoutes = Router()

categoriesRoutes.get("/", getCourseCate)
categoriesRoutes.post("/", createCourseCate)
categoriesRoutes.patch("/:id", updateCourseCate)
categoriesRoutes.delete("/:id", deleteCategory)

export default categoriesRoutes
