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

app.use('/api', productosRouter);
app.use('/api', resenasRouter);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});