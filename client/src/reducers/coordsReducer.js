import {FETCH_COORDS} from '../actions/types'

export const coordsReducer = (state =[] , action) => {
  let {type,payload} = action
  switch (type) {
    case FETCH_COORDS:
      return [...state,...payload]
    default:
      return state
  }
}