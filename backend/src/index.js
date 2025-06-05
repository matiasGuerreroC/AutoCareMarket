const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta base 
app.get('/', (req, res) => {
  res.send('AutoCare Market API funcionando');
});

// Rutas
const productosRouter = require('./routes/productos');
const resenasRouter = require('./routes/resenas');

// NUEVAS RUTAS DE AUTENTICACIÓN
const authRouter = require('./routes/auth'); // <-- Importa el router de autenticación

const connectDB = require('./config/db');

app.use('/api', productosRouter);
app.use('/api', resenasRouter);
app.use('/api/auth', authRouter); // <-- Usa el router de autenticación bajo /api/auth


// Conectar a la base de datos y luego iniciar el servidor
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