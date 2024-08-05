import Cart from '../models/cartModal.js';  // Assuming you have a Cart model
import Order from '../models/orderModal.js';  // Assuming you have an Order model

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      const newCart = new Cart({ userId, items: [{ productId, quantity }] });
      await newCart.save();
    } else {
      cart.items.push({ productId, quantity });
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }); // Assuming userId is available from authentication
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId: req.userId, 'items.productId': productId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    );
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const placeOrder =   async (req, res) => {
    console.log(req.body)
    try {
      const userId = req.userId||req.body.userId; // Ensure req.userId is set properly by authentication middleware
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      
      // Calculate total amount
      const totalAmount = cart.items.reduce((sum, item) => {
        return sum + (item.productId.price * item.quantity);
      }, 0);
      
      // Create new order
      const order = new Order({
        userId,
        items: cart.items,
        totalAmount // Include the totalAmount in the order
      });
      
      await order.save();
      
      // Clear the cart
      cart.items = [];
      await cart.save();
      
      res.json(order);
    } catch (error) {
      console.error(error); // Log error details for debugging
      res.status(500).json({ message: 'Server error' });
    }
  };
  export const deleteFromCart = async (req, res) => {
    const { itemId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    try {
      // Get the cart of the user (assuming user ID is in token or session)
      const cart = await Cart.findOne({ 'items._id': itemId });
  
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      // Remove the item from the cart
      cart.items = cart.items.filter(item => item._id.toString() !== itemId);
  
      await cart.save();
      res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }