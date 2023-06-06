export type TPost = {
  _id: string
  title: string
  description: string
  slug: string
  content: string
  image: string
  tags: string[]
  authorId: string
  likes: any[]
  comments: any[]
  views: number
  createAt: string
  updateAt: string
}

export type TPostCate = {
  _id: string
  title: string
  slug: string
  description: string
  type: string
}
