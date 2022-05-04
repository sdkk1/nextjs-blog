import type { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import PostListItem from '@/components/pages/blog/PostListItem'
import { getPostList } from '@/lib/Post'

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <main>
        <ul className='mb-10'>
          {posts &&
            posts.map(post => <PostListItem key={post.id} post={post} />)}
        </ul>
        <Link href='/top'>
          <a className='cursor-pointer  text-blue-500 hover:border-b hover:border-blue-500'>
            Back to Top Page
          </a>
        </Link>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await getPostList()

  return {
    props: {
      posts,
    },
    revalidate: 5,
  }
}

export default Blog
