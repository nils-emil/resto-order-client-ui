const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//simple schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 255
  },
  organizationId: {
    type: Schema.Types.ObjectId, ref: 'Organization',
    required: true
  },
  //give different access rights if admin or not
  isAdmin: Boolean
});


//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
   //get the private key from the config file -> environment variable
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_KEY);
}

const User = mongoose.model('User', UserSchema);

//function to validate user
function validateUser(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
