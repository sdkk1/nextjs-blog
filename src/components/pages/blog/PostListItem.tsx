import Link from 'next/link'

import { PostListItem } from '@/types/post'

type Props = {
  post: PostListItem
}

const PostListItem = ({ post }: Props) => {
  return (
    <div>
      <span>{post.id}:</span>
      <Link href={`/post/${post.id}`}>
        <a className='ml-2 cursor-pointer border-b border-gray-500 text-white hover:bg-gray-700'>
          {post.title}
        </a>
      </Link>
    </div>
  )
}

export default PostListItem
