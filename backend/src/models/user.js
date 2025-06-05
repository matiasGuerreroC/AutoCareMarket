// backend/models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es requerido'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es requerido'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Por favor, usa un correo electrónico válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    // --- NUEVOS CAMPOS AÑADIDOS ---
    firstName: { // Para "Nombre"
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true
    },
    lastName: { // Para "Apellidos"
        type: String,
        required: [true, 'El apellido es requerido'],
        trim: true
    },
    documentType: { // Para "Tipo de documento" (RUT)
        type: String,
        // enum: ['RUT', 'DNI', 'Pasaporte'],
        // default: 'RUT'
    },
    documentNumber: { // Número del documento
        type: String,
        // unique: true,
        // required: [true, 'El número de documento es requerido'],
        trim: true
    },
    phone: { // Para "Teléfono"
        type: String,
        // required: [true, 'El teléfono es requerido'],
        trim: true
        // Puedes añadir validación regex para el formato del teléfono
    }
    // -----------------------------
}, { timestamps: true });

// Middleware para hashear la contraseña antes de guardar
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);