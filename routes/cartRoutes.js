import express from 'express';
import { addToCart, getCart, updateCart, placeOrder } from '../controllers/cartController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { deleteFromCart } from '../controllers/cartController.js';

const router = express.Router();
router.use(authenticateToken);
router.post('/', addToCart);
router.get('/', getCart);
router.put('/item', updateCart);
router.post('/place-order', placeOrder);
router.delete('/item/:itemId',deleteFromCart)
export default router;
