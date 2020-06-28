var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var AdminSchema = new Schema({
  pagination: {
      type: Number,
      required: true
  }
}, {
  timestamps: { 
      createdAt: 'created_at' 
  }
});

// This creates our model from the above schema, using mongoose's model method
var Admin = mongoose.model("Admin", AdminSchema);

// Export the Article model
module.exports = Admin;