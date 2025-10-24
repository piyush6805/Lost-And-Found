import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});