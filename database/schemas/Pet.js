const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  description: { // Description of the pet
    type: String,
    required: true,
  },
  image: { // URL of the pet's image
    type: String,
    required: true,
  },
  shelter: { // Name of the shelter or kennel
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Pet', PetSchema);
