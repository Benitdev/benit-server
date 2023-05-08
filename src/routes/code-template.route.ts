import { Router } from "express"

import {
  createCodeTemplate,
  deleteCodeTemplate,
  getCodeTemplate,
  updateCodeTemplate,
} from "@src/controllers/code-template.controller"

const codeTemplateRoutes = Router()

codeTemplateRoutes.get("/", getCodeTemplate)
codeTemplateRoutes.post("/", createCodeTemplate)
codeTemplateRoutes.patch("/:id", updateCodeTemplate)
codeTemplateRoutes.delete("/:id", deleteCodeTemplate)

export default codeTemplateRoutes
