import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load .env variables
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Home Page running');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});