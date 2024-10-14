const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dtkyr0fbb",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRETKEY
});


module.exports = cloudinary;