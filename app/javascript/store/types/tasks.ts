import { ADD_TASK_SUCCESS, EDIT_TASK_SUCCESS, DELETE_TASK_SUCCESS } from "./constants"

// overall
export interface Task {
  id: number,
  task_name: string,
  task_desc?: string,
  due_date?: string,
  due_time?: string
  is_complete: boolean
}

// to update state
export type addTaskSuccess = {
  type: typeof ADD_TASK_SUCCESS,
  payload: Task
}

export type editTaskSuccess = {
  type: typeof EDIT_TASK_SUCCESS,
  payload: Task
}

export type deleteTaskSuccess = {
  type: typeof DELETE_TASK_SUCCESS,
  id: number
}

// addTaskFailed / editTaskFailed / deleteTaskFailed will call setNotice

// for types/index
export type AllTaskActions = addTaskSuccess | editTaskSuccess | deleteTaskSuccess