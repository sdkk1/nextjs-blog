import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Blog: NextPage = () => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <Link href='/top'>
        <a className='cursor-pointer  text-blue-500 hover:border-b hover:border-blue-500'>
          Back to Top Page
        </a>
      </Link>
    </>
  )
}

export default Blog
