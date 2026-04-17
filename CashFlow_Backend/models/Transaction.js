const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  date: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    enum: ['RON', 'EUR'],
    required: true,
    default: 'RON'
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);