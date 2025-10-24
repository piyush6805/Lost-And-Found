import asyncHandler from 'express-async-handler';
import Item from '../models/itemModel.js';

// @desc    Create a new item
// @route   POST /api/items
// @access  Private
const createItem = asyncHandler(async (req, res) => {
  const { title, description, category, postType, location } = req.body;

  if (!title || !description || !category || !postType) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  const item = new Item({
    title,
    description,
    category,
    postType,
    location,
    user: req.user._id, // Get user from 'protect' middleware
  });

  const createdItem = await item.save();
  res.status(201).json(createdItem);
});

// @desc    Fetch all 'open' items
// @route   GET /api/items
// @access  Public
const getAllOpenItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ status: 'open' })
    .populate('user', 'name profilePicture') // Get user's name and pic
    .sort({ createdAt: -1 }); // Show newest first

  res.json(items);
});

// @desc    Fetch a single item by ID
// @route   GET /api/items/:id
// @access  Public
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate(
    'user',
    'name email contactNumber profilePicture' // Get more user info for details page
  );

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

export { createItem, getAllOpenItems, getItemById };