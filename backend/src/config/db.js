const mongoose = require('mongoose');
require('dotenv').config();

//const dbPassword = 'Lm1PXiVsfCuyMjin'; 
//const dbuserName = 'autocaremarket'; 
//const uri = 'mongodb+srv://cesaranabalon900:${dbPassword}@cluster0.relwxnr.mongodb.net/${dbName}';
//const uri = 'mongodb+srv:autocaremarket:Lm1PXiVsfCuyMjin@cluster0.lspkv7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//const uri = 'mongodb+srv:autocaremarket:contraseña@cluster0.lspkv7l.mongodb.net/NombreDeLaBase';
//const uri = 'mongodb+srv://autocaremarket:${db_password}@cluster0.lspkv7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const username = encodeURIComponent('autocaremarket');
const password = encodeURIComponent('Lm1PXiVsfCuyMjin');
const cluster = 'cluster0.lspkv7l.mongodb.net';
const dbName = 'AutoCareMarket';
const authSource = 'admin';
const authMechanism = 'SCRAM-SHA-1';

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?authSource=${authSource}&authMechanism=${authMechanism}`;

module.exports = () => mongoose.connect(uri)
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  });