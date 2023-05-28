import { Router } from "express"

import {
  createCodeTemplate,
  deleteCodeTemplate,
  getCodeTemplate,
  updateCodeTemplate,
} from "@src/controllers/code-template.controller"
import { isAuthenticated } from "@src/middlewares/auth"

const codeTemplateRoutes = Router()

codeTemplateRoutes.get("/", getCodeTemplate)
codeTemplateRoutes.post("/", isAuthenticated, createCodeTemplate)
codeTemplateRoutes.patch("/:id", isAuthenticated, updateCodeTemplate)
codeTemplateRoutes.delete("/:id", deleteCodeTemplate)

export default codeTemplateRoutes
