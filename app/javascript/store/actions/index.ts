import { ThunkDispatch } from 'redux-thunk'

import { SET_NOTICE, SELECT_SUBAPP, FETCH_API_SUCCESS } from "../types/constants";
import { setNotice, selectSubApp, fetchAPISuccess, AppActions } from "../types";
import { User } from "../types/users";
import { Task } from "../types/tasks";

// export for general usage
export function setNotice(message: string): setNotice {
  return {
    type: SET_NOTICE,
    message    
  }
}

export function setSubApp(sub_app: 'all' | 'add' | 'search'): selectSubApp {
  return {
    type: SELECT_SUBAPP,
    sub_app
  }
}

export function fetchAPI() {
  console.log("entered function for fetch API")
  const fetch_options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application\/vnd.api+json",
    }
  }

  return async (dispatch: ThunkDispatch<{}, {}, AppActions>) => {
    console.log("front of fetch")
    fetch("/tasks/", fetch_options)
      .then(response => response.json())
      .then(data => {
        console.log("fetching API!")
        const user = data.user ? data.user : null
        const task_xs = data.tasks ? data.tasks : [];
        dispatch(fetchAPISuccess(user, task_xs))
      })
  }
}

function fetchAPISuccess(user: User, task_xs: Task[]): fetchAPISuccess {
  return {
    type: FETCH_API_SUCCESS,
    user,
    task_xs
  }
}

// `export function fetchAPI(): {} {
//   console.log("Fetching API!");
//   const fetch_options: RequestInit = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application\/vnd.api+json",
//       // "Authorization"
//     }
//   }  
//   return async (dispatch: ThunkDispatch<{}, {}, AppActions>) => {
//     const response = await fetch("/api/tasks/", fetch_options);
//     const data = await response.json();
//     if (data.error) {
//       dispatch(setNotice(data.error))
//     }
//     else {
//       const user = data.user;
//       const task_xs = data.task_xs;
//       dispatch(fetchAPISucess(user, task_xs))
//     }
//   }
// }

// function fetchAPISucess(user: User, task_xs: Task[]): fetchAPISuccess {
//   return {
//     type: FETCH_API_SUCCESS,
//     user,
//     task_xs
//   }
// }`