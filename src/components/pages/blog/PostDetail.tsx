import Link from 'next/link'

import { PostListItem } from '@/types/post'

type Props = {
  post: PostListItem
}

const PostDetail = ({ post }: Props) => {
  return (
    <>
      <p className='m-4'>ID: {post.id}</p>
      <p className='mb-8 text-xl font-bold'>{post.title}</p>
      <p className='mb-8 px-10'>{post.createdAt}</p>
      <p className='mb-8 px-10'>{post.content}</p>
      <Link href='/blog'>
        <a className='cursor-pointer  text-blue-500 hover:border-b hover:border-blue-500'>
          Back to Blog Page
        </a>
      </Link>
    </>
  )
}

export default PostDetail
