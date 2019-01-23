import {FETCH_COORDS, FETCH_RECENT} from '../actions/types'

export const mostRecentDataReducer = (state = {} , action) => {
  let {type,payload} = action
  switch (type) {
    case FETCH_RECENT:
      return {...state,...payload}
    default:
      return state
  }
}