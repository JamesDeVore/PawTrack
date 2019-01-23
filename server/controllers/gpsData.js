/*=====================================================
These routes will be the querying routes for any and all GPS data
EXPORT Data routes
=====================================================*/
const Run = require ('../Models/Run')
const mongoose = require('mongoose');
const {calculateTotalDistance} = require('./utils')


exports.getAllGPSData = async (req,res) => {
//this will include the most recent, be sure to shift it later
  let allRuns = await Run.find({}, {}, { sort: { 'date': -1 } });
  let allFormattedRuns = allRuns.map(run => _formatData(run));
  res.send(allFormattedRuns)
}

exports.getMostRecentData = async (req,res) => {
  let run = await Run.findOne({}, {}, { sort: { 'date': -1 } });
  let formattedData = _formatData(run)
  
  res.send(formattedData)
}

const _formatData = (run) => {
  let coordsArray = [];
  let speedArray = [];
  let timeArray = [];
  let altitudeArray = [];
  let date;
  run.data.forEach(element => {
    let longLatArray = [];
    longLatArray.push(element.longitude);
    longLatArray.push(element.latitude);
    coordsArray.push(longLatArray);
    speedArray.push(element.speed);
    if(element.altitude > 60){
    altitudeArray.push(element.altitude)}
    timeArray.push(element.unixTime)
  });
  //need to remove weird dollar sign thing
  
  //GPS coords are finished processing
  let runData = {
    date: run.date,
    coordinates: coordsArray,
    speed: speedArray,
    altitude: altitudeArray,
    time: timeArray
  }
  return runData
}

exports.uploadData = async (req,res) => {
  let giantString = req.body;
  giantString = giantString.replace(/(\r\n\t|\n|\r\t)/gm, "");
  allDataArray = giantString.split('$');
  //the first point is always screwy, so I dump it
  allDataArray.shift()
  allDataArray.pop();
  let formattedArray = allDataArray.map(dataPoint => {
    return dataPoint.substring(4);
  })
  let newRun = new Run({
    date: new Date(),
    data:[]
  })
  formattedArray.forEach(dataPoint => {
    
    let singlePointArray = dataPoint.split(',')
    let GPSData = {
      latitude: parseFloat(singlePointArray[0]),
      latCardinal: singlePointArray[1],
      longitude: parseFloat(singlePointArray[2]),
      longCardinal: singlePointArray[3],
      altitude: parseFloat(singlePointArray[4]),
      speed: parseFloat(singlePointArray[5]),
      unixTime: parseInt(singlePointArray[6])
    }
    newRun.data.push(GPSData)
  })
  await newRun.save()
}
