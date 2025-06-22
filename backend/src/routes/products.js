const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Obtener todos los productos
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Obtener productos destacados (puedes definir por algún criterio más adelante)
router.get('/products/destacados', async (req, res) => {
  try {
    const products = await Product.find({ destacado: true });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener destacados:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Obtener producto por ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;
