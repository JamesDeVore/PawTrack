let faker = require('faker')
const express = require("express");
const app = express();
var mysql = require("mysql");


var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "shiftprojectfake",
  insecureAuth: true
});

app.get('/movie', async (req, res) => {
  let d = new Date();
  let hour = 5;
  let minute = 0;
  let second = 0;
for (let i=0; i<215; i++){
  let id = 1;

  let latMod = (Math.random().toString().slice(2,8)/1000000)
  let lngMod = (Math.random().toString().slice(2, 8)/1000000)


  let location = {
    latitude : 78 + latMod,
    latHead:"N",
    longitude: 32 + lngMod,
    longHead:"W",
    time:`13${minute}${second}`,
    date:`130119`,
    userId:1,
    speed:Math.floor(Math.random()*10),
    altitude:100 + Math.floor(Math.random()*4),
  }
  let sql = `INSERT into gpsdata (latitude,latHead,longitude,longHead,currenttime,currentdate,speed,altitude,userID) VALUES ('${location.latitude}','N',${location.longitude},'W','${location.time}','${location.date}','${location.speed}', '${location.altitude}', ${location.userId});`
  await pool.query(sql, function (error, results, fields) {
    // error will be an Error if one occurred during the query
    if (error) throw error;

    // results will contain the results of the query
    
    // fields will contain information about the returned results fields (if any)
  });
  second++
  if (second == 60) {
    minute++;
    second = 0;
  }
}
res.send("done")
});


app.listen(8000);