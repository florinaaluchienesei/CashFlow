const express = require('express');
const router = express.Router();
const SavingGoal = require('../models/SavingGoal');

// GET goals for user
router.get('/:userId', async (req, res) => {
  try {
    const goals = await SavingGoal.find({ userId: req.params.userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// ADD goal
router.post('/', async (req, res) => {
  try {
    const { name, targetAmount, currency, userId } = req.body;

    const goal = new SavingGoal({
      name,
      targetAmount,
      currency,
      userId
    });

    await goal.save();

    res.json({
      message: 'Saving goal added',
      goal
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// DELETE goal
router.delete('/:id', async (req, res) => {
  try {
    await SavingGoal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Saving goal deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;