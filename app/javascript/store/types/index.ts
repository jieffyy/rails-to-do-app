import { User, AllUserActions } from './users'
import { Task, AllTaskActions } from './tasks'
import { SET_NOTICE, SELECT_SUBAPP, FETCH_API_SUCCESS } from './constants'

export type AppState = {
  notice: string,
  user: User | null,
  sub_app: 'all' | 'add' | 'search' | 'task_edit' | 'task_show',
  csrf: string,
  task: null | Task
  task_xs: Task[],
  ref_xs: Task[]
}

export type fetchAPISuccess = {
  type: typeof FETCH_API_SUCCESS,
  user: User,
  task_xs: Task[]
}

export type setNotice = {
  type: typeof SET_NOTICE,
  message: string
}

export type selectSubApp = {
  type: typeof SELECT_SUBAPP,
  sub_app: 'all' | 'add' | 'search' | 'task_edit' | 'task_show'
}

export type AppActions = AllUserActions | AllTaskActions | fetchAPISuccess | setNotice | selectSubApp