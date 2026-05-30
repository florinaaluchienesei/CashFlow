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

  currency: {
    type: String,
    enum: ['RON', 'EUR'],
    required: true,
    default: 'RON'
  },

  category: {
    type: String,
    enum: ['Food', 'Transport', 'Bills', 'Shopping', 'Salary', 'Other'],
    required: true,
    default: 'Other'
  },

  date: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);