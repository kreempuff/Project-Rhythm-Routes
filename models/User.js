var mongoose = require('mongoose');
var crypto = require('crypto');


var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  firstname: {type: String},
  lastname: {type: String},
  password: {type: String},
  email: {type: String, unique:true, lowercase: true},
  age: Number
})

mongoose.model('User', UserSchema);
