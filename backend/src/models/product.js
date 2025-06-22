const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
    default: 10,
    min: 0
  },
  categoria: {
    type: String,
    default: 'general',
    trim: true
  },
  destacado: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
