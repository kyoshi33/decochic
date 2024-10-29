const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
  name: String,
  categorie: String,
  description: String,
  price: Number,
  image: String,
  video: String,
  dimension: String,
  couleur: String,
  matiere: String,
  rating: Number,
  motscles: [String],
  avis: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
    rating: Number,
    comment: String,
  }],
});

const Product = mongoose.model('products', productsSchema);

module.exports = Product;