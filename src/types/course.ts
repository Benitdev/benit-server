export type TCourse = {
  _id: string
  title: string
  slug: string
  description: string
  categoryId: string
  image: string
  type: string
  likes: any[]
  views: number
  courseChapters: TChapter[]
  createAt: string
  updateAt: string
}

export type TChapter = {
  index: number
  title: string
  description: string
  lessons: (TLesson | string)[]
}

export type TLesson = {
  _id: string
  title: string
  slug: string
  videoID: string
  duration: string
}
