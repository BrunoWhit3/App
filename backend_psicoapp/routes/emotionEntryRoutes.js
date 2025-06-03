import express from 'express';
import { addEntry, getByUser } from '../controllers/emotionEntryController.js';

const router = express.Router();

router.post('/add', addEntry);
router.get('/paciente/:id', getByUser);

export default router;