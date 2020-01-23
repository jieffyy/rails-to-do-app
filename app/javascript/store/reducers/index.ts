import {initalState} from '../configureStore'

import { AppActions } from '../types'
import { SET_NOTICE, SELECT_SUBAPP } from '../types/constants'

export const rootReducer = (state = initalState, action: AppActions) => {
  switch(action.type) {

    case SET_NOTICE:
      return Object.assign({}, state, {notice: action.message});
    case SELECT_SUBAPP:
      return Object.assign({}, state, {sub_app: action.sub_app});

    default:
      return state;
  }
}