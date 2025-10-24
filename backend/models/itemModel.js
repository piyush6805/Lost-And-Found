import mongoose from 'mongoose';

const itemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This links the item to the user who posted it
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Electronics', 'ID Card', 'Keys', 'Apparel', 'Books', 'Other'],
    },
    postType: {
      type: String,
      required: true,
      enum: ['lost', 'found'], // 'lost' = "I lost this", 'found' = "I found this"
    },
    status: {
      type: String,
      required: true,
      enum: ['open', 'closed'],
      default: 'open',
    },
    itemImage: {
      type: String,
      default: null, // Correctly set to null
    },
    location: {
      type: String, // e.g. "Library", "Cafeteria"
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;