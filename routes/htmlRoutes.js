const db = require("../models");
module.exports = function(app) {
  //Homepage 
  app.get("/", function(req, res) {
    
    db.Admin.findOne({}).then(function(data){
      var pagination = data.pagination;
      db.Jobs.find({}).sort({created_at: 'desc'}).lean().then(function(dataJob){
        var count = 0;
        var finalData = [];
        var arrayToPush = [];

        for(var i = 0; i < dataJob.length; i++){
          arrayToPush.push(dataJob[i])
          count = count + 1;
          if(count >= pagination) {
            count = 0;
            finalData.push(arrayToPush);
            arrayToPush = [];
          }
        }
        if(arrayToPush != []) {
          finalData.push(arrayToPush)
        }
        if(req.cookies.user != undefined){
          res.render("loggedIndex", {
            jobArrays: finalData,
            username: req.cookies.user.user,
            usertype: req.cookies.user.type
          });
        } else {
        res.render("index", {
          jobArrays: finalData
        });
      }

      }).catch(function(err){
        console.log(err)
      })
    }).catch(function(err){
      console.log(err)
    })

  });

  //Sign Up
  app.get("/signup", function(req, res) {
    res.render("signup");
  })

  //Log In
  app.get("/login", function(req, res) {
    res.render("login");
  })

  //Upload Job
  app.get("/upload", function(req, res){
    if(req.cookies.user != undefined && req.cookies.user.type === 'Employer'){
      res.render("upload", {
        username: req.cookies.user.user,
        usertype: req.cookies.user.type,
        email: req.cookies.user.email
      });
    } else if(req.cookies.user && req.cookies.user.type != 'Employer') {
    res.render("notemployer");
  } else {
    res.render("notlogged");
  }
});

app.get("*", function(req, res) {
  res.render("404");
});







  
};