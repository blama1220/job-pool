const db = require("../models");
const { count } = require("../models/User");

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
        res.render("index", {
          jobArrays: finalData
        });

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

  

  
};