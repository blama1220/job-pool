const db = require("../models");

module.exports = function(app) {

  
  //Get all jobs
  app.get("/jobs", function(req, res) {
    db.Jobs.find({}).then(function(data){
      res.json(data)
    });
  });

  //Get all users
  app.get("/users", function(req, res) {
    db.Users.find({}).then(function(data){
      res.json(data)
    });
  
  });

  //Create User
  app.post("/users", function(req, res) {
    console.log("le llegate")
    var data = req.body

    var objectSchema = {
      username: data.username,
      password: data.password,
      email: data.email,
      type: data.type
    }

    db.Users.create(objectSchema).then(function(data){
     res.json(data)
    }).catch(function(err){
      // res.send("Error en la data base")
      console.log(err)
    });
  })


  //Create Job
  app.post("/jobs", function(req, res) {
    var data = req.body

    var objectSchema = {
      user: data.user,
      location: data.location,
      position: data.position,
      company: data.company,
      time: data.time, 
      url: data.url,
      description: data.description,
      email: data.email
    }

    db.Jobs.create(objectSchema).then(function(data){
     res.json(data)
    }).catch(function(err){
      res.send("Error en la data base")
    });

  });




}
