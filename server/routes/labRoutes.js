import express from 'express';
import { getAllTests, getTestById, bookTest } from '../controllers/labController.js';

const router = express.Router();

router.get('/', getAllTests);
router.get('/:id', getTestById);
router.post('/book', bookTest);

export default router;