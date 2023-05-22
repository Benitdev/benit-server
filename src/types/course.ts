export type TCourse = {
  _id: string
  title: string
  slug: string
  description: string
  categoryID: string
  image: string
  type: string
  tags: string[]
  likes: any[]
  comments: any[]
  views: number
  courseChapters: TChapter[]
  createAt: string
  updateAt: string
}

type TChapter = {
  index: number
  title: string
  description: string
  lessons: (TLesson | string)[]
  // lessonIDs: string[]
}

export type TLesson = {
  _id: string
  title: string
  slug: string
  videoID: string
  duration: string
}
