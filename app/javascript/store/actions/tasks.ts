import { setNotice } from '../actions'

import { ThunkDispatch } from 'redux-thunk'
import { Task, addTaskSuccess, editTaskSuccess, deleteTaskSuccess } from '../types/tasks'
import { AppActions } from '../types';
import { ADD_TASK_SUCCESS, EDIT_TASK_SUCCESS, DELETE_TASK_SUCCESS } from '../types/constants';

// exposed to component
export function addTask (data: Omit<Task, "id" | "is_complete">) {
  console.log("Hello from addTask!");
  const fetch_options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application\/json",
    },
    body: JSON.stringify(data)
  }

  return async (dispatch: ThunkDispatch<{}, {}, AppActions>) => {
    const response = await fetch("", fetch_options);
    const data = await response.json();
    if (data.error) {
      dispatch(setNotice(data.error))
    } else {
      dispatch(addTaskSuccess(data))
    }
  }
}

function addTaskSuccess(payload: Task): addTaskSuccess {
  return {
    type: ADD_TASK_SUCCESS,
    payload
  }
}

// exposed to component
export function editTask(data: Omit<Task, "id" | "is_complete">) {
  console.log("Hello from edit task!")
  const fetch_options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application\/json",
    },
    body: JSON.stringify(data)
  }
  return async (dispatch: ThunkDispatch<{}, {}, AppActions>) => {
    const response = await fetch("some_url", fetch_options);
    const data = await response.json();
    if (data.error) {
      dispatch(setNotice(data.error))
    } else {
      dispatch(editTaskSuccess(data))
    }
  }
}

function editTaskSuccess(payload: Task): editTaskSuccess {
  return {
    type: EDIT_TASK_SUCCESS,
    payload
  }
}

// exposed to component
export function deleteTask(id: number) {
  console.log("hello from deleteTask")
  const fetch_options: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application\/json",
    },
  }

  return async (dispatch: ThunkDispatch<{}, {}, AppActions>) => {
    const response = await fetch("some_url", fetch_options)
    const data = await response.json()
    if (data.error) {
      dispatch(setNotice(data.error))
    } else {
      dispatch(deleteTaskSuccess(id))
    }
  }
}

function deleteTaskSuccess(id: number): deleteTaskSuccess{
  return {
    type: DELETE_TASK_SUCCESS,
    id
  }
}