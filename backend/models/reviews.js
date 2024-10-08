const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: false },
  rating: Number,
  Comment: String,
  createdAt: { type: Date, required: false, default: new Date() },
});

const Review = mongoose.model('reviews', reviewsSchema);

module.exports = Review;