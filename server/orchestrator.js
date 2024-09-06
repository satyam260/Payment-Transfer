const Log = require('./models/Log');
const User = require('./models/User');

const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Orchestrator = {
  // Main orchestrator to handle debit and credit
  run: async (transactionId, userIdFrom, userIdTo, amount) => {
    try {
      console.log(`Starting transaction: ${transactionId}`);
      
      // Check if the debit step has been completed
      const debitLog = await Log.findOne({ transactionId, operation: 'debit' });
      if (!debitLog || debitLog.status !== 'completed') {
        console.log('Before debit');
        await Orchestrator.debit(transactionId, userIdFrom, amount);
      } else {
        console.log('Debit already completed, skipping to credit');
      }

      // Check if the credit step has been completed
      const creditLog = await Log.findOne({ transactionId, operation: 'credit' });
      if (!creditLog || creditLog.status !== 'completed') {
        console.log('Before credit');
        await Orchestrator.credit(transactionId, userIdTo, amount);
      } else {
        console.log('Credit already completed');
      }

      console.log('Transaction process completed');
    } catch (error) {
      console.error(`Error in transaction ${transactionId}:`, error);
    }
  },

  // Debit operation
  debit: async (transactionId, userId, amount) => {
    // Check if debit has already been completed (idempotency)
    const log = await Log.findOne({ transactionId, operation: 'debit' });
    if (log && log.status === 'completed') {
      console.log('Debit already completed');
      return;
    }

    // Find user by userId and validate balance
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    if (user.balance < amount) {
      throw new Error(`Insufficient balance for user ${userId}`);
    }

    // Simulate delay (e.g., for external service processing)
    await simulateDelay(10000);

    // Deduct amount from user's balance
    user.balance -= amount;
    await user.save();

    // Log the debit operation in MongoDB
    await Log.updateOne(
      { transactionId, operation: 'debit' },
      { $set: { transactionId, operation: 'debit', status: 'completed', details: { userId, amount } } },
      { upsert: true }  // Insert if not present, update if present
    );

    console.log(`Debit of ${amount} from user ${userId} completed`);
  },

  // Credit operation
  credit: async (transactionId, userId, amount) => {
    // Check if the credit operation has already been completed (idempotency)
    const log = await Log.findOne({ transactionId, operation: 'credit' });
    if (log && log.status === 'completed') {
      console.log('Credit already completed');
      return;
    }

    // Find recipient by userId
    const recipient = await User.findOne({ userId });
    if (!recipient) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Simulate delay (e.g., for external service processing)
    await simulateDelay(10000);

    // Add amount to recipient's balance
    recipient.balance += amount;
    await recipient.save();

    // Log the credit operation in MongoDB using upsert to avoid duplicates
    await Log.updateOne(
      { transactionId, operation: 'credit' },  // Match on transactionId and operation
      { $set: { transactionId, operation: 'credit', status: 'completed', details: { userId, amount } } },  // Update or set fields
      { upsert: true }
    );

    console.log(`Credit of ${amount} to user ${userId} completed`);
  }
};

module.exports = Orchestrator;