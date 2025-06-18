const express = require('express');
const router = express.Router();
const Resena = require('../models/resenas');
const sanitizeHtml = require('sanitize-html');

// Obtener reseñas
router.get('/resenas', async (req, res) => {
  try {
    const resenas = await Resena.find();
    res.status(200).json(resenas);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Crear nueva reseña (protección XSS)
router.post('/resenas', async (req, res) => {
  try {
    const { nombre, comentario, imagen, estrellas } = req.body;

    // Validación básica
    if (!nombre || !comentario || !imagen || !estrellas) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const reseña = new Resena({
      nombre: sanitizeHtml(nombre),
      comentario: sanitizeHtml(comentario, {
        allowedTags: [],
        allowedAttributes: {}
      }),
      imagen: sanitizeHtml(imagen),
      estrellas
    });

    await reseña.save();
    res.status(201).json({ mensaje: 'Reseña creada correctamente', reseña });
  } catch (error) {
    console.error('Error al crear reseña:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;
