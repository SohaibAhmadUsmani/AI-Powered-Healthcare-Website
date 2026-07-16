import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/stats', statsRoutes);

app.get('/', (req, res) => {
  res.send('Healthcare API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
