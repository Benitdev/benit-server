import type { Request, Response } from "express"

import { Code } from "@src/models/Code"
import { TCodeTemplate } from "@src/types"

export const getCodeTemplate = async (req: Request, res: Response) => {
  try {
    const code = await Code.find().sort({ createdAt: -1 })
    res
      .status(200)
      .json({ data: code, message: "Get code template successfully" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const createCodeTemplate = async (req: Request, res: Response) => {
  try {
    const data = req.body as TCodeTemplate
    await Code.create(data)
    res.status(200).json({ message: "Add code template successfully!" })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const updateCodeTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = req.body as TCodeTemplate
    await Code.updateOne({ _id: id }, data)
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
