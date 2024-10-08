const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
  products: [{
    producId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: false },
    quantity: Number,
    number: Number,
  }],
  totalAmount: Number,
  createdAt: { type: Date, required: false, default: new Date() },
});


const Order = mongoose.model('orders', ordersSchema);

module.exports = Order;