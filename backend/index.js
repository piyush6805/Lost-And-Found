import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; 

// --- Path setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

// --- Imports ---
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// --- Connect to DB ---
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// --- MIDDLEWARE ---
app.use(cors()); 
app.use(express.json());

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/upload', uploadRoutes);

// --- Error Handling ---
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});