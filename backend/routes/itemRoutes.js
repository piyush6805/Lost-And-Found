import express from 'express';
import {
  createItem,
  getAllOpenItems,
  getItemById,
  closeItemCase,
} from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createItem).get(getAllOpenItems);
router.route('/:id').get(getItemById);
router.route('/:id/close').put(protect, closeItemCase);

export default router;