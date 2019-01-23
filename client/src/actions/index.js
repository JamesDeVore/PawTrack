import{STREAM_DATA, UPLOAD_DATA, FETCH_COORDS} from './types';

export const fetchCoords = () => async dispatch => {
  console.log("fetching?")
 let data = await fetch('http://localhost:8000/me/coords')
 let recievedData = await data.json();
 console.log(recievedData)
 let parsedArray = recievedData.map(element => {
   let newDataArray = [];
   newDataArray.push(parseFloat(element[0]['$numberDecimal']));
   newDataArray.push(parseFloat(element[1]['$numberDecimal']));
    return newDataArray
 })
 dispatch({type:FETCH_COORDS,payload:parsedArray})
  
}

export const streamData = value => dispatch => {
  dispatch({type:STREAM_DATA, payload:value});
}

export const uploadData = activityData => dispatch => {
  fetch('http://localhost:8000/me/upload', {
    method:'POST',
    body:JSON.stringify({
      data:activityData
    })
  })
}