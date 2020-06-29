const db = require("../models");
module.exports = function(app) {
  //Homepage 
  app.get("/", function(req, res) {
    db.Category.find({}).lean().then(function(categoryData) {
    
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
              usertype: req.cookies.user.type,
              categories: categoryData,
              canUpload: req.cookies.user.type === 'Employer'
            });
          } else {
          res.render("index", {
            jobArrays: finalData,
            categories: categoryData
          });
        }

        }).catch(function(err){
          console.log(err)
        })
      }).catch(function(err){
        console.log(err)
      })
    }).catch(function(err) {
      console.log("Error occured in database");
      console.log(err);
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
    db.Category.find({}).lean().then(function(categoryData) {
      if(req.cookies.user != undefined && req.cookies.user.type === 'Employer'){
        res.render("upload", {
          username: req.cookies.user.user,
          usertype: req.cookies.user.type,
          email: req.cookies.user.email,
          categories: categoryData,
        });
      } else if(req.cookies.user && req.cookies.user.type != 'Employer') {
      res.render("notemployer");
    } else {
      res.render("notlogged");
    }
  }).catch((err)=>{
    console.log('Error in database');
    console.log(err);
  })
});

//Get jobs by category
app.get("/jobs/:category", function(req, res) {
  var category = req.params.category;
  db.Category.find({}).lean().then(function(categoryData) {
    db.Admin.findOne({}).then(function(data){
      var pagination = data.pagination;
      db.Jobs.find({
        category: category
      }).sort({created_at: 'desc'}).lean().then(function(dataJob){
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
            usertype: req.cookies.user.type,
            categories: categoryData,
            canUpload: req.cookies.user.type === 'Employer'
          });
        } else {
        res.render("index", {
          jobArrays: finalData,
          categories: categoryData
        });
      }

      }).catch(function(err){
        console.log(err)
      })
    }).catch(function(err){
      console.log(err)
    })
  }).catch(function(err) {
    console.log("Error occured in database");
    console.log(err);
  })

});

app.get("*", function(req, res) {
  res.render("404");
});







  
};