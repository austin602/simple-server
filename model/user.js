//load in the mongoose nodejs package.
var mongoose = require ('mongoose');

//grab the schema object from mongoose.
var Schema = mongoose.Schema;

//create a schema for the user.
var userSchema = new Schema ({
    username: String,
    password: String
});
//take the user schema object and create a user model object for working with the mongodb.
var User = mongoose.model ('User', userSchema);

module.exports = User;
