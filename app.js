
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use('/api/payment', paymentRoutes);

// Setup PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.set('db', pool);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
