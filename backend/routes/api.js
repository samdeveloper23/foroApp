const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const app = require('../app');


// Ruta de registro de usuario
router.post('/register', authController.register);

// Ruta de inicio de sesión
router.post('/login', authController.login);

// Ruta protegida (ejemplo)
router.get('/home', authMiddleware, authController.protectedRoute);

// Ruta para obtener los hilos

module.exports = router;

