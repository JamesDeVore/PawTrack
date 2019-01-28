import{STREAM_DATA, UPLOAD_DATA, FETCH_DATA, FETCH_RECENT, FETCH_DASH} from './types';
import {calculateTotalDistance, calculateAvgSpeed, remove$FromCoords} from './utils'



const sumTotalDistance = (total, currentVal) => {
  return total + parseFloat(currentVal.totalDistanceM)
}
const findFastestPace = (total, currentVal) => {
  if(currentVal.pace > total.pace) {
    return currentVal
  } else {
    return total
  }
}

const sumTotalCalories = (total, currentVal) => {
  return total + parseInt(currentVal.calories)
}

const findAverageSpeed = (total, currentVal) => {
  return total + parseFloat(currentVal.averageSpeedMPH)
}

export const fetchDashData = () => async dispatch => {
  let data = await fetch('http://localhost:8000/me/dashboard')
  let recievedData = await data.json();
  console.log(recievedData)
  recievedData.forEach(dataObj => {
    dataObj.coordinates = dataObj.coordinates.map(remove$FromCoords)
    dataObj.totalDistanceM = calculateTotalDistance(dataObj.coordinates)
    dataObj.averageSpeedMPH = calculateAvgSpeed(dataObj.speed)
    dataObj.pace = (dataObj.totalDistanceM / dataObj.averageSpeedMPH);
    dataObj.calories = Math.round(dataObj.totalDistanceM * 30);
  })
  let totals = {}
  totals.totalDistanceOverall = recievedData.reduce(sumTotalDistance,0);
  totals.fastestPaceActivity = recievedData.reduce(findFastestPace,{pace:0});
  totals.averageSpeed = recievedData.reduce(findAverageSpeed,0) / recievedData.length;
  totals.calories = recievedData.reduce(sumTotalCalories,0)


  dispatch({ type: FETCH_DASH, payload: totals })

}

export const fetchAllData = () => async dispatch => {
  console.log("fetching?")
 let data = await fetch('http://localhost:8000/me/data')
 let recievedData = await data.json();
 console.log(recievedData)
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
  console.log("fetching?")
  let data = await fetch('http://localhost:8000/me/recentData')
  let recievedData = await data.json();
   recievedData.coordinates = recievedData.coordinates.map(element => {
    let newDataArray = [];
    newDataArray.push(parseFloat(element[0]['$numberDecimal']));
    newDataArray.push(parseFloat(element[1]['$numberDecimal']));
    return newDataArray
  })
  recievedData.totalDistanceM = calculateTotalDistance(recievedData.coordinates)
  recievedData.averageSpeedMPH = calculateAvgSpeed(recievedData.speed)
  recievedData.calories = Math.round(recievedData.totalDistanceM * 30)
  console.log(recievedData)
  dispatch({ type: FETCH_RECENT, payload: recievedData })

}

export const streamData = streamByte => dispatch => {
  let dataString = "";
  //this function reads the incoming bytes
  // console.log(event)
  let buffer = streamByte.target.value.buffer;
  var dataView = new DataView(buffer);
  let data = "";
  for (let i = 0; i < streamByte.target.value.byteLength; i++) {
    let byte = dataView.getInt8(i)
    let character = String.fromCharCode(byte);
    data += character;
  }
  dispatch({type:STREAM_DATA, payload:data});
}

export const uploadData = activityData => dispatch => {
  fetch('http://localhost:8000/me/upload', {
    method:'POST',
    body:JSON.stringify({
      data:activityData
    })
  })
}