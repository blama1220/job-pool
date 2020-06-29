const db = require("../models");
module.exports = function(app) {
  //Homepage
  app.get("/", function(req, res) {
    
    db.Admin.findOne({}).then(function(data){
      var pagination = data.pagination;
      db.Jobs.find({}).lean().then(function(dataJob){
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

  app.get("/login", function(req, res) {
    res.render("login");
  })

  app.get("/session", function(req, res){
    console.log('Cookies: ');
    // res.cookie('name', 'express').send('cookie set'); //set
    // console.log('Cookies: ', req.cookies); // get
    // res.clearCookie('foo'); //delete

  })






  
};