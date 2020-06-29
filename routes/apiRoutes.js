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
    var data = req.body

    var objectSchema = {
      username: data.username,
      password: data.password,
      email: data.email,
      type: data.type
    }
    db.Users.findOne({
      $or: [{email: objectSchema.email}, {username: objectSchema.username}]
    }).then(function(data){
     
      if(data.length != 0){
        res.json({
          msg: "This username or email already exists in the database"
        })
      } else {
        db.Users.create(objectSchema).then(function(userData){
          res.json({
            msg: "Welcome to job pool, " + userData.username
          })
         }).catch(function(err){
           res.json({msg: "Database error"})
           console.log(err)
         });
      }
    })

  })


  //Create Job
  app.post("/jobs", function(req, res) {
    var data = req.body

    var objectSchema = {
      user: data.user,
      category: data.category,
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

  //Create admin paginator
  app.post("/admin", function(req, res) {
    db.Admin.create(req.body).then(function(data){
      res.json(data)
    })
  })




}
