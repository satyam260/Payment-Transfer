const express = require('express');
const app = express();
const paymentRouter = require('./routes/paymentRouter');
const cors = require('cors');

require("dotenv").config();
const connectDB = require('./config/db');
connectDB();
    
app.use(express.json());
app.use(cors());
app.use('/api', paymentRouter);

const port = 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
