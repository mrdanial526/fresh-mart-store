const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@store.com' });
    if (existingAdmin) {
      console.log('Admin account already exists!');
      process.exit();
    }

    const adminUser = new User({
      name: 'Store Admin',
      email: 'admin@store.com',
      password: 'adminpassword123', // Your user model's pre-save hook will hash this automatically
      isAdmin: true
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('Email: daniyalr358@gmail.com');
    console.log('Password: admin123');
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();