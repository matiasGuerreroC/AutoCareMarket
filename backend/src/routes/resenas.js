const express = require('express');
const router = express.Router();
const Resena = require('../models/resena');
const sanitizeHtml = require('sanitize-html');

// Obtener todas las reseñas
router.get('/resenas', async (req, res) => {
  try {
    const resenas = await Resena.find();
    res.status(200).json(resenas);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Obtener reseñas por producto
router.get('/resenas/product/:idProducto', async (req, res) => {
  try {
    const resenas = await Resena.find({ idProducto: req.params.idProducto });
    res.status(200).json(resenas);
  } catch (error) {
    console.error('Error al buscar reseñas por producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Crear nueva reseña
router.post('/resenas', async (req, res) => {
  try {
    const { usuario, comentario, imagen, estrellas, idProducto } = req.body;

    if (!usuario || !comentario || !imagen || !estrellas || !idProducto) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevaResena = new Resena({
      usuario: sanitizeHtml(usuario),
      comentario: sanitizeHtml(comentario),
      imagen: sanitizeHtml(imagen),
      estrellas,
      idProducto
    });

    await nuevaResena.save();
    res.status(201).json({ mensaje: 'Reseña creada correctamente', reseña: nuevaResena });
  } catch (error) {
    console.error('Error al crear reseña:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;
