// app.js
// app.js

require('dotenv').config();

const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const cors = require('cors');

app.get('/', (res, req) => {
    res.setEncoding('Bienvenido a GiliForo');
})
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

const port = process.env.PORT || 3000;
app.listen(port);
console.log('server on port:', port);
