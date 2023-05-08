import type { Request, Response } from "express"

import { Category } from "@src/models/Category"
import { TPostCate } from "@src/types"

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
    const { title, slug, description, type } = req.body as TPostCate
    await Category.create({ title, slug, description, type })
    res.status(200).json({ message: "Add course category successfully!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const updateCourseCate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, slug, description, type } = req.body as TPostCate
    await Category.updateOne({ _id: id }, { title, slug, description, type })
    res.status(200).json({ message: "Edit course category successfully!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await Category.deleteOne({ _id: id })
    res.status(200).json({ message: "Delete course category successfully!" })
  } catch (err) {
    res.status(500).json(err)
  }
}
