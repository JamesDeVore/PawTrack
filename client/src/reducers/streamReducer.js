import {STREAM_DATA} from '../actions/types'

export const streamReducer = (state = {incomingData:"",lat:"", lng:"", speed:["Speed",0]} , action) => {
  let {type, payload} = action
  switch (type) {
    case STREAM_DATA:
    if (payload !== '$'){
      return {
        ...state,
        incomingData: state.incomingData.concat(payload)
      }
    } else {
      let newState = {
        speed: ["Speed", 0,0]
      }
      let newStateWithData = latGrabber(state.incomingData, newState)
      newStateWithData.incomingData = "";

      state = newStateWithData;
      return state;
    }
    default:
      return state
  }
}
const latGrabber = (dataString, state) => {
  let points = dataString.split(",")
  points[0] = points[0].replace(/(\r\n|\n|\r)/gm, "");
  state.lat = points[0];
  if(parseFloat(points[5]) !== NaN){
    state.speed.pop()
  state.speed = state.speed.concat(parseFloat(points[5]))
  }
  state.lng = points[2];
  return state
}

