import express from 'express';
import { getInventory, addItem, updateItem, deleteItem, getProductById } from '../controllers/productController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getInventory);
router.get('/:id', getProductById);

router.post('/',authenticateToken ,addItem);
router.put('/:id',authenticateToken, updateItem);
router.delete('/:id',authenticateToken, deleteItem);

export default router;
