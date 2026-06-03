const express = require('express');
const router = express.Router();

const Account = require('../models/Account');

router.post('/', async (req, res) => {

  try {

    const account = new Account(req.body);

    await account.save();

    res.status(201).json(account);

  } catch (error) {

    res.status(500).json(error);

  }

});

router.get('/:userId', async (req, res) => {

  try {

    const accounts = await Account.find({
      userId: req.params.userId
    });

    res.json(accounts);

  } catch (error) {

    res.status(500).json(error);

  }

});

module.exports = router;