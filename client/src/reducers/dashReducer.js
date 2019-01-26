
import { FETCH_DASH } from '../actions/types'
 const dashReducer = (state = {}, action) => {
  let {payload,type} = action
  switch (type) {
    case FETCH_DASH:
    console.log(payload)
      return {...state, ...payload}
    default:
      return state
  }
}
export default dashReducer