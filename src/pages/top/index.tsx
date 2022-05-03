import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'

const Top: NextPage = () => {
  const cookie = new Cookie()
  const router = useRouter()

  const logout = () => {
    const options = { path: '/' }
    cookie.remove('access_token', options)
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Top</title>
      </Head>

      <div className='mb-10'>
        <Link href='/blog'>
          <a className='mr-8 inline-block h-10 w-56 rounded bg-indigo-500 text-center leading-10 text-white hover:bg-indigo-600'>
            Visit Blog by SSG + ISR
          </a>
        </Link>
        <Link href='/task'>
          <a className='ml-8 inline-block h-10 w-56 rounded bg-gray-500 text-center leading-10 text-white hover:bg-gray-600'>
            Visit Task by ISR + CSR
          </a>
        </Link>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  )
}

export default Top
