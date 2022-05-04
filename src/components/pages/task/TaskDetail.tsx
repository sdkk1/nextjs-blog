import Link from 'next/link'

import { TaskListItem } from '@/types/task'

type Props = {
  task: TaskListItem
}

const TaskDetail = ({ task }: Props) => {
  return (
    <>
      <p className='m-4'>ID: {task.id}</p>
      <p className='mb-8 text-xl font-bold'>{task.title}</p>
      <p className='mb-8 px-10'>{task.createdAt}</p>
      <Link href='/task'>
        <a className='cursor-pointer  text-blue-500 hover:border-b hover:border-blue-500'>
          Back to Task Page
        </a>
      </Link>
    </>
  )
}

export default TaskDetail
