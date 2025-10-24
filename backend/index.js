import 'dotenv/config'; // ensure env is loaded early
import express from 'express';
import dotenv from 'dotenv';
  // 1. DOTENV MUST BE CONFIGURED FIRST
dotenv.config(); 


// 2. NOW, IMPORT YOUR OTHER FILES
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'; // This line imports cloudinary.js
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

connectDB();

const app = express();
// 3. NOW, RUN YOUR OTHER SETUP
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});