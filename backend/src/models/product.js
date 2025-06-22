const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // --- Campos que ya tenías ---
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  imagen: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    required: true, // Es mejor que sea requerido en vez de tener un default
    min: 0
  },
  categoria: {
    type: String,
    required: true, // También es mejor requerirlo para poder filtrar
    trim: true
  },
  destacado: {
    type: Boolean,
    default: false
  },

  // --- NUEVOS CAMPOS AÑADIDOS para la página de detalle ---
  precioAnterior: {
    type: Number,
    required: false, // Opcional, solo para productos en oferta
    min: 0
  },
  codigoFabricante: {
    type: String,
    required: true,
    unique: true, // Buena práctica, cada código debe ser único
    trim: true
  },
  garantia: {
    type: String,
    required: true,
    default: 'Garantía Legal Vigente (6 meses)'
  },
  especificaciones: {
    type: [String], // Un array de strings
    required: true
  }

}, {
  // Mantienes esta excelente opción que ya tenías
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;