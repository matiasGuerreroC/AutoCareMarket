const express = require('express');
const router = express.Router();
const productos = require('../data/productos');

router.get('/productos-destacados', (req, res) => {
  res.json(productos);
});

module.exports = router;