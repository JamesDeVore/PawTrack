import {STREAM_DATA} from '../actions/types'

export const streamReducer = (state = {incomingData:"",lat:"", lng:""} , action) => {
  let {type, payload} = action
  switch (type) {
    case STREAM_DATA:
    if (payload !== '$'){
      return {
        ...state,
        incomingData: state.incomingData.concat(payload)
      }
    } else {
      latGrabber(state.incomingData, state)
      state.incomingData = "";
      return state
    }
    default:
      return state
  }
}
const latGrabber = (dataString, state) => {
  let points = dataString.split(",")
  points[0] = points[0].replace(/(\r\n|\n|\r)/gm, "");
  state.lat = points[0];
  state.lng = points[2];
}