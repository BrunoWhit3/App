const router = require('express').Router();
import User from '../models/User';

router.get('/pacientes', async (req, res) => {
    const pacientes = await User.find({ tipoUsuario: 'paciente' });
    res.status(200).json(pacientes);
});

export default router;