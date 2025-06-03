import express from 'express';
import { getByPsicologo } from '../controllers/financiasController.js';

const router = express.Router();

router.get('/:psicologo', getByPsicologo);

export default router;