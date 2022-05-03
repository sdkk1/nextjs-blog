import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import { LockClosedIcon } from '@heroicons/react/solid'

import { urlCreateToken, urlCreateUser } from '@/constants/Auth'
import { jwtToken } from '@/types/auth'

const AuthForm = () => {
  const cookie = new Cookie()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const onSwitchtIsLogin = () => {
    setIsLogin(!isLogin)
  }

  const login = async () => {
    try {
      const res = await fetch(urlCreateToken, {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 400) {
        throw 'Authentication Failed'
      }
      if (res.status === 401) {
        throw 'Unauthorized'
      }

      if (res.ok) {
        const token: jwtToken = await res.json()
        const options = { path: '/' }
        cookie.set('access_token', token.access, options)
        router.push('/top')
      }
    } catch (err) {
      alert(err)
    }
  }
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isLogin) {
      login()
      return
    }

    try {
      const res = await fetch(urlCreateUser, {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 400) {
        throw 'Authentication Failed'
      }

      login()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <div className='w-full max-w-md space-y-8'>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
            {isLogin ? 'Login' : 'Sign up'}
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={onSubmit}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='-space-y-px rounded-md shadow-sm'>
            <div>
              <input
                className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                value={username}
                name='username'
                type='text'
                autoComplete='username'
                placeholder='Username'
                required
                onChange={onChangeUserName}
              />
            </div>
            <div>
              <input
                className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                value={password}
                name='password'
                type='password'
                autoComplete='current-password'
                placeholder='Password'
                required
                onChange={onChangePassword}
              />
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <div className='text-sm'>
              <span
                className='cursor-pointer font-medium text-white hover:text-indigo-500'
                onClick={onSwitchtIsLogin}
              >
                Change Mode?
              </span>
            </div>
          </div>

          <div>
            <button
              className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              type='submit'
            >
              <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <LockClosedIcon
                  className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  aria-hidden='true'
                />
              </span>
              {isLogin ? 'Login with JWT' : 'Create new user'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AuthForm
