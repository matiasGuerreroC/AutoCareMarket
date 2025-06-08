const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Usamos tu archivo centralizado
const Producto = require('../models/products');
const Resena = require('../models/resenas');

const productos = [
  {
    nombre: 'Shampoo para Autos',
    descripcion: 'Limpieza profunda y brillo instantáneo.',
    precio: 8500,
    imagen: 'assets/productos/shampoo.png'
  },
  {
    nombre: 'Aspiradora portátil',
    descripcion: 'Compacta y poderosa para interior del auto.',
    precio: 18990,
    imagen: 'assets/productos/aspiradora.png'
  },
  {
    nombre: 'Paño de microfibra',
    descripcion: 'Suave, absorbente y sin rayas.',
    precio: 2990,
    imagen: 'assets/productos/pano.png'
  },
  {
    nombre: 'Cera para autos',
    descripcion: 'Brillo duradero y protección UV.',
    precio: 4500,
    imagen: 'assets/productos/cera.png'
  },
  {
    nombre: 'Limpiador de llantas',
    descripcion: 'Elimina suciedad y grasa.',
    precio: 3500,
    imagen: 'assets/productos/limpiador.png'
  }
];

const resenas = [
  {
    nombre: 'Camila R.',
    comentario: 'Excelente servicio, el envío fue rápido y el producto de calidad.',
    imagen: 'assets/usuarios/camila.png',
    estrellas: 5
  },
  {
    nombre: 'Luis F.',
    comentario: 'Muy buena atención y variedad. Recomendado totalmente.',
    imagen: 'assets/usuarios/luis.jpg',
    estrellas: 4
  },
  {
    nombre: 'Valentina M.',
    comentario: 'Me encantó el kit de limpieza, dejó mi auto brillante.',
    imagen: 'assets/usuarios/valentina.jpg',
    estrellas: 5
  },
  {
    nombre: 'Javier T.',
    comentario: 'La aspiradora es increíble, muy potente y fácil de usar.',
    imagen: 'assets/usuarios/javier.jpg',
    estrellas: 5
  },
  {
    nombre: 'Sofía L.',
    comentario: 'El paño de microfibra es el mejor que he probado, no deja pelusa.',
    imagen: 'assets/usuarios/sofia.jpg',
    estrellas: 4
  },
  {
    nombre: 'Diego P.',
    comentario: 'La cera es de excelente calidad, mi auto brilla como nuevo.',
    imagen: 'assets/usuarios/diego.jpg',
    estrellas: 5
  },
  {
    nombre: 'Ana G.',
    comentario: 'El limpiador de llantas es muy efectivo, lo recomiendo.',
    imagen: 'assets/usuarios/ana.jpg',
    estrellas: 4
  },
  {
    nombre: 'Fernando J.',
    comentario: 'Gran experiencia de compra, volveré a comprar sin duda.',
    imagen: 'assets/usuarios/fernando.jpg',
    estrellas: 5
  }
];

const seed = async () => {
  try {
    await connectDB(); // 🔥 Usa tu lógica común de conexión

    // Limpia colecciones previas
    await Producto.deleteMany();
    await Resena.deleteMany();

    // Inserta nuevos
    await Producto.insertMany(productos);
    await Resena.insertMany(resenas);

    console.log('Datos insertados correctamente');
  } catch (err) {
    console.error('Error al insertar datos:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

seed();