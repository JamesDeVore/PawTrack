/*=====================================================
Libraries to be used
=====================================================*/
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose')
// const formidableMiddleware = require("express-formidable");

mongoose.connect(
  `mongodb://james:password1@ds245677.mlab.com:45677/pawtrack`,
  { useNewUrlParser: true }
);

//Routes
const routes = require('./routes/index')

app.use(cors());
// app.use(formidableMiddleware());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text())

//initialize the server
/*=====================================================
TODO: make routes, set up database queries, authentication
and a whole lot more
=====================================================*/

routes(app)

app.listen(8000, () => console.log('Listening on port 8000'))

module.exports = app;