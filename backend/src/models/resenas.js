const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  comentario: { type: String, required: true },
  imagen: { type: String, required: true },
  estrellas: { type: Number, required: true, min: 1, max: 5 }
});

const Resena = mongoose.model('Resena', resenaSchema);
module.exports = Resena;
