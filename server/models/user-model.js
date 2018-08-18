const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  title: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new Schema({
  username: String,
  password: String,
  userData: [dataSchema]
});

const User = mongoose.model('user', userSchema);

module.exports = User;