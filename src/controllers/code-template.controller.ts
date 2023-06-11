import type { Request, Response } from "express"

import { Code } from "@src/models/Code"
import { TCodeTemplate, TUser } from "@src/types"

export const getCodeTemplate = async (req: Request, res: Response) => {
  try {
    const {
      categoryId,
      title,
      status,
      authorId,
      likes,
      page,
      limit = "6",
    } = req.query

    const skip = (Number(page) - 1) * Number(limit)

    const criteria = []
    if (categoryId) criteria.push({ categoryId: categoryId })
    if (title) criteria.push({ title: new RegExp(`${title as string}`, "i") })
    if (status) criteria.push({ status })
    if (authorId) criteria.push({ authorId })
    if (likes) criteria.push({ likes })

    const query = criteria.length > 0 ? { $and: criteria } : {}
    const code = await Code.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .populate("authorId", ["fullName", "avatar"])

    const totalDocuments = await Code.countDocuments(query)
    const lastPage = Math.ceil(totalDocuments / Number(limit))
    res.status(200).json({
      data: { data: code, lastPage },
      message: "Get code template successfully",
    })
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
