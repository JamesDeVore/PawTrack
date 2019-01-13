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


exports.getGPSData = (req,res) => {
  let { userID } = req.query;

pool.query(`SELECT * from gpsdata WHERE userID = '${userID}'`, (err, results, fields) => {
  res.json(results)
})
}