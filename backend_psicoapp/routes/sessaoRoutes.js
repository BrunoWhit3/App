const router = require('express').Router();
import { create, getByPacient, update, cancel, completeSession } from '../controllers/sessaoController';

router.post('/create', create);
router.get('/paciente/:id', getByPacient);
router.put('/update/:id', update);
router.delete('/cancel/:id', cancel);
router.put('/complete/:id', completeSession);

export default router;