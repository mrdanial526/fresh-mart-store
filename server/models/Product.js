const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Apparel', 'Accessories', 'Audio', 'Electronics', 'Home & Kitchen'] 
  },
  image: { type: String, required: true },
  countInStock: { type: Number, required: true, default: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);