import type { Request, Response } from "express"
import { Lesson } from "@src/models/Lesson"

export const getLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const lesson = await Lesson.findById(id)
    res.status(200).json({ data: lesson, message: "Get posts successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}
