/**
 * @file server.js
 * @description Configuración y creación de la app Express.
 * @author Daniel Ciro
 * @date 2025-04-08
 */

const express = require('express'); // Framework web para Node.js
const cors = require('cors'); // Middleware para habilitar CORS
const elevatorRoutes = require('../routes/elevator.routes'); // Importa las rutas del recurso 'elevator'

const app = express(); // Crea una instancia de la aplicación Express

// Middlewares
app.use(cors()); // Permite solicitudes desde otros orígenes
app.use(express.json()); // Habilita el análisis de cuerpos JSON en las peticiones

// Rutas principales de la API
app.use('/elevator', elevatorRoutes); // Usa el enrutador para todas las rutas que comiencen con /elevator

// Ruta de prueba para verificar que la API está funcionando
app.get('/', (req, res) => {
    res.send('🛗 API de Control de Ascensor funcionando');
});

// Exporta la app para ser utilizada en otros archivos (por ejemplo, index.js o para pruebas)
module.exports = app;