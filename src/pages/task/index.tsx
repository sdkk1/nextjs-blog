import type { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { useState, useEffect } from 'react'

import TaskForm from '@/components/pages/task/TaskForm'
import ListItem from '@/components/pages/task/TaskListItem'
import { urlTaskList } from '@/constants/Task'
import { getTaskList } from '@/lib/Task'
import { TaskListItem } from '@/types/task'

const Task = ({
  initialTasks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [selectedTask, setSelectedTask] = useState<TaskListItem>({
    id: 0,
    title: '',
    createdAt: '',
  })

  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data: tasks, mutate } = useSWR<TaskListItem[]>(urlTaskList, fetcher, {
    fallbackData: initialTasks,
  })

  useEffect(() => {
    mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Task</title>
      </Head>

      <main>
        <TaskForm
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          mutate={mutate}
        />
        <ul className='mb-10'>
          {tasks &&
            tasks.map(task => (
              <ListItem
                key={task.id}
                task={task}
                setSelectedTask={setSelectedTask}
                mutate={mutate}
              />
            ))}
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
  const initialTasks = await getTaskList()

  return {
    props: {
      initialTasks,
    },
    revalidate: 5,
  }
}

export default Task
