const express = require('express');
const router = express.Router();
const resenas = require('../data/resenas');

// Ruta: /api/resenas
router.get('/resenas', (req, res) => {
  try {
    res.status(200).json(resenas); // ✅ Éxito
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' }); // ⚠️ Falla
  }
});

module.exports = router;