import { setNotice, setSubApp } from '../actions'

import { ThunkDispatch } from 'redux-thunk'
import { Task, addTaskSuccess, editTaskSuccess, deleteTaskSuccess, toggleCompleteSuccess, setTask, handleSearch } from '../types/tasks'
import { AppActions } from '../types';
import { ADD_TASK_SUCCESS, EDIT_TASK_SUCCESS, DELETE_TASK_SUCCESS, TOGGLE_COMPLETE_SUCCESS, SET_TASK, HANDLE_SEARCH } from '../types/constants';
import TaskForm from '../../components/tasks/TaskForm';

// exposed to component
export function addTask (csrf: string, data: Omit<Task, "id" | "is_complete">) {
  const fetch_options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application\/json",
      "X-CSRF-TOKEN": csrf,
    },
    body: JSON.stringify(data)
  }

  return async (dispatch: ThunkDispatch<{}, {}, AppActions>) => {
    const response = await fetch("/tasks/", fetch_options);
    const data = await response.json();
    if (data.error) {
      dispatch(setNotice(data.error))
    } else {
      dispatch(addTaskSuccess(data))
      dispatch(setSubApp('all'))  
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
export function editTask(id: number, csrf: string, data: Omit<Task, "id" | "is_complete">) {
  console.log("Hello from edit task!")
  const fetch_options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application\/json",
      "X-CSRF-TOKEN": csrf
    },
    body: JSON.stringify(data)
  }
  return async (dispatch: ThunkDispatch<{}, {}, AppActions>) => {
    const response = await fetch("/tasks/api/edit/" + id, fetch_options);
    const data = await response.json();
    if (data.error) {
      dispatch(setNotice(data.error))
    } else {
      dispatch(editTaskSuccess(data.id))
      window.location.href="../"
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
export function deleteTask(csrf: string, id: number) {
  const fetch_options: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application\/json",
      "X-CSRF-TOKEN": csrf
    },
  }

  return async (dispatch: ThunkDispatch<{}, {}, AppActions>) => {
    console.log("hello from deleteTask")
    const response = await fetch("tasks/" + id, fetch_options)
    const data = await response.json()
    if (data.error) {
      dispatch(setNotice(data.error))
    } else {
      dispatch(deleteTaskSuccess(data.id))
    }
  }
}

function deleteTaskSuccess(id: number): deleteTaskSuccess{
  return {
    type: DELETE_TASK_SUCCESS,
    id
  }
}

// exposed to component
export function toggleComplete(csrf: string, id: number) {
  const fetch_options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application\/json",
      "X-CSRF_TOKEN": csrf,
    },
    body: JSON.stringify({id})
  }

  return (dispatch: ThunkDispatch<{}, {}, AppActions>) => {
    fetch("tasks/is_complete/" + id, fetch_options)
      .then(response => response.json())
      .then(data => {
        data.error ? dispatch(setNotice(data.error)) : dispatch(toggleCompleteSuccess(data.id))
      })
  }
}

function toggleCompleteSuccess(id: number): toggleCompleteSuccess {
  return {
    type: TOGGLE_COMPLETE_SUCCESS,
    id
  }
}

// exposed to component
export function setTask(id: number) {
  const fetch_options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application\/vnd.api+json",
    }
  }

  return async (dispatch: ThunkDispatch<{}, {}, AppActions>) => {
    console.log("front of fetch")
    fetch("/tasks/api/" + id, fetch_options)
      .then(response => response.json())
      .then(data => {
        dispatch(setTaskSuccess(data))
      })
  }
}

function setTaskSuccess(payload: Task): setTask {
  return {
    type: SET_TASK,
    payload
  }
}

// exposed to component
export function handleSearch(payload: {search_name: string, search_tag: string}): handleSearch {
  return {
    type: HANDLE_SEARCH,
    payload
  }
}