import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <div className='flex min-h-screen flex-col items-center justify-center bg-gray-800 font-mono text-sm text-gray-600'>
    <main className='flex w-screen flex-1 flex-col items-center justify-center'>
      {children}
    </main>

    <footer className='flex h-12 w-full items-center justify-center border-t'>
      @K.N
    </footer>
  </div>
)

export default Layout
