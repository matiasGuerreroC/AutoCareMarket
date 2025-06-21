require('dotenv').config();
const mongoose = require('mongoose');
const Producto = require('../models/products');
const connectDB = require('../config/db');

const productosNuevos = [
  {
    nombre: 'Repelente de Agua para Vidrios',
    descripcion: 'Mejora la visibilidad en días lluviosos.',
    precio: 5990,
    imagen: 'assets/productos/repelente.png'
  },
  {
    nombre: 'Limpiaparabrisas de Silicona',
    descripcion: 'Mayor durabilidad y eficiencia bajo lluvia.',
    precio: 7990,
    imagen: 'assets/productos/limpiaparabrisas.png'
  },
  {
    nombre: 'Parasol Frontal Plegable',
    descripcion: 'Protege el interior del auto del calor y rayos UV.',
    precio: 3990,
    imagen: 'assets/productos/parasol.png'
  },
  {
    nombre: 'Protector UV para Asientos',
    descripcion: 'Evita desgaste por exposición solar.',
    precio: 5990,
    imagen: 'assets/productos/protector-uv.png'
  },
  {
    nombre: 'Aromatizante Ambiental',
    descripcion: 'Mantiene el interior fresco por semanas.',
    precio: 1990,
    imagen: 'assets/productos/aromatizante.png'
  },
  {
    nombre: 'Kit de Limpieza Multiuso',
    descripcion: 'Incluye paños, cepillo y spray.',
    precio: 10990,
    imagen: 'assets/productos/kit-limpieza.png'
  }
];

async function insertarProductosExtra() {
  try {
    await connectDB();
    await Producto.insertMany(productosNuevos);
    console.log('Productos adicionales insertados correctamente');
    process.exit();
  } catch (err) {
    console.error('Error al insertar productos:', err);
    process.exit(1);
  }
}

insertarProductosExtra();