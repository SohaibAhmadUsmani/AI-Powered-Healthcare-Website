import express from 'express';
import { getAllTests, getTestById, bookTest, getAllBookings } from '../controllers/labController.js';

const router = express.Router();

router.get('/', getAllTests);
router.get('/bookings/all', getAllBookings);
router.get('/:id', getTestById);
router.post('/book', bookTest);

export default router;