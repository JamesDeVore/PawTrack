const User = require('../controllers/user')
const GPSData = require('../controllers/gpsData')

// const passportService = require("./services/passport");
// const passport = require("passport");

// const requireAuth = passport.authenticate("jwt", { session: false });
// const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.post('/register', User.registerUser);
  app.get('/me/data', GPSData.getAllGPSData);
  app.get('/me/recentData', GPSData.getMostRecentData)
  app.get('/me/dashboard', GPSData.getDashData)
  app.post('/me/upload', GPSData.uploadData)
}