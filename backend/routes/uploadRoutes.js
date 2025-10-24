import express from 'express';
import upload from '../config/cloudinary.js'; 
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('image'), (req, res) => {
  // 'upload.single('image')' middleware parses the file.
  // 'image' must match the form-data key from the frontend.
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  // req.file.path contains the secure URL from Cloudinary
  res.status(201).json({
    message: 'Image uploaded successfully',
    url: req.file.path,
  });
});

export default router;