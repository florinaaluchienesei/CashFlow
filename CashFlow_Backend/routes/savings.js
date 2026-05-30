const express = require('express');
const router = express.Router();
const Saving = require('../models/Saving');

// GET savings for user
router.get('/:userId', async (req, res) => {
  try {
    const savings = await Saving.find({ userId: req.params.userId });

    const ronSavings = savings
      .filter(s => s.currency === 'RON')
      .reduce((sum, s) => sum + s.amount, 0);

    const eurSavings = savings
      .filter(s => s.currency === 'EUR')
      .reduce((sum, s) => sum + s.amount, 0);

    res.json({
      savings,
      ronSavings,
      eurSavings
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// ADD saving
router.post('/', async (req, res) => {
  try {
    const { amount, currency, date, userId } = req.body;

    const saving = new Saving({
      amount,
      currency,
      date,
      userId
    });

    await saving.save();

    res.json({
      message: 'Saving added',
      saving
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// DELETE saving
router.delete('/:id', async (req, res) => {
  try {
    await Saving.findByIdAndDelete(req.params.id);
    res.json({ message: 'Saving deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;