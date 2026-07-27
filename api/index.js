const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Cache MongoDB connection across serverless invocations
let cachedDb = null;
async function connectDB() {
  if (cachedDb) return;
  const conn = await mongoose.connect(process.env.MONGO_URI);
  cachedDb = conn;
}

// Connect to the database before handling any request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Import your existing backend routes from the server folder
try {
  const productRoutes = require('../server/routes/productRoutes');
  const authRoutes = require('../server/routes/authRoutes');
  const orderRoutes = require('../server/routes/orderRoutes');
  
  app.use('/api/products', productRoutes);
  app.use('/api/users', authRoutes);
  app.use('/api/orders', orderRoutes);
} catch (err) {
  console.log("Route loading error:", err);
}

// Test endpoint
app.get('/api', (req, res) => {
  res.json({ message: "API is running successfully!" });
});

module.exports = app;