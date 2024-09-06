const express = require('express');
const paymentRouter = express.Router();
const Orchestrator = require('../orchestrator');

paymentRouter.post('/payment', async (req, res) => {
  const { transactionId, userIdFrom, userIdTo, amount } = req.body;

  try {
    await Orchestrator.run(transactionId, userIdFrom, userIdTo, amount);
    res.status(200).json({ message: 'Payment process started' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Payment failed!!', err });
  }
});

module.exports = paymentRouter;
