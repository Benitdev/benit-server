import { CourseLearned } from "./../models/CourseLearned"
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Request, Response } from "express"

import { Course } from "@src/models/Course"
import { Post } from "@src/models/Post"
import { User } from "@src/models/User"
import { Code } from "@src/models/Code"

export const statistical = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query

    const totalUser = await User.estimatedDocumentCount({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
    const totalPost = await Post.estimatedDocumentCount({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
    const totalCode = await Code.estimatedDocumentCount({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })

    const courses = await Course.find({ status: "published" })

    const topCourses = []

    for (let i = 0; i < courses.length; i++) {
      const registeredUsers = await User.find({
        "courseLearned.course": courses[i]._id,
      })
      topCourses.push({
        registeredUsers,
        course: courses[i],
      })
    }

    const topViewPosts = await Post.find().sort({ views: -1 }).limit(7)

    return res.status(200).json({
      data: { totalPost, totalUser, totalCode, topCourses, topViewPosts },
    })
  } catch (err) {
    res.status(500).json(err)
  }
}
