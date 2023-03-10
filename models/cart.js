const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  cartItems: [Object],
  totalSavings: Number,
  cartTotal: Number
});

module.exports = mongoose.model('Cart', cartSchema);
