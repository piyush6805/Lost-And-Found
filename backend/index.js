import express from 'express';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Test route
app.get('/', (req, res) => {
  res.send('Home Page running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});