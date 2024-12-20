const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  civilite: String,
  firstName: String,
  name: String,
  email: String,
  password: String,
  token: String,
  adresses: [{
    adresse: String,
    codePostal: Number,
    ville: String,
  }],
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
  commandes: [{
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'orders', required: false },
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products', required: false }],
    createdAt: { type: Date, required: false, default: new Date() },
    totalAmount: { type: Number, required: false, default: 0 },
  }],
  avis: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: false },
    rating: Number,
    comment: String,
  }],
});

const User = mongoose.model('users', usersSchema);

module.exports = User;