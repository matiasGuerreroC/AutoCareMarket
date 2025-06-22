const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    trim: true
  },
  comentario: {
    type: String,
    required: true,
    trim: true
  },
  imagen: {
    type: String,
    required: true,
    trim: true
  },
  estrellas: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  idProducto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
}, {
  timestamps: true
});

const Resena = mongoose.model('Resena', resenaSchema);

module.exports = Resena;
