// app.js
// app.js

require('dotenv').config();

const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const cors = require('cors');


app.use(cors());
// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Ruta principal de la API
app.use('/api', apiRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Puerto de escucha
const IP = '192.168.1.35'
const port = process.env.PORT || 3000;
app.listen(port, IP, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
