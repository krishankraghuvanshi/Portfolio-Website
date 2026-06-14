const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);
// Mount for Vercel experimentalServices which preserves the route prefix
app.use('/_/backend/api', apiRoutes);

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Connect to MongoDB (handles both local and serverless Vercel environments)
if (mongoose.connection.readyState === 0) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB successfully.'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Only listen if not running on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the Express API
module.exports = app;
