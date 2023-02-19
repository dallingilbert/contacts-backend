const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  rewardsMember: Boolean,
  age: Number,
  birthday: String,
  userID: String
});

module.exports = mongoose.model('User', userSchema);
