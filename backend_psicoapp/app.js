console.log('--- Iniciando app.js ---'); 
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import emotionEntryRoutes from './routes/emotionEntryRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import financiasRoutes from './routes/financiasRouter.js';
import sessaoRoutes from './routes/sessaoRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

connect('mongodb+srv://brunobmais2017:CG86psuuXGP3rSZw@cluster-psy-app.xblwm0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Psy-App')
    .then(() => {
        console.log('MongoDB conectado com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

app.use(cors()); 
app.use(json());

app.use('/auth', authRoutes);
app.use('/diario', emotionEntryRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/sessoes', sessaoRoutes);
app.use('/financias', financiasRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API de Psicologia está rodando!');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor Node.js rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
