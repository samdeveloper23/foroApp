// authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');




const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear un hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    await UserModel.create({ username, email, password: hashedPassword });

    res.json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario existe en la base de datos
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar el token de autenticación
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      id: user.id,
      username: user.username,
      token
    });
  } catch (error) {
    next(error);
  }
};

const protectedRoute = (req, res) => {
  res.json({ message: 'Ruta protegida' });
};

//------------------------------




module.exports = {
  register,
  login,
  protectedRoute,

};
