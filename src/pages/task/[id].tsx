import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useSWR from 'swr'
import { useEffect } from 'react'

import TaskDetail from '@/components/pages/task/TaskDetail'
import { urlTaskListItem } from '@/constants/Task'
import { getTaskListIds, getTaskListItem } from '@/lib/Task'
import { toCamelObject } from '@/lib/Utils'
import { TaskListItem } from '@/types/task'

type Props = {
  initialTask: TaskListItem
}
type Params = {
  id: string
} & ParsedUrlQuery

const Task = ({
  initialTask,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data: task, mutate } = useSWR<TaskListItem>(
    `${urlTaskListItem}${initialTask?.id}/`,
    fetcher,
    {
      fallbackData: initialTask,
    }
  )

  let convertTask: TaskListItem = {} as TaskListItem
  if (task) {
    convertTask = toCamelObject(task) as TaskListItem
  }

  useEffect(() => {
    mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (router.isFallback || !convertTask) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Task</title>
      </Head>
      {convertTask && <TaskDetail task={convertTask} />}
    </>
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getTaskListIds()

  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const id = params?.id ?? ''
  const initialTask = await getTaskListItem(id)

  return {
    props: {
      initialTask,
    },
    revalidate: 5,
  }
}

export default Task
