const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/product');
const Resena = require('../models/resena');

// Productos con _id manual para poder asociar reseñas
const products = [
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Shampoo para Autos',
    descripcion: 'Limpieza profunda y brillo instantáneo.',
    precio: 8500,
    imagen: 'assets/productos/shampoo.png'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Aspiradora portátil',
    descripcion: 'Compacta y poderosa para interior del auto.',
    precio: 18990,
    imagen: 'assets/productos/aspiradora.png'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Paño de microfibra',
    descripcion: 'Suave, absorbente y sin rayas.',
    precio: 2990,
    imagen: 'assets/productos/pano.png'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Cera para autos',
    descripcion: 'Brillo duradero y protección UV.',
    precio: 4500,
    imagen: 'assets/productos/cera.png'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Limpiador de llantas',
    descripcion: 'Elimina suciedad y grasa.',
    precio: 3500,
    imagen: 'assets/productos/limpiador.png'
  },
  // Productos adicionales
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Kit de Limpieza Multiuso',
    descripcion: 'Incluye paños, cepillo y spray.',
    precio: 10990,
    imagen: 'assets/productos/kit-limpieza.png'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Parasol Frontal Plegable',
    descripcion: 'Protege el interior del auto del calor y rayos UV.',
    precio: 3990,
    imagen: 'assets/productos/parasol.png'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Protector UV para Asientos',
    descripcion: 'Evita desgaste por exposición solar.',
    precio: 5990,
    imagen: 'assets/productos/protector-uv.png'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Repelente de Agua para Vidrios',
    descripcion: 'Mejora la visibilidad en días lluviosos.',
    precio: 5990,
    imagen: 'assets/productos/repelente.png'
  }
];

const resenas = [
  {
    usuario: 'Camila R.',
    comentario: 'Excelente servicio, el envío fue rápido y el producto de calidad.',
    imagen: 'assets/usuarios/camila.png',
    estrellas: 5,
    idProducto: products[0]._id
  },
  {
    usuario: 'Luis F.',
    comentario: 'Muy buena atención y variedad. Recomendado totalmente.',
    imagen: 'assets/usuarios/luis.jpg',
    estrellas: 4,
    idProducto: products[1]._id
  },
  {
    usuario: 'Valentina M.',
    comentario: 'Me encantó el kit de limpieza, dejó mi auto brillante.',
    imagen: 'assets/usuarios/valentina.jpg',
    estrellas: 5,
    idProducto: products[5]._id
  },
  {
    usuario: 'Javier T.',
    comentario: 'La aspiradora es increíble, muy potente y fácil de usar.',
    imagen: 'assets/usuarios/javier.jpg',
    estrellas: 5,
    idProducto: products[1]._id
  },
  {
    usuario: 'Sofía L.',
    comentario: 'El paño de microfibra es el mejor que he probado, no deja pelusa.',
    imagen: 'assets/usuarios/sofia.jpg',
    estrellas: 4,
    idProducto: products[2]._id
  },
  {
    usuario: 'Diego P.',
    comentario: 'La cera es de excelente calidad, mi auto brilla como nuevo.',
    imagen: 'assets/usuarios/diego.jpg',
    estrellas: 5,
    idProducto: products[3]._id
  },
  {
    usuario: 'Ana G.',
    comentario: 'El limpiador de llantas es muy efectivo, lo recomiendo.',
    imagen: 'assets/usuarios/ana.jpg',
    estrellas: 4,
    idProducto: products[4]._id
  },
  {
    usuario: 'Fernando J.',
    comentario: 'El parasol es perfecto para días soleados, muy útil.',
    imagen: 'assets/usuarios/fernando.jpg',
    estrellas: 5,
    idProducto: products[6]._id
  },
  {
    usuario: 'Martina V.',
    comentario: 'El protector UV realmente cuida los asientos del sol.',
    imagen: 'assets/usuarios/martina.jpg',
    estrellas: 5,
    idProducto: products[7]._id
  }
];

const seed = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Resena.deleteMany();

    await Product.insertMany(products);
    await Resena.insertMany(resenas);

    console.log('Datos insertados correctamente');
  } catch (err) {
    console.error('Error al insertar datos:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

seed();