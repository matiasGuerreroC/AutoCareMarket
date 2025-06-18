const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de seguridad
app.use(helmet()); // Cabeceras HTTP seguras
app.use(mongoSanitize({
  replaceWith: '_'
})); // Sanitiza entradas para prevenir inyecciones de MongoDB
app.use(xss()); // Previene ataques XSS

// CORS seguro
const allowedOrigins = ['http://localhost:8100'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // max 10 intentos por IP
  message: 'Demasiados intentos. Inténtalo nuevamente en 15 minutos.'
});
app.use('/api/auth/login', loginLimiter); // Limita intentos de inicio de sesión

// Middlewares generales
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.send('AutoCare Market API funcionando');
});

// Rutas
const productosRouter = require('./routes/productos');
const resenasRouter = require('./routes/resenas');
const authRouter = require('./routes/auth');

app.use('/api', productosRouter);
app.use('/api', resenasRouter);
app.use('/api/auth', authRouter);

// Conexión a la BD y arranque del servidor
const connectDB = require('./config/db');

connectDB()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  });