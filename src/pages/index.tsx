import type { NextPage } from 'next'
import Head from 'next/head'

import AuthForm from '@/components/pages/home/AuthForm'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      <AuthForm />
    </>
  )
}

export default Home
