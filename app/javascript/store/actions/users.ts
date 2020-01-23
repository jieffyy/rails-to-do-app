import { setNotice } from "../actions"

import { User, loginActionSuccess } from "../types/users"
import { LOGIN_ACTION_SUCCESS } from "../types/constants"
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from "../types"

// exposed to component
// success -> update state
// failed -> setNotice
export function loginAction(data: {username: string, password: string}) {
  console.log("Hello from loginAction!");
  console.log(data);
  const fetch_options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application\/json",
      // "Authorization"
    },
    body: JSON.stringify(data)
  }  
  return async (dispatch: ThunkDispatch<{}, {}, AppActions>) => {
    const response = await fetch("/login/", fetch_options);
    const data = await response.json();
    if (data.error) {
      dispatch(setNotice(data.error))
    }
    else {
      dispatch(loginActionSuccess(data))
    }
  }
}

function loginActionSuccess(payload: User): loginActionSuccess {
  return {
    type: LOGIN_ACTION_SUCCESS,
    payload
  }
}

// exposed to component
// success/failed -> setNotice
export function registerUser(data: {username: string, password: string, cfm_password: string}) {
  console.log("Hello from registerUser!");
  const fetch_options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application\/json"
    },
    body: JSON.stringify(data)
  }
  return async (dispatch: ThunkDispatch<{}, {}, AppActions>) => {
    const response = await fetch("/users/", fetch_options)
    const data = await response.json()
    return dispatch(setNotice(data.message))
  }
}
