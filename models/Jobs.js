var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var JobsSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  category: {
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
    required: true
  },
  // part time | full time | freelance
  time: {
    type: String,
    required: true
  }, 
  url: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }

  //Terminar con link (favs)
  // logo: {
  //   type:
  // }

}, {
  timestamps: { 
      createdAt: 'created_at' 
  }
});

// This creates our model from the above schema, using mongoose's model method
var Jobs = mongoose.model("Jobs", JobsSchema);

// Export the Article model
module.exports = Jobs;
