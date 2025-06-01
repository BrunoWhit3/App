const router = require('express').Router();
import { addEntry, getByUser } from '../controllers/emotionEntryController';

router.post('/add', addEntry);
router.get('/paciente/:id', getByUser);

export default router;