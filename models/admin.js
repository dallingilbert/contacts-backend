const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: String,
  email: String,
  shoppingCart: Object,
  rewardsMember: Boolean,
  age: Number,
  birthday: String,
  priviliges: Boolean
});

module.exports = mongoose.model('Admin', adminSchema);
