/*=====================================================
Libraries to be used
=====================================================*/
const express = require('express');
const app = express();
const userRoutes = require('./routes/user')
const dataRoutes = require('./routes/gpsData')



//initialize the server
/*=====================================================
TODO: make routes, set up database queries, authentication
and a whole lot more
=====================================================*/

userRoutes(app);
dataRoutes(app);

app.listen(8000, () => console.log('Listening on port 8000'))

module.exports = app;