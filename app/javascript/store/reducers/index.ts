import {initalState} from '../configureStore'

import { AppActions } from '../types'
import { SET_NOTICE, SELECT_SUBAPP, LOGIN_ACTION_SUCCESS, ADD_TASK_SUCCESS, EDIT_TASK_SUCCESS, DELETE_TASK_SUCCESS, FETCH_API_SUCCESS, TOGGLE_COMPLETE_SUCCESS, SET_TASK, HANDLE_SEARCH } from '../types/constants'
import Tasks from '../../components/tasks/Tasks'

export const rootReducer = (state = initalState, action: AppActions) => {
  switch(action.type) {

    case FETCH_API_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
        task_xs: action.task_xs,
        ref_xs: action.task_xs
      })

    case SET_NOTICE:
      return Object.assign({}, state, {notice: action.message});
    case SELECT_SUBAPP:
      return Object.assign({}, state, {sub_app: action.sub_app});

    case LOGIN_ACTION_SUCCESS:
      return Object.assign({}, state, {
        notice: "Welcome!",
        user: action.payload
      })
    
    case ADD_TASK_SUCCESS:
      return Object.assign({}, state, {
        notice: "New Task Added!",
        task: null,
        task_xs: state.task_xs.concat([action.payload])
      })
    case EDIT_TASK_SUCCESS:
      return Object.assign({}, state, {
        notice: "Successfully edited task!",
        task: null,
        task_xs: state.task_xs.map(task => {
          task.id === action.payload.id ? action.payload: task
        })
      })
    case DELETE_TASK_SUCCESS:
      return Object.assign({}, state, {
        notice: "Task deleted succcessfully",
        task: null,
        task_xs: state.task_xs.filter(task => task.id !== action.id)
      })
    case TOGGLE_COMPLETE_SUCCESS:
      return Object.assign({}, state, {
        notice: "Task updated accordingly",
        task_xs: state.task_xs.map(task => {
          if (task.id === action.id) {
            return Object.assign({}, task,
              {is_complete: !task.is_complete});
          } else {
            return task;
          }
        })
      });
    case SET_TASK:
      return Object.assign({}, state, {
        task: action.payload,
        sub_app: "task_show"
      });

    case HANDLE_SEARCH:
      return Object.assign({}, state, {
        task_xs: action.payload === ""
          ? state.ref_xs
          : state.task_xs.filter(task => task.task_name.includes(action.payload))
      });
    
    case LOGIN_ACTION_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload
      })

    default:
      return state;
  }
}