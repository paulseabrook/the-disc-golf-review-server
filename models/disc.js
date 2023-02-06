// require mongoose
const mongoose = require('mongoose');
const reviewSchema = require('./review');

// Getting the Schema from Mongoose
const Schema = mongoose.Schema;

// Creating a new disc Schema
const discSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // If you are just declaring the type of the field you do not need to open an object to set multiple options. So:
    // manufacturer: String
    manufacturer: {
      type: String,
    },
    plastic: {
      type: String,
    },
    type: {
      type: String,
    },
    speed: {
      type: Number,
    },
    glide: {
      type: Number,
    },
    turn: {
      type: Number,
    },
    fade: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

// Creating a Mongoose Model called Disc
// Collection will be called discs
const Disc = mongoose.model('Disc', discSchema);

// Exporting Disc model to use elsewhere
module.exports = Disc;
