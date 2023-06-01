const mongoose = require('mongoose');

const weeklyStatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  minutes: {
    type: Number,
    required: true,
  },
});

const WeeklyStats = mongoose.model('WeeklyStats', weeklyStatsSchema);

module.exports = WeeklyStats;
