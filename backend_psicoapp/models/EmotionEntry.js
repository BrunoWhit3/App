import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
const EmotionEntrySchema = new Schema({
    user: {
        type: _Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dataRegistro: { type: Date, default: Date.now, required: true },
    humorGeral: { type: String, required: true, trim: true },
    descricao: { type: String, required: true, trim: true }
});

export default model('EmotionEntry', EmotionEntrySchema);
