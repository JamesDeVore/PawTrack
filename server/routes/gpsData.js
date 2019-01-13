/*=====================================================
These routes will be the querying routes for any and all GPS data
EXPORT Data routes
=====================================================*/

const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "shiftprojectfake",
  insecureAuth: true
});


module.exports = app => {

  app.get('/data/byID', async (req,res) => {
    let {userID} = req.query;

    pool.query(`SELECT * from gpsdata WHERE userID = '${userID}'`, (err, results, fields) => {
      res.json(results)
    })
  })
  app.get('/data/byDate', (req,res) => {
    //still requires a userID
    let {userID, date} = req.query;
    pool.query(`SELECT * from gpsdata WHERE currentdate = '${date}' AND userID = '${userID}'`, (err,results,fields) => {
      res.json(results)
    })
  })
}