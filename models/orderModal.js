import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  status: { type: String, default: 'Pending' },  // Example statuses: Pending, Shipped, Delivered
  totalAmount: { type: Number, required: true }  // Add totalAmount field
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
