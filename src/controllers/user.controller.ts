import { CourseLearned } from "./../models/CourseLearned"
import type { Request, Response } from "express"
import { User } from "@src/models/User"
import { TUser } from "@src/types"
import { Course } from "@src/models/Course"

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
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
