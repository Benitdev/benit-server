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
  courserChapters: TChapter[]
  createAt: string
  updateAt: string
}

type TChapter = {
  index: number
  title: string
  description: string
  lesson: {
    title: string
    videoID: string
  }[]
}