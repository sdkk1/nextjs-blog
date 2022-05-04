import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import Cookie from 'universal-cookie'
import { KeyedMutator } from 'swr'

import { urlTaskCrud } from '@/constants/Task'
import { TaskListItem } from '@/types/task'

type Props = {
  task: TaskListItem
  setSelectedTask: Dispatch<SetStateAction<TaskListItem>>
  mutate: KeyedMutator<TaskListItem[]>
}

const TaskListItem = ({ task, setSelectedTask, mutate }: Props) => {
  const cookie = new Cookie()

  const deleteTask = async () => {
    try {
      const res = await fetch(`${urlTaskCrud}${task.id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      })

      if (res.status === 401) {
        throw 'JWT Token not valid'
      }

      if (res.ok) {
        mutate()
      }
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <div className='mb-4 flex justify-items-center'>
        <div>
          <span>{task.id}:</span>
          <Link href={`/task/${task.id}`}>
            <a className='ml-2 cursor-pointer text-white hover:bg-gray-700'>
              {task.title}
            </a>
          </Link>
        </div>
        <div className='ml-6'>
          <svg
            onClick={() => setSelectedTask(task)}
            className='float-left h-6 w-6 cursor-pointer'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            />
          </svg>
          <svg
            onClick={deleteTask}
            className='mr-2 h-6 w-6 cursor-pointer'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
        </div>
      </div>
    </>
  )
}

export default TaskListItem
