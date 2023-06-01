const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exerciseType: {
    type: String,
    required: true,
  },
  exerciseTime: {
    type: Number,
    required: true,
  },
  exerciseDate: {
    type: Date,
    default: Date.now,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
