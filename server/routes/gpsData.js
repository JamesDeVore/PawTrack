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

  app.get('/data/all', async (req,res) => {
    pool.query('SELECT * from gpsdata WHERE userID = 1', (err, results, fields) => {
      res.json(results)
    })
  })
  app.get('/data/lat', (req,res) => {
    res.send("hi")
  })
}