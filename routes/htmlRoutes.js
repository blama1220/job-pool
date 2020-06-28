const db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Jobs.find({}).lean().then(function(data){

      res.render("index", {
        jobs : data
      });
    })
   

  });
  
};