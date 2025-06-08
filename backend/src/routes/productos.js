const express = require('express');
const router = express.Router();
const Producto = require('../models/products'); // 👈 Importa el modelo Mongoose

router.get('/productos-destacados', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;