import express from 'express';
import { getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { userOdersController } from '../controllers/orderController.js';

const router = express.Router();
router.use(authenticateToken);
router.get('/', getOrders);
router.put('/status/:id', updateOrderStatus);
router.get('/user', userOdersController);
export default router;
