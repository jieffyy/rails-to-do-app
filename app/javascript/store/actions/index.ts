import { SET_NOTICE, SELECT_SUBAPP } from "../types/constants";
import { setNotice, selectSubApp } from "../types";

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