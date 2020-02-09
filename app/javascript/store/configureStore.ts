import { createStore, compose, applyMiddleware } from 'redux'
import { rootReducer } from './reducers/index'
import thunk from 'redux-thunk'

import { AppState } from './types'

export const initalState: AppState = {
  notice: "",
  user: null,
  sub_app: 'all',
  csrf: (document.querySelector("meta[name=csrf-token]") as HTMLMetaElement).content,
  task: null,
  task_xs: [],
  ref_xs: []
}

export const store = createStore(rootReducer, initalState, applyMiddleware(thunk))

/*
const composedEnhancers = compose(
  applyMiddleware(thunk), 
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export const store = createStore(rootReducer, initalState, composedEnhancers);
*/

