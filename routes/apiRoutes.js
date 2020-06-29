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
     
      if(data != null){
        if(data.length != 0){
          res.json({
            msg: "This username or email already exists in the database"
          })
        } 
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
    if(req.cookies.user){
      var objectSchema = {
        user: req.cookies.user.user, //done from cookies
        category: data.category, //done from data sent from webpage
        location: data.location, //done from data sent from webpage
        position: data.position, //done from data sent from webpage
        company: data.company, //done from data sent from webpage
        time: data.time, //done from data 
        //url: data.url, //done from cookies
        description: data.description, //done from data sent from webpage
        email: req.cookies.user.email //done from cookies
      }
    } else {
      res.json({msg: "Database error"})
    }

    db.Jobs.create(objectSchema).then(function(data){
     res.json({msg: "Job created successfully"})
    }).catch(function(err){
      console.log(err)
      res.json({msg: "Database error"})
      
    });

  });

  //Create Authentification Route
  app.post("/login", function(req, res) {
    db.Users.findOne({
      username: req.body.username
    }).then(function(data){
      if(data != null){
        if(req.body.password === data.password){
          var userData = {
            user: data.username,
            type: data.type,
            email: data.email
          }
          res.cookie("user", userData, {maxAge: 36000000});
          res.json({
            msg: "Credentials are correct, redirecting to homepage.",
          })
        } else {
          res.json({
            msg: "Either username or password is not correct."
          })
        }
      } else {
        res.json({
          msg: "Either username or password is not correct."
        })
      }
    }).catch(function(err){
      res.json({msg: "Database error"})
      console.log(err)
    });
  })


  //Create admin paginator
  app.post("/admin", function(req, res) {
    var categories = ["Health","Technology","Engenieering","Education", "Marketing","Law","Design"];
    for(let i = 0; i < categories.length; i++) {
      db.Category.create({
        name: categories[i]
      }).then(function (data) {
        console.log(categories[i] + " created succesfully");
      }).catch(function (err) {
        console.log("Error occurred");
        console.log(err);
      })
    }
    db.Admin.create(req.body).then(function(data){
      res.json(data);
    }).catch(function(err){
      res.json({msg: "Database error"})
      console.log(err);
    });

  });

  
  

}





