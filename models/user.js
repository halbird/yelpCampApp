var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");     // add passport local plugin

var UserSchema = new mongoose.Schema({      // user model
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);   // takes the wheel and adds in methods to user

module.exports = mongoose.model("User", UserSchema);