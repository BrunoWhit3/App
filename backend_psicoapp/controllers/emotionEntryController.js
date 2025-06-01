import EmotionEntry from '../models/EmotionEntry';

exports.addEntry = async (req, res) => {
    const novaEntrada = new EmotionEntry(req.body);
    await novaEntrada.save();
    res.status(201).json(novaEntrada);
};

exports.getByUser = async (req, res) => {
    const entradas = await EmotionEntry.find({ user: req.params.id }).sort({ date: -1 });
    res.status(200).json(entradas);
};
