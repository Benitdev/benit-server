import { Router } from "express"

import uploadCloud from "@src/services/cloudinary.services"

const uploadRoutes = Router()

uploadRoutes.post("/", uploadCloud.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"))
    return
  }

  res.json({ data: { imagePath: req.file.path } })
})

export default uploadRoutes
