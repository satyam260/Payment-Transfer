// const mongoose = require('mongoose');

// const logSchema = new mongoose.Schema({
//     transactionId: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     status: String,

//     timestamp: {
//         type: Date, 
//         default: Date.now 
//     },
    
//     details: Object
// });

// const Log = mongoose.model('Log', logSchema);

// module.exports = Log;

const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  transactionId: String,
  operation: String,  // 'debit' or 'credit'
  status: String,     // 'completed' or 'pending'
  timestamp: { type: Date, default: Date.now },
  details: Object     // Store user and amount details
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;
