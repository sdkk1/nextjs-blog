import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import Head from 'next/head'

import PostDetail from '@/components/pages/blog/PostDetail'
import { getPostListIds, getPostListItem } from '@/lib/Post'
import { PostListItem } from '@/types/post'

type Props = {
  post: PostListItem
}
type Params = {
  id: string
} & ParsedUrlQuery

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  if (router.isFallback || !post) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      {post && <PostDetail post={post} />}
    </>
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getPostListIds()

  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const id = params?.id ?? ''
  const post = await getPostListItem(id)

  return {
    props: {
      post,
    },
    revalidate: 5,
  }
}

export default Post
