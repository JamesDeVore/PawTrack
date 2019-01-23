import {FETCH_DATA} from '../actions/types'
//eventually data will be stores in the state using this reducer
//AFTER all authentication and all that


export const dataReducer = (state =[] , action) => {
  let {type,payload} = action
  switch (type) {
    case FETCH_DATA:
      return [...state,...payload]
    default:
      return state
  }
}
