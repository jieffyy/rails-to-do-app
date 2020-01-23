import { User, AllUserActions } from './users'
import { SET_NOTICE, SELECT_SUBAPP } from './constants'

export type AppState = {
  notice: string,
  user: User | null,
  sub_app: 'all' | 'add' | 'search',
  csrf: string
}

export type setNotice = {
  type: typeof SET_NOTICE,
  message: string
}

export type selectSubApp = {
  type: typeof SELECT_SUBAPP,
  sub_app: 'all' | 'add' | 'search'
}

export type AppActions = AllUserActions | setNotice | selectSubApp