import express from 'express';
import {
  createItem,
  getAllOpenItems,
  getItemById,
} from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createItem).get(getAllOpenItems);
router.route('/:id').get(getItemById);

export default router;