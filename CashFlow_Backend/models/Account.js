const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ['personal', 'child', 'business'],
    default: 'personal'
  },

  balanceRON: {
    type: Number,
    default: 0
  },

  balanceEUR: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model('Account', accountSchema);