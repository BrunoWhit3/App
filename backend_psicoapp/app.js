console.log('--- Iniciando app.js ---'); 
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
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

app.use('/auth', require('./routes/authRoutes'));
app.use('/diario', require('./routes/emotionEntryRoutes'));
app.use('/feedback', require('./routes/feedbackRoutes'));
app.use('/sessoes', require('./routes/sessaoRoutes'));
app.use('/financias', require('./routes/financiasRouter'));
app.use('/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
    res.send('API de Psicologia está rodando!');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor Node.js rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
