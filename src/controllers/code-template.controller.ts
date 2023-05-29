import type { Request, Response } from "express"

import { Code } from "@src/models/Code"
import { TCodeTemplate, TUser } from "@src/types"

export const getCodeTemplate = async (req: Request, res: Response) => {
  try {
    const { categoryId, title, status } = req.query

    const criteria = []
    if (categoryId) criteria.push({ categoryID: categoryId })
    if (title) criteria.push({ title: new RegExp(`${title as string}`, "i") })
    if (status) criteria.push({ status })

    const query = criteria.length > 0 ? { $and: criteria } : {}

    const code = await Code.find(query)
      .sort({ createdAt: -1 })
      .populate("authorId", ["fullName", "avatar"])

    res
      .status(200)
      .json({ data: code, message: "Get code template successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const createCodeTemplate = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as TUser
    const data = req.body as TCodeTemplate
    await Code.create({ ...data, authorId: _id })
    res.status(200).json({ message: "Add code template successfully!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const updateCodeTemplate = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as TUser
    const { id } = req.params
    const data = req.body as TCodeTemplate
    await Code.updateOne({ _id: id }, { ...data, authorId: _id })
    res.status(200).json({ message: "Edit code template successfully!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const deleteCodeTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await Code.deleteOne({ _id: id })
    res.status(200).json({ message: "Delete code template successfully!" })
  } catch (err) {
    res.status(500).json(err)
  }
}
