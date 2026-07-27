const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: 'Please provide shipping address and payment method' });
    }

    const order = new Order({
      user: req.user.id,
      shippingAddress,
      paymentMethod,
      totalPrice: totalPrice || 150.00 // Fallback or dynamic calculation
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrderItems, getMyOrders };