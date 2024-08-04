import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add your auth routes here
router.use(authenticateToken); // Protect these routes

export default router;
