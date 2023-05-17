import type { Request, Response } from "express"

import { Category } from "@src/models/Category"
import { TPostCate } from "@src/types"
import { stringToSlug } from "@src/utils/slug-util"

export const getCourseCate = async (req: Request, res: Response) => {
  try {
    const { type } = req.query
    const courses = await Category.find({ type })
    res.status(200).json({ data: courses, message: "Get courses successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const createCourseCate = async (req: Request, res: Response) => {
  try {
    const { title, description, type } = req.body as TPostCate
    const slug = stringToSlug(title)
    await Category.create({ title, slug, description, type })
    res.status(200).json({ message: "Thêm danh mục thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const updateCourseCate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, type } = req.body as TPostCate
    const slug = stringToSlug(title)
    await Category.updateOne({ _id: id }, { title, slug, description, type })
    res.status(200).json({ message: "Sửa danh mục thành công!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await Category.deleteOne({ _id: id })
    if (result.deletedCount !== 0)
      return res.status(200).json({ message: "Xoá danh mục thành công!" })
    return res.status(400).json({ message: "Xoá danh mục thất bại!" })
  } catch (err) {
    res.status(500).json(err)
  }
}
