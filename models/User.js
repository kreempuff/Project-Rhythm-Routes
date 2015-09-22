var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var findOrCreate = require('mongoose-findorcreate');

var UserSchema = new mongoose.Schema({
  spotifyId: String,
  username: {type: String, lowercase: true, unique: true},
  firstname: {type: String},
  lastname: {type: String},
  passwordHash: {type: String},
  email: {type: String, unique:true, lowercase: true},
  age: Number,
  dateJoined: Date,
  saltRef: {type: mongoose.Schema.Types.ObjectId, ref: "Salts"}
})


UserSchema.plugin(findOrCreate);



UserSchema.methods.setPassword = function (password, salt) {
  //this.salt needs to be set and retrieved in the create user route to create user password
  var passwordHash = crypto.pbkdf2Sync(password, salt, 1500, 64).toString("hex");
  this.passwordHash = passwordHash;

}

UserSchema.methods.checkPassword = function(password, salt) {
//this.salt needs to be set and retrieved in the create user route to create user password
var checkPasswordHash = crypto.pbkdf2Sync(password, salt, 1500, 64).toString("hex");
return this.passwordHash === checkPasswordHash;
}

UserSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 36500);
  return jwt.sign({
    username: this.username,
    id : this._id,
    email: this.email,
    exp: exp.getTime() / 1000
  }, "_secretpath");
}

mongoose.model('User', UserSchema);
