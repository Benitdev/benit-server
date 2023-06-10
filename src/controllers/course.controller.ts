import type { Request, Response } from "express"

import { Course } from "@src/models/Course"
import { stringToSlug } from "@src/utils/slug-util"
import { TCourse } from "@src/types"
import { Lesson } from "@src/models/Lesson"

export const getCourses = async (req: Request, res: Response) => {
  try {
    const { categoryId, title, status } = req.query

    const criteria = []
    if (categoryId) criteria.push({ categoryId: categoryId })
    if (title) criteria.push({ title: new RegExp(`${title as string}`, "i") })
    if (status) criteria.push({ status })

    const query = criteria.length > 0 ? { $and: criteria } : {}

    const courses = await Course.find(query)
      .sort({ createdAt: -1 })
      .populate("categoryId", "title")
      .populate("courseChapters.lessons")

    res.status(200).json({ data: courses, message: "Get courses successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const getCourseDetail = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const courses = await Course.findOne({ slug })
      .populate("categoryId", "title")
      .populate("courseChapters.lessons")

    res.status(200).json({ data: courses, message: "Get course successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const createCourse = async (req: Request, res: Response) => {
  try {
    const data = req.body as TCourse
    data.courseChapters.forEach((chapter) => {
      chapter.lessons?.forEach((lesson) => {
        if (typeof lesson === "string") return
        lesson.slug = stringToSlug(lesson.title)
      })
    })

    const createLessons = async () => {
      for (let i = 0; i < data.courseChapters.length; i++) {
        if (data.courseChapters[i].lessons) {
          const lessons = await Lesson.create(data.courseChapters[i].lessons)
          data.courseChapters[i].lessons = lessons.map((lesson) =>
            lesson._id.toString()
          )
        }
      }
    }
    await createLessons()
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
      chapter.lessons.forEach((lesson) => {
        if (typeof lesson === "string") return
        lesson.slug = stringToSlug(lesson.title)
      })
    })
    const getLessonIDs = async () => {
      for (let i = 0; i < data.courseChapters.length; i++) {
        const lessonHasId = data.courseChapters[i].lessons.map((lesson) => {
          if (typeof lesson === "string") return
          return lesson._id
        })
        await Lesson.deleteMany({ _id: lessonHasId })
        const lessons = await Lesson.create(data.courseChapters[i].lessons)
        data.courseChapters[i].lessons = lessons.map((lesson) =>
          lesson._id.toString()
        )
      }
    }
    await getLessonIDs()
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
