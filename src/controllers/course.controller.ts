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

export const getCourseDetail = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const courses = await Course.findOne({ slug }).populate(
      "categoryID",
      "title"
    )
    res.status(200).json({ data: courses, message: "Get course successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const createCourse = async (req: Request, res: Response) => {
  try {
    const data = req.body as TCourse
    data.courseChapters.forEach((chapter) => {
      chapter.lessons.forEach(
        (lesson) => (lesson.slug = stringToSlug(lesson.title))
      )
    })
    const slug = stringToSlug(data.title)
    await Course.create({ ...data, slug })
    res.status(200).json({ message: "Thêm khoá học thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = req.body as TCourse
    data.courseChapters.forEach((chapter) => {
      chapter.lessons.forEach(
        (lesson) => (lesson.slug = stringToSlug(lesson.title))
      )
    })
    const slug = stringToSlug(data.title)
    await Course.updateOne({ _id: id }, { ...data, slug })
    res.status(200).json({ message: "Chỉnh sửa khoá học thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await Course.deleteOne({ _id: id })
    if (result.deletedCount !== 0)
      return res.status(200).json({ message: "Xoá khoá học thành công!" })
    return res.status(400).json({ message: "Xoá khoá học không thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}
