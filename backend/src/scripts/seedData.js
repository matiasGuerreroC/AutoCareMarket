const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Asegúrate de que la ruta sea correcta
const Product = require('../models/product');   // Asegúrate de que la ruta sea correcta
const Resena = require('../models/resena');     // Asegúrate de que la ruta sea correcta

// ===== DATOS DE PRODUCTOS ACTUALIZADOS CON TODOS LOS CAMPOS =====
const products = [
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Shampoo para Autos',
    descripcion: 'Limpieza profunda y brillo instantáneo para la carrocería de tu vehículo.',
    precio: 8500,
    precioAnterior: 9990,
    imagen: 'assets/productos/shampoo.png',
    stock: 50, // <-- Campo añadido
    categoria: 'Limpieza Exterior', // <-- Campo añadido
    destacado: true,
    codigoFabricante: 'ACM-SHP-001',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: ['Contenido: 1 Litro', 'pH Neutro: Seguro para todo tipo de pinturas y ceras', 'Fórmula concentrada de alta espuma', 'Aroma: Cítrico']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Aspiradora portátil',
    descripcion: 'Compacta y poderosa para mantener el interior de tu auto impecable.',
    precio: 18990,
    imagen: 'assets/productos/aspiradora.png',
    stock: 30, // <-- Campo añadido
    categoria: 'Cuidado Interior', // <-- Campo añadido
    destacado: true,
    codigoFabricante: 'ACM-ASP-002',
    garantia: '1 año de garantía del fabricante',
    especificaciones: ['Potencia: 120W', 'Alimentación: Conector 12V para auto', 'Capacidad de polvo: 0.5 Litros', 'Incluye: Boquilla para esquinas y cepillo']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Paño de microfibra',
    descripcion: 'Ultra suave, súper absorbente y no deja rayas ni pelusas.',
    precio: 2990,
    imagen: 'assets/productos/pano.png',
    stock: 200, // <-- Campo añadido
    categoria: 'Limpieza Exterior', // <-- Campo añadido
    destacado: false,
    codigoFabricante: 'ACM-PAN-003',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: ['Dimensiones: 40x40 cm', 'Material: 80% Poliéster, 20% Poliamida', 'GSM (Gramos por metro cuadrado): 350', 'Color: Azul']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Cera para autos',
    descripcion: 'Ofrece un brillo profundo y duradero, además de una capa de protección contra los rayos UV.',
    precio: 4500,
    imagen: 'assets/productos/cera.png',
    stock: 60, // <-- Campo añadido
    categoria: 'Limpieza Exterior', // <-- Campo añadido
    destacado: false,
    codigoFabricante: 'ACM-CER-004',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: ['Tipo: Cera en pasta', 'Componente principal: Carnauba', 'Contenido: 200g', 'Duración: Protección de hasta 3 meses']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Limpiador de llantas',
    descripcion: 'Fórmula potente que disuelve y elimina la suciedad, el polvo de frenos y la grasa de las llantas.',
    precio: 3500,
    imagen: 'assets/productos/limpiador.png',
    stock: 75, // <-- Campo añadido
    categoria: 'Limpieza Exterior', // <-- Campo añadido
    destacado: false,
    codigoFabricante: 'ACM-LLN-005',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: ['Contenido: 500 ml', 'Tipo: Spray con gatillo', 'Seguro para llantas de aleación, acero y cromadas', 'Acción rápida en 5 minutos']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Kit de Limpieza Multiuso',
    descripcion: 'La solución todo-en-uno para una limpieza completa de tu automóvil, tanto interior como exterior.',
    precio: 10990,
    precioAnterior: 12500,
    imagen: 'assets/productos/kit-limpieza.png',
    stock: 25, // <-- Campo añadido
    categoria: 'Kits de Limpieza', // <-- Campo añadido
    destacado: false,
    codigoFabricante: 'ACM-KIT-006',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: ['Incluye: Shampoo (250ml), Limpia vidrios (250ml), 2 paños de microfibra', 'Adicional: Cepillo para llantas y esponja de lavado', 'Ideal para regalo', 'Uso: Interior y Exterior']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Parasol Frontal Plegable',
    descripcion: 'Protege el interior de tu auto del calor excesivo y el daño causado por los rayos UV.',
    precio: 3990,
    imagen: 'assets/productos/parasol.png',
    stock: 150, // <-- Campo añadido
    categoria: 'Accesorios', // <-- Campo añadido
    destacado: false,
    codigoFabricante: 'ACM-PAR-007',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: ['Material: Reflectante con burbujas de aire', 'Dimensiones: 130x60 cm (Estándar)', 'Diseño: Plegable con ventosas de sujeción', 'Reduce la temperatura interior significativamente']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Protector UV para Asientos',
    descripcion: 'Evita la decoloración y el agrietamiento de tus asientos de cuero o tela por la exposición solar.',
    precio: 5990,
    imagen: 'assets/productos/protector-uv.png',
    stock: 40, // <-- Campo añadido
    categoria: 'Cuidado Interior', // <-- Campo añadido
    destacado: false,
    codigoFabricante: 'ACM-PRT-008',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: ['Contenido: 400 ml', 'Tipo: Spray', 'Acabado: Mate, no grasoso', 'Compatibilidad: Cuero, vinilo y plástico']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Repelente de Agua para Vidrios',
    descripcion: 'Crea una capa hidrofóbica que mejora drásticamente la visibilidad en días de lluvia.',
    precio: 5990,
    imagen: 'assets/productos/repelente.png',
    stock: 80, // <-- Campo añadido
    categoria: 'Limpieza Exterior', // <-- Campo añadido
    destacado: false,
    codigoFabricante: 'ACM-REP-009',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: ['Contenido: 200 ml', 'Aplicación: Vidrios exteriores (parabrisas, espejos)', 'Duración: Efectivo por varias semanas', 'Mejora la seguridad al conducir']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Ambientador de Auto en Spray',
    descripcion: 'Elimina malos olores y deja un aroma a vainilla duradero y fresco en el habitáculo.',
    precio: 1990,
    imagen: 'assets/productos/ambientador.png',
    stock: 250, // <-- Campo añadido
    categoria: 'Cuidado Interior', // <-- Campo añadido
    destacado: true,
    codigoFabricante: 'ACM-AMB-010',
    garantia: 'N/A',
    especificaciones: ['Aroma: Vainilla Intensa', 'Contenido: 100 ml', 'Tipo: Spray de pulverización fina', 'No mancha las tapicerías']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Pulidor de Carrocería',
    descripcion: 'Fórmula abrasiva suave que elimina pequeños rayones, marcas de remolino y devuelve el brillo original.',
    precio: 9990,
    imagen: 'assets/productos/pulidor.png',
    stock: 35, // <-- Campo añadido
    categoria: 'Limpieza Exterior', // <-- Campo añadido
    destacado: false,
    codigoFabricante: 'ACM-PUL-011',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: ['Contenido: 300 ml', 'Tipo: Crema de pulido', 'Nivel de corte: Fino', 'Aplicación: Manual o con máquina pulidora']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Cargador USB para Auto',
    descripcion: 'Mantén tus dispositivos cargados mientras viajas con este cargador de carga rápida y doble puerto.',
    precio: 3490,
    precioAnterior: 4990,
    imagen: 'assets/productos/cargador-usb.png',
    stock: 120, // <-- Campo añadido
    categoria: 'Accesorios y Electrónica', // <-- Campo añadido
    destacado: true,
    codigoFabricante: 'ACM-USB-012',
    garantia: '1 año de garantía del fabricante',
    especificaciones: ['Puertos: 1x USB-A, 1x USB-C', 'Potencia máxima: 20W', 'Compatibilidad: Quick Charge 3.0 y Power Delivery (PD)', 'Material: Plástico ABS de alta resistencia']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Organizador de Asiento Trasero',
    descripcion: 'Mantén tu auto ordenado y los objetos de valor al alcance con múltiples compartimentos.',
    precio: 5990,
    imagen: 'assets/productos/organizador.png',
    stock: 90, // <-- Campo añadido
    categoria: 'Cuidado Interior', // <-- Campo añadido
    destacado: false,
    codigoFabricante: 'ACM-ORG-013',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: ['Material: Fieltro resistente', 'Compartimentos: 7 (incluye soporte para tablet)', 'Instalación: Correas ajustables al asiento delantero', 'Color: Negro']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Luces LED para Interior',
    descripcion: 'Ilumina el interior de tu vehículo con un toque moderno y eficiente gracias a estas tiras LED.',
    precio: 7990,
    imagen: 'assets/productos/luces-led.png',
    stock: 45, // <-- Campo añadido
    categoria: 'Accesorios y Electrónica', // <-- Campo añadido
    destacado: true,
    codigoFabricante: 'ACM-LED-014',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: ['Tipo: Tira LED RGB', 'Control: Remoto incluido', 'Alimentación: USB 5V', 'Instalación: Adhesivo 3M en la parte posterior']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Cubre Volante Antideslizante',
    descripcion: 'Mejora el agarre y la comodidad al conducir, a la vez que protege tu volante del desgaste.',
    precio: 4590,
    imagen: 'assets/productos/cubre-volante.png',
    stock: 110, // <-- Campo añadido
    categoria: 'Cuidado Interior', // <-- Campo añadido
    destacado: false,
    codigoFabricante: 'ACM-CVL-015',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: ['Material: Cuero sintético y goma interior', 'Diámetro: Universal (37-39 cm)', 'Diseño: Ergonómico y antideslizante', 'Fácil instalación sin herramientas']
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Kit de Lavado y Secado MOMO (9 Piezas)',
    descripcion: 'Un completo kit de la prestigiosa marca MOMO para el lavado y secado profesional de tu auto. Incluye todo lo necesario para dejarlo impecable y protegido.',
    precio: 21000,
    precioAnterior: 30000,
    imagen: 'assets/productos/kit-momo.png',
    stock: 20,
    categoria: 'Kits de Limpieza',
    destacado: true,
    codigoFabricante: '1054087',
    garantia: 'Garantía Legal Vigente (6 meses)',
    especificaciones: [ 'Marca: MOMO', 'Total Piezas: 9', '1 Guante de Lavado de Microfibra', '1 Toalla de secado "Waffle Weave"', '2 Toallas de Microfibra Multiuso', '2 Aplicadores de cera/sellador', '1 Esponja de microfibra tipo "Noodle"', '1 Bolso de transporte con cierre' ]
  }
];

