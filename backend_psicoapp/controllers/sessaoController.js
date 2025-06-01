import Sessao from "../models/Sessao";
import Financias from "../models/Financias";

function calcularImposto(valor) {
    if (valor <= 2259.20) return 0;
    if (valor <= 2826.65) return valor * 0.075;
    if (valor <= 3751.05) return valor * 0.15;
    if (valor <= 4664.68) return valor * 0.225;
    return valor * 0.275;
}

exports.create = async (req, res) => {
    const novaSessao = new Sessao(req.body);
    await novaSessao.save();
    res.status(201).json(novaSessao);
};

exports.getByPacient = async (req, res) => {
    const sessoes = await Sessao.find({ paciente: req.params.id }).sort({ date: -1 });
    res.status(200).json(sessoes);
};

exports.update = async (req, res) => {
    const atualizado = await Sessao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(atualizado);
};

exports.cancel = async (req, res) => {
    const cancelado = await Sessao.findByIdAndUpdate(req.params.id, { status: 'cancelado' }, { new: true });
    res.status(200).json(cancelado);
};

exports.completeSession = async (req, res) => {
    const { pagamento } = req.body;
    try {
        const imposto = calcularImposto(pagamento);
        const sessao = await Sessao.findByIdAndUpdate(req.params.id, { status: 'finalizada', pagamento, imposto }, { new: true })
            .populate('paciente').populate('psicologo');
        novoRelatorio = new Financias({
            psicologo: sessao.psicologo._id,
            paciente: sessao.paciente._id, pagamento,
            imposto: imposto,
            date: new Date()
        });
        await novoRelatorio.save();
        res.status(200).json(sessao);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao finalizar', error });
    }
};
