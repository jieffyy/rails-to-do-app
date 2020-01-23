import { LOGIN_ACTION_SUCCESS, LOGIN_ACTION } from './constants'

// overall
export interface User {
  username: string
  is_admin: boolean
}

// actions
export type loginActionSuccess = {
  type: typeof LOGIN_ACTION_SUCCESS,
  payload: User
}

// loginActionFailed, registerActionSuccess, registerAction Failed will call setNotice

// for types/index
export type AllUserActions = loginActionSuccess