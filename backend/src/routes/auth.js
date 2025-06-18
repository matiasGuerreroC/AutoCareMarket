const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production';

/**
 * Ruta: POST /api/auth/register
 * Descripción: Registro de nuevo usuario con validaciones y sanitización
 */
router.post(
  '/register',
  [
    body('username').trim().notEmpty().withMessage('El nombre de usuario es obligatorio').escape(),
    body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('firstName').trim().notEmpty().withMessage('Nombre requerido').escape(),
    body('lastName').trim().notEmpty().withMessage('Apellido requerido').escape(),
    body('documentType').trim().notEmpty().withMessage('Tipo de documento requerido').escape(),
    body('documentNumber').trim().notEmpty().withMessage('Número de documento requerido').escape(),
    body('phone').trim().notEmpty().withMessage('Teléfono requerido').escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }

    const { username, email, password, firstName, lastName, documentType, documentNumber, phone } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
      }

      user = new User({
        username,
        email,
        password,
        firstName,
        lastName,
        documentType,
        documentNumber,
        phone,
        role: 'user',
      });

      await user.save();

      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          documentType: user.documentType,
          documentNumber: user.documentNumber,
          phone: user.phone,
        },
      });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor al registrar el usuario.' });
    }
  }
);

/**
 * Ruta: POST /api/auth/login
 * Descripción: Inicio de sesión con validaciones básicas
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas.' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Credenciales inválidas.' });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

      res.json({
        message: 'Inicio de sesión exitoso',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.message);
      res.status(500).json({ message: 'Error interno del servidor durante el inicio de sesión.' });
    }
  }
);

module.exports = router;