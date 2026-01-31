const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird', 'rabbit', 'fish']
  },
  breed: {
    type: String
  },
  age: {
    type: Number,
    min: 0
  },
  adopted: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);
