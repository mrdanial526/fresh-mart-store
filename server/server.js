const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Error Handling Middlewares (Must be registered after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const PORT = process.env.PORT || 5000;

// Only call app.listen if running locally, NOT on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// CRITICAL: Export the app so Vercel's serverless function can read it
module.exports = app;