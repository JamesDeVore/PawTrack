/*=====================================================
Libraries to be used
=====================================================*/
const express = require('express');
const app = express();
const mysql = require('mysql');

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "shiftprojectfake",
//   insecureAuth: true
// });

//initialize the server
/*=====================================================
TODO: make routes, set up database queries, authentication
and a whole lot more
=====================================================*/

app.get("/me", (req,res) => {
  //
})

app.get('/me/data', (req,res) => {
  //
})

app.post('/me/upload',(req,res) => {
  //
})

app.post("/logout", (req, res) => {
  //
});

app.post('/login', (req,res) => {
  //
})

app.listen(8000, () => console.log('Listening on port 8000'))