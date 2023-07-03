const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const app = require('../app');
const { getPublications } = require('../controllers/getTherads');
const { createPublication } = require('../controllers/createPublication');


// Ruta de registro de usuario
router.post('/register', authController.register);

// Ruta de inicio de sesión
router.post('/login', authController.login);

// Ruta protegida (ejemplo)
router.get('/home', authMiddleware, authController.protectedRoute);

router.get('/home/threads', authMiddleware, getPublications);

router.post('/home/threads', authMiddleware, createPublication);

module.exports = router;

