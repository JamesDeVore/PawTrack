/*=====================================================
These functions will handle all sign ins and sign outs
EXPORT: user routes
IMPORT: authentication functions
=====================================================*/
const crypto = require("crypto");
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

//helper functions for setting and validating passwords, and user validation

const _setPassword = password => {
  let salt = crypto.randomBytes(16).toString("hex");
  let saltHash = {
    salt,
    hash: crypto.pbkdf2Sync(password, salt, 1000, 64, null).toString("hex")
  };
  return saltHash;
};

exports.registerUser = async (req, res) => {
  let {
    email,
    username,
    password,
    size,
    imgUrl,
    firstName,
    lastName
  } = req.body;
  //not the cleanest, but I need to make undefined values equal 'null' for sql purposes
  size ? size : (size = "null");
  imgUrl ? imgUrl : (imgUrl = "null");
  firstName ? firstName : (firstName = "null");
  lastName ? lastName : (lastName = "null");
  //check for missing required information
  if (!email || !username || !password) {
    throw Error("Missing account information");
  }
  // ensure that a user with the same email doesn't already exist
  pool.query(`SELECT * from users`, (err, results, fields) => {
    if (results.length > 0) {
      return res.send('invalid/in use email')
    } else {
      let passHashObject = _setPassword(password);
      let sql = `INSERT into users VALUES(null,'${firstName}','${lastName}',"${email}","${imgUrl}","${size}","${passHashObject.hash.toString()}","${passHashObject.salt.toString()}")`;
      pool.query(sql, (err, results, fields) => {
        res.json(results);
      });
    }
  })
};

