var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var JobsSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  company: {
    type: String,
    require: true
  },
  // part time | full time | freelance
  time: {
    type: String,
    require: true
  }, 
  url: {
    type: String,
    require: false
  },
  description: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  //Terminar con link (favs)
  // logo: {
  //   type:
  // }

});

// This creates our model from the above schema, using mongoose's model method
var Jobs = mongoose.model("Jobs", JobsSchema);

// Export the Article model
module.exports = Jobs;
