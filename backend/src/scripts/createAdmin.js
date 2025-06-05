// backend/scripts/createAdmin.js
require('dotenv').config({ path: '../.env' }); // Cargar variables de entorno desde el .env raíz del backend

const connectDB = require('../config/db'); // Usa tu función de conexión centralizada
const mongoose = require('mongoose');
const User = require('../models/user'); // Importa tu modelo de usuario

// --- CONFIGURACIÓN DEL NUEVO ADMINISTRADOR ---
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Password123'; // ¡CAMBIA ESTO POR UNA CONTRASEÑA SEGURA EN .env!
// ------------------------------------------

async function createAdminUser() {
    console.log('Intentando conectar a MongoDB...');
    try {
        await connectDB(); // Usa la conexión centralizada (Atlas o local según config)
        console.log('Conectado a MongoDB para crear administrador.');

        // Verificar si el usuario administrador ya existe
        const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
        if (existingAdmin) {
            console.log(`El usuario administrador con email '${ADMIN_EMAIL}' ya existe.`);
            await mongoose.disconnect();
            return;
        }

        // Crear una nueva instancia de usuario
        const adminUser = new User({
            username: ADMIN_USERNAME,
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD, // La contraseña se hasheará automáticamente
            role: 'admin' // Asignar el rol de administrador
        });

        // Guardar el usuario en la base de datos
        await adminUser.save();
        console.log(`Usuario administrador '${adminUser.username}' creado exitosamente.`);
        console.log(`Email: ${adminUser.email}`);
        console.log('Password123');

    } catch (error) {
        console.error('Error al crear usuario administrador:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('Desconectado de MongoDB.');
    }
}

createAdminUser();