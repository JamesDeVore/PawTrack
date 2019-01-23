/*=====================================================
These routes will be the querying routes for any and all GPS data
EXPORT Data routes
=====================================================*/
const Run = require ('../Models/Run')
const mongoose = require('mongoose');


exports.getGPSData = async (req,res) => {

}

exports.getGPSCoords = async (req,res) => {
  let run = await Run.findOne({});
  let coordsArray = [];
  run.data.forEach(element => {
    let longLatArray = [];
    longLatArray.push(element.longitude);
    longLatArray.push(element.latitude);
    coordsArray.push(longLatArray)
  })
  res.send(coordsArray)
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
