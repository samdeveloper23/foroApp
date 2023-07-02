// authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Obtener el token de autorización del encabezado de la solicitud
        const token = req.headers.authorization.split(' ')[1];

        // Verificar y decodificar el token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Agregar el ID del usuario a la solicitud para uso posterior
        req.userId = decodedToken.userId;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Autenticación requerida' });
    }
};

module.exports = authMiddleware;

