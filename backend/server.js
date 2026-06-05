require('dotenv').config(); // Loaded first!
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 8080;
const MONGO_URI = process.env.MONGODB_URI;

// 1. Core Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Traffic Tracker Middleware (MUST be placed BEFORE your routes!)
app.use((req, res, next) => {
    console.log(`📡 Incoming Request: ${req.method} to ${req.url}`);
    next(); 
});

// 3. Mount Your Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 4. Connect to Database & Start Listening
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('🚀 Connected seamlessly to MongoDB');
    // This establishes the physical network port connection and keeps it alive!
    app.listen(PORT, () => {
        console.log(`🏋️  Gym SaaS Engine actively listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });
