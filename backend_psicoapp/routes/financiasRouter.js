import express from 'express';
import { getByPsicologo } from '../controllers/financiasController.js';

const router = express.Router();

router.get('/:id', getByPsicologo);

export default router;