import Order from '../models/orderModal.js';  // Assuming you have an Order model

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const userOdersController =async (req, res) => {
    console.log(req.body,'fhfg')
    const { userId } = req.userId;
    try {
      const orders = await Order.find({ customerId: userId });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}  
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
