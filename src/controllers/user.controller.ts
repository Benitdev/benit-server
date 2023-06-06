import mongoose from "mongoose"
import type { Request, Response } from "express"

import { User } from "@src/models/User"
import { TUser } from "@src/types"
import { Course } from "@src/models/Course"

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.status(200).json({ data: users, message: "Get posts successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = req.body as TUser
    await User.updateOne({ _id: id }, data)
    res.status(200).json({ message: "Chỉnh sửa tài khoản thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await User.deleteOne({ _id: id })
    res.status(200).json({ message: "Xoá tài khoản người dùng thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const getCourseLearned = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params
    const course = await Course.findOne({ "courseLearned.courseSlug": slug })
    res
      .status(200)
      .json({ data: course, message: "Lấy thông tin khóa học thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const registerCourse = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const data = req.body as { course: string; lesson: string }
      const { _id } = req.user as TUser
      const user = await User.updateOne(
        { _id },
        {
          $push: {
            courseLearned: {
              course: data.course,
              lessons: [{ lessonId: data.lesson }],
            },
          },
        }
      )
      res
        .status(200)
        .json({ data: user, message: "Đăng kí khóa học thành công!" })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

export const updateProgress = async (req: Request, res: Response) => {
  try {
    const data = req.body as { course: string; nextLessonID: string }
    const { _id } = req.user as TUser

    const user = await User.findById(_id)
    const courseLearned = user?.courseLearned?.find(
      (course) => course.course?.toString() === data.course
    )
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    courseLearned!.lessons!.at(-1)!.status = "done"
    if (data.nextLessonID) {
      courseLearned?.lessons.push({
        lessonId: new mongoose.Types.ObjectId(data.nextLessonID),
        status: "learning",
      })
    }

    await user?.save()
    res.status(200).json({ message: "Cập nhật tiến trình học thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}
