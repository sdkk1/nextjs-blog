import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react'
import { KeyedMutator } from 'swr'
import Cookie from 'universal-cookie'

import { urlTaskCrud } from '@/constants/Task'
import { TaskListItem } from '@/types/task'

type Props = {
  selectedTask: TaskListItem
  setSelectedTask: Dispatch<SetStateAction<TaskListItem>>
  mutate: KeyedMutator<TaskListItem[]>
}

const TaskForm = ({ selectedTask, setSelectedTask, mutate }: Props) => {
  const cookie = new Cookie()

  const create = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch(urlTaskCrud, {
        method: 'POST',
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      })

      if (res.status === 401) {
        throw 'JWT Token not valid'
      }

      if (res.ok) {
        setSelectedTask({
          id: 0,
          title: '',
          createdAt: '',
        })
        mutate()
      }
    } catch (err) {
      alert(err)
    }
  }
  const update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch(`${urlTaskCrud}${selectedTask.id}/`, {
        method: 'PUT',
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      })

      if (res.status === 401) {
        throw 'JWT Token not valid'
      }

      if (res.ok) {
        setSelectedTask({
          id: 0,
          title: '',
          createdAt: '',
        })
        mutate()
      }
    } catch (err) {
      alert(err)
    }
  }
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedTask({ ...selectedTask, title: e.target.value })
  }

  return (
    <>
      <form onSubmit={selectedTask.id === 0 ? create : update}>
        <input
          className='mb-8 px-2 py-1 text-black'
          type='text'
          value={selectedTask.title}
          onChange={onChange}
        />
        <button
          type='submit'
          className='ml-2 rounded bg-gray-500 px-2 py-1 text-sm uppercase hover:bg-gray-600'
        >
          {selectedTask.id === 0 ? 'create' : 'update'}
        </button>
      </form>
    </>
  )
}

export default TaskForm
