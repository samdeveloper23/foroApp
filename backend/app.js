require('dotenv').config();

const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const cors = require('cors');

app.get('/', (req, res) => {
    res.send('Bienvenido a GiliForo');
});

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Servidor en el puerto:', port);
