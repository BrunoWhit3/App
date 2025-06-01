const router = require('express').Router();
import { getByPsicologo } from '../controllers/financiasController';

router.get('/:psicologo', getByPsicologo);

export default router;