// El array de reseñas no necesita cambios, ya que se vincula correctamente por el índice del array de productos.
const resenas = [
    {
      usuario: 'Camila R.',
      comentario: 'Excelente shampoo, dejó la pintura de mi auto muy brillante y con un acabado suave. El envío fue rápido.',
      imagen: 'assets/usuarios/camila.png',
      estrellas: 5,
      idProducto: products[0]._id
    },
    {
      usuario: 'Javier T.',
      comentario: 'La aspiradora es increíble, muy potente y fácil de usar. Viene con varios accesorios que ayudan a llegar a todos los rincones.',
      imagen: 'assets/usuarios/javier.jpg',
      estrellas: 5,
      idProducto: products[1]._id
    },
    {
      usuario: 'Valentina M.',
      comentario: 'Me encantó el kit de limpieza, es muy completo y dejó mi auto brillante. El cepillo para las llantas es genial.',
      imagen: 'assets/usuarios/valentina.jpg',
      estrellas: 5,
      idProducto: products[5]._id
    },
    {
      usuario: 'Sofía L.',
      comentario: 'El paño de microfibra es el mejor que he probado, no deja pelusa ni rayas al secar. Muy absorbente.',
      imagen: 'assets/usuarios/sofia.jpg',
      estrellas: 4,
      idProducto: products[2]._id
    },
    {
      usuario: 'Diego P.',
      comentario: 'La cera es de excelente calidad, mi auto brilla como nuevo y el agua se resbala. La aplicación fue sencilla.',
      imagen: 'assets/usuarios/diego.jpg',
      estrellas: 5,
      idProducto: products[3]._id
    },
    {
      usuario: 'Ana G.',
      comentario: 'El limpiador de llantas es muy efectivo contra el polvo de los frenos. Hay que dejarlo actuar unos minutos y la suciedad sale fácil.',
      imagen: 'assets/usuarios/ana.jpg',
      estrellas: 4,
      idProducto: products[4]._id
    },
    {
      usuario: 'Fernando J.',
      comentario: 'El parasol es perfecto para días soleados, se nota mucho la diferencia de temperatura dentro del auto. Muy útil.',
      imagen: 'assets/usuarios/fernando.jpg',
      estrellas: 5,
      idProducto: products[6]._id
    },
    {
      usuario: 'Martina V.',
      comentario: 'El protector UV realmente cuida los asientos del sol, sobre todo si tienes tapiz de cuero. Lo recomiendo.',
      imagen: 'assets/usuarios/martina.jpg',
      estrellas: 5,
      idProducto: products[7]._id
    },
    {
      usuario: 'Carlos S.',
      comentario: 'El shampoo hace bastante espuma y limpia bien, pero el aroma no me convenció del todo. Cumple su función.',
      imagen: 'assets/usuarios/carlos.png',
      estrellas: 4,
      idProducto: products[0]._id
    },
    {
      usuario: 'Isidora P.',
      comentario: 'Es útil para cosas pequeñas como migas, pero no tiene suficiente potencia para la arena. El tamaño es cómodo, eso sí.',
      imagen: 'assets/usuarios/isidora.png',
      estrellas: 3,
      idProducto: products[1]._id
    },
    {
      usuario: 'Ricardo G.',
      comentario: 'Funciona increíble. Lo apliqué antes de un viaje al sur y la lluvia se resbalaba del parabrisas, casi no necesité usar los limpiaparabrisas.',
      imagen: 'assets/usuarios/ricardo.png',
      estrellas: 5,
      idProducto: products[8]._id
    },
    {
      usuario: 'Antonia B.',
      comentario: 'El aroma a vainilla es demasiado artificial y empalagoso. Además, no dura nada. No lo volvería a comprar.',
      imagen: 'assets/usuarios/antonia.png',
      estrellas: 2,
      idProducto: products[9]._id
    },
    {
      usuario: 'Miguel A.',
      comentario: 'Tenía unos rayones superficiales en la puerta y este pulidor los sacó casi por completo. Se necesita paciencia, pero el resultado vale la pena.',
      imagen: 'assets/usuarios/miguel.png',
      estrellas: 5,
      idProducto: products[10]._id
    },
    {
      usuario: 'Francisca V.',
      comentario: 'Funciona, pero no es "carga rápida" como dice. Carga a velocidad normal. Por el precio está bien, pero la descripción es imprecisa.',
      imagen: 'assets/usuarios/francisca.png',
      estrellas: 3,
      idProducto: products[11]._id
    },
    {
      usuario: 'Jorge N.',
      comentario: '¡La mejor compra para mi auto! Ahora tengo todo ordenado: la botella de agua, los pañuelos, los juguetes de mi hijo. El material se ve resistente.',
      imagen: 'assets/usuarios/jorge.png',
      estrellas: 5,
      idProducto: products[12]._id
    },
    {
      usuario: 'Daniela F.',
      comentario: 'Le dan un toque muy moderno al auto. La instalación fue un poco complicada porque el adhesivo no pegaba bien, tuve que usar otro.',
      imagen: 'assets/usuarios/daniela.png',
      estrellas: 4,
      idProducto: products[13]._id
    },
    {
      usuario: 'Patricio M.',
      comentario: 'Pésima calidad. Se rompió al intentar instalarlo, el material es muy rígido y de mal olor. Dinero perdido.',
      imagen: 'assets/usuarios/patricio.png',
      estrellas: 1,
      idProducto: products[14]._id
    },
    {
      usuario: 'Laura C.',
      comentario: 'Justo lo que necesitaba. El agarre es muy bueno y se siente de calidad. Le quedó perfecto a mi auto.',
      imagen: 'assets/usuarios/laura.png',
      estrellas: 5,
      idProducto: products[14]._id
    },
    {
      usuario: 'Sebastián A.',
      comentario: 'Calidad increíble. El guante es súper suave y las toallas de secado absorben muchísima agua. Vale cada peso, el auto queda perfecto. La marca MOMO no decepciona.',
      imagen: 'assets/usuarios/sebastian.png',
      estrellas: 5,
      idProducto: products[15]._id // Asociada al último producto añadido: Kit MOMO
    },
    {
      usuario: 'Carla Z.',
      comentario: 'Muy buen kit, trae de todo un poco. Los aplicadores son un poco pequeños para mi gusto, pero el resto de los componentes son de excelente calidad. Lo recomiendo.',
      imagen: 'assets/usuarios/carla.png',
      estrellas: 4,
      idProducto: products[15]._id // Asociada al último producto añadido: Kit MOMO
    }
];

const seed = async () => {
  try {
    await connectDB();

    console.log('Limpiando colecciones...');
    await Product.deleteMany();
    await Resena.deleteMany();

    console.log('Insertando productos...');
    await Product.insertMany(products);
    console.log('Insertando reseñas...');
    await Resena.insertMany(resenas);

    console.log('¡Datos insertados correctamente! ✅');
  } catch (err) {
    console.error('❌ Error al insertar datos:', err.message);
  } finally {
    console.log('Desconectando de la base de datos...');
    mongoose.disconnect();
  }
};

seed();