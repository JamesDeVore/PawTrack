/*=====================================================
These routes will handle all sign ins and sign outs
EXPORT: user routes
IMPORT: authentication functions
=====================================================*/
module.exports = app => {

  app.get("/me", (req, res) => {
    res.send("/me")
    //
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