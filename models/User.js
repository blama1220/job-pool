var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var UserSchema = new Schema({

    username: {
        type: "String",
        required: true
    },
    password: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true
    },
    type: {
        type: "String",
        required: true
    },
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
var User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;
