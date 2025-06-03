import Financias from "../models/Financias.js";

export const getByPsicologo = async (req, res) => {
    const relatorios = await Financias.find({ psicologo: req.params.id })
        .populate('paciente').populate('psicologo')
        .sort({ date: -1 });
    res.status(200).json(relatorios);
};
