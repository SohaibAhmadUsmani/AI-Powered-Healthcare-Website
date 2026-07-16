import express from 'express';
import { getAllContacts, getContactById } from '../controllers/emergencyController.js';

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getContactById);

export default router;