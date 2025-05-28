const express = require('express');
const router = express.Router();
const productos = require('../data/productos');

// Ruta: /api/productos-destacados
router.get('/productos-destacados', (req, res) => {
  try {
    res.status(200).json(productos); // Éxito
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' }); // Falla
  }
});

module.exports = router;