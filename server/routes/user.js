/*=====================================================
These routes will handle all sign ins and sign outs
EXPORT: user routes
IMPORT: authentication functions
=====================================================*/

const passport = require("passport");


const jwt = require("jwt-simple");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const crypto = require('crypto')

//sql connection
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "shiftprojectfake",
  insecureAuth: true
});

//helper functions for setting and validating passwords

const _setPassword = password => {
  let salt = crypto.randomBytes(16).toString("hex")
  let saltHash = {
    salt,
    hash: crypto
      .pbkdf2Sync(password, salt, 1000, 64, null)
      .toString("hex")
  };
  return saltHash
};

module.exports = app => {

  app.get("/me", (req, res) => {
    res.send("/me")
    //
  })

  app.post('/register', (req,res) => {
    let {email, username, password, 
      size ,
      imgUrl ,firstName,
      lastName } = req.body;
      //not the cleanest, but I need to make undefined values equal 'null' for sql purposes
      size ? size : size = 'null';
      imgUrl ? imgUrl : imgUrl = 'null';
      firstName ? firstName : firstName = 'null';
      lastName ? lastName : lastName = 'null';

    if(!email || !username || !password){
      throw Error('Missing account information')
    }
    let passHashObject = _setPassword(password)

    let sql = `INSERT into users VALUES(null,'${firstName}','${lastName}',"${email}","${imgUrl}","${size}","${passHashObject.hash.toString()}","${passHashObject.salt.toString()}")`;    
    pool.query(sql,
    (err,results,fields) => {
      res.json(results);
    })

  })

  app.post('/me/upload', (req, res) => {
    //
  })

  app.post("/logout", (req, res) => {
    //
  });

  app.post('/login', (req, res) => {
    //
  })
}