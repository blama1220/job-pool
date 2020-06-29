var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var CategorySchema = new Schema({
  name: {
      type: String,
      required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Category = mongoose.model("Category", CategorySchema);

// Export the Article model
module.exports = Category;