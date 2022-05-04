import { urlTaskList, urlTaskListItem } from '@/constants/Task'
import { toCamelArray, toCamelObject } from '@/lib/Utils'
import { TaskListItem } from '@/types/task'

export const getTaskList = async () => {
  const res = await fetch(urlTaskList)
  const tasks = await res.json()
  const convertData: TaskListItem[] = toCamelArray(tasks) as TaskListItem[]
  return convertData
}

export const getTaskListIds = async () => {
  const tasks = await getTaskList()
  const ids = tasks.map(task => {
    return {
      params: {
        id: task.id.toString(),
      },
    }
  })
  return ids
}

export const getTaskListItem = async (id: string) => {
  const res = await fetch(`${urlTaskListItem}${id}/`)
  const task = await res.json()
  const convertData: TaskListItem = toCamelObject(task) as TaskListItem
  return convertData
}
