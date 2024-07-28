const express = require('express');
const path = require('path');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// console.log( process.env );

//Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// Cors
app.use( cors() );

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
// TODO: CRUD: Eventos

app.use( '*', (req, res) => {
    res.sendFile( path.join( __dirname, 'public/index.html' ) );
} ) 



// Escuchar peticiones
app.listen( process.env.PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});