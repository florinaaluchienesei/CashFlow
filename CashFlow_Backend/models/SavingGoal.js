const mongoose = require('mongoose');

const savingGoalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  targetAmount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    enum: ['RON', 'EUR'],
    required: true
  },

  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('SavingGoal', savingGoalSchema);