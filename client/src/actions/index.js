import{STREAM_DATA, UPLOAD_DATA, FETCH_DATA, FETCH_RECENT} from './types';
import {calculateTotalDistance, calculateAvgSpeed} from './utils'


export const fetchAllData = () => async dispatch => {
  console.log("fetching?")
 let data = await fetch('http://localhost:8000/me/data')
 let recievedData = await data.json();
 console.log(recievedData)
 recievedData.forEach(dataObj => {
   dataObj.coordinates = dataObj.coordinates.map(element => {
     let newDataArray = [];
     newDataArray.push(parseFloat(element[0]['$numberDecimal']));
     newDataArray.push(parseFloat(element[1]['$numberDecimal']));
     return newDataArray
   })
   dataObj.totalDistanceM = calculateTotalDistance(dataObj.coordinates)
   dataObj.averageSpeedMPH = calculateAvgSpeed(dataObj.speed)
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
  console.log(recievedData)
  dispatch({ type: FETCH_RECENT, payload: recievedData })

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