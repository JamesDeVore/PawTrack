import{STREAM_DATA, UPLOAD_DATA, FETCH_DATA, FETCH_RECENT, FETCH_DASH} from './types';
import {calculateTotalDistance, calculateAvgSpeed, remove$FromCoords, sumTotalDistance, findFastestPace, sumTotalCalories, findAverageSpeed} from './utils'

//this is the data for the main page, it includes data totals and other aggregations
export const fetchDashData = () => async dispatch => {
  let data = await fetch('me/dashboard')
  let recievedData = await data.json();
  //now I need to parse the incoming data, because it comes with strange formatting (coords are 'Decimal$128)
  //./utils holds most of these functions
  recievedData.forEach(dataObj => {
    dataObj.coordinates = dataObj.coordinates.map(remove$FromCoords)
    dataObj.totalDistanceM = calculateTotalDistance(dataObj.coordinates)
    dataObj.averageSpeedMPH = calculateAvgSpeed(dataObj.speed)
    dataObj.pace = (dataObj.totalDistanceM / dataObj.averageSpeedMPH);
    //average expenditure for a dog
    dataObj.calories = Math.round(dataObj.totalDistanceM * 30);
  })
  let totals = {}
  totals.totalDistanceOverall = recievedData.reduce(sumTotalDistance,0);
  totals.fastestPaceActivity = recievedData.reduce(findFastestPace,{pace:0});
  totals.averageSpeed = recievedData.reduce(findAverageSpeed,0) / recievedData.length;
  totals.calories = recievedData.reduce(sumTotalCalories,0)
//send whole thing to reducer
  dispatch({ type: FETCH_DASH, payload: totals })

}

//this fetches all activities as an array of activity objects
export const fetchAllData = () => async dispatch => {
 let data = await fetch('me/data')
 let recievedData = await data.json();
 //similar formatting to dashData
 recievedData.forEach(dataObj => {
   dataObj.coordinates = dataObj.coordinates.map(remove$FromCoords)
   dataObj.totalDistanceM = calculateTotalDistance(dataObj.coordinates)
   dataObj.averageSpeedMPH = calculateAvgSpeed(dataObj.speed)
   dataObj.pace = (dataObj.totalDistanceM / dataObj.averageSpeedMPH);
   dataObj.calories = Math.round(dataObj.totalDistanceM * 30);
 })
 
 dispatch({type:FETCH_DATA,payload:recievedData})
  
}

export const fetchMostRecentData = () => async dispatch => {
//only returns the most recently added data object.
  let data = await fetch('me/recentData')
  let recievedData = await data.json();
   recievedData.coordinates = recievedData.coordinates.map(element => {
    let newDataArray = [];
    //removing strange mongo data formatting
    newDataArray.push(parseFloat(element[0]['$numberDecimal']));
    newDataArray.push(parseFloat(element[1]['$numberDecimal']));
    return newDataArray
  })
  recievedData.totalDistanceM = calculateTotalDistance(recievedData.coordinates)
  recievedData.averageSpeedMPH = calculateAvgSpeed(recievedData.speed)
  recievedData.calories = Math.round(recievedData.totalDistanceM * 30)
  dispatch({ type: FETCH_RECENT, payload: recievedData })
}

export const streamData = streamByte => dispatch => {
  let dataString = "";
  //this function reads the incoming bytes, and returns one character 
  //this actions happens A LOT
  let buffer = streamByte.target.value.buffer;
  var dataView = new DataView(buffer);
  let data = "";
  //bytes come in as buffer arrays, the length SHOULD be one, but this ensures no data is lost
  //the arduino send data so quickly, sometimes the buffer length is longer than one byte
  //in the case, an endline character can be missed. which is why data += character exists, to catch the extra data
  for (let i = 0; i < streamByte.target.value.byteLength; i++) {
    let byte = dataView.getInt8(i)
    let character = String.fromCharCode(byte);
    data += character;
  }
  //send that one char to the reducer
  dispatch({type:STREAM_DATA, payload:data});
}

export const uploadData = activityData => dispatch => {
  //send the huge string to the server
  fetch('me/upload', {
    method:'POST',
    body:JSON.stringify({
      data:activityData
    })
  })
}