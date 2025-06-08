const express = require('express');
const router = express.Router();
const Resena = require('../models/resenas'); // 👈 Importa el modelo Mongoose

router.get('/resenas', async (req, res) => {
  try {
    const resenas = await Resena.find();
    res.status(200).json(resenas);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;
