// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Asegúrate de que este path es correcto
const jwt = require('jsonwebtoken'); // Para generar tokens

// Asegúrate de que JWT_SECRET esté definido en tus variables de entorno (.env)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production';

// Ruta para Registrar un nuevo usuario (con todos los campos)
router.post('/register', async (req, res) => {
    const { username, email, password, firstName, lastName, documentType, documentNumber, phone } = req.body;

    try {
        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }

        // Crear una nueva instancia de usuario con todos los campos
        user = new User({
            username,
            email,
            password, // La contraseña se hasheará automáticamente por el middleware pre('save')
            firstName,
            lastName,
            documentType,
            documentNumber,
            phone,
            role: 'user'
        });

        await user.save(); // Esto disparará el middleware para hashear la contraseña

        // Generar token JWT
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
                phone: user.phone
            }
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        // Manejar errores de validación de Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Error interno del servidor al registrar el usuario.' });
    }
});

// Ruta para Iniciar Sesión (Login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('--- INTENTO DE LOGIN ---');
    console.log('Email recibido del frontend:', email);
    console.log('Contraseña recibida del frontend (¡NO EN PROD!):', password); // Temporalmente para depuración

    try {
        // 1. Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            console.log('LOGIN FALLIDO: Usuario no encontrado para el email:', email);
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }
        console.log('USUARIO ENCONTRADO. Rol:', user.role, 'Email:', user.email);

        // 2. Comparar la contraseña ingresada con la contraseña hasheada almacenada
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('LOGIN FALLIDO: Contraseña incorrecta para el email:', email);
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }
        console.log('LOGIN EXITOSO: Contraseña correcta para el email:', email);

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Error en el inicio de sesión:', error.message);
        res.status(500).json({ message: 'Error interno del servidor durante el inicio de sesión.' });
    }
});

module.exports = router;