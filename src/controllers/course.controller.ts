import type { Request, Response } from "express"

import { Course } from "@src/models/Course"
import { stringToSlug } from "@src/utils/slug-util"
import { TCourse } from "@src/types"

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find().populate("categoryID", "title")
    res.status(200).json({ data: courses, message: "Get courses successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const createCourse = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const slug = stringToSlug(req.body.title)
    await Course.create({ ...req.body, slug })
    res.status(200).json({ message: "Thêm khoá học thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = req.body as TCourse
    await Course.updateOne({ _id: id }, data)
    res.status(200).json({ message: "Chỉnh sửa khoá học thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}
