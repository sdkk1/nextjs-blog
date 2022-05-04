import { urlPostList, urlPostListItem } from '@/constants/Post'
import { toCamelArray, toCamelObject } from '@/lib/Utils'
import { PostListItem } from '@/types/post'

export const getPostList = async () => {
  const res = await fetch(urlPostList)
  const posts = await res.json()
  const convertData: PostListItem[] = toCamelArray(posts) as PostListItem[]
  return convertData
}

export const getPostListIds = async () => {
  const posts = await getPostList()
  const ids = posts.map(post => {
    return {
      params: {
        id: post.id.toString(),
      },
    }
  })
  return ids
}

export const getPostListItem = async (id: string) => {
  const res = await fetch(`${urlPostListItem}${id}/`)
  const post = await res.json()
  const convertData: PostListItem = toCamelObject(post) as PostListItem
  return convertData
}
