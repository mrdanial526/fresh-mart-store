const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Connect before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Routes
app.use("/api/auth", require("../server/routes/authRoutes"));
app.use("/api/products", require("../server/routes/productRoutes"));
app.use("/api/orders", require("../server/routes/orderRoutes"));

// Test Route
app.get("/api", (req, res) => {
  res.json({
    message: "API is running...",
  });
});

module.exports = app;