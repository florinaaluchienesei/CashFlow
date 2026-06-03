const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const savingGoalRoutes = require('./routes/savingGoals');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const savingsRoutes = require('./routes/savings');
const accountRoutes = require('./routes/accounts');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/savings', savingsRoutes);
app.use('/accounts', accountRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/saving-goals', savingGoalRoutes);

app.get('/', (req, res) => {
  res.send('API working');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});