const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// BALANCE for one user
router.get('/balance/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });

    const ronTransactions = transactions.filter(t => t.currency === 'RON');
    const eurTransactions = transactions.filter(t => t.currency === 'EUR');

    const ronIncome = ronTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const ronExpense = ronTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const eurIncome = eurTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const eurExpense = eurTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    res.json({
      ronIncome,
      ronExpense,
      ronBalance: ronIncome - ronExpense,
      eurIncome,
      eurExpense,
      eurBalance: eurIncome - eurExpense
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET all transactions for one user
router.get('/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// ADD transaction
router.post('/', async (req, res) => {
  try {
    const { title, amount, type, date, userId, currency } = req.body;

    const transaction = new Transaction({
      title,
      amount,
      type,
      date,
      userId,
      currency
    });

    await transaction.save();
    res.json({ message: 'Transaction added', transaction });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// DELETE transaction
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;