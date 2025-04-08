/**
 * @file app.js
 * @description Punto de entrada del servidor. Configura el puerto y lanza la aplicación Express desde el archivo de configuración principal del servidor (server.js). Ideal para separar la configuración de la ejecución del servidor, siguiendo buenas prácticas de arquitectura limpia.
 * @author Daniel Ciro
 * @date 2025-04-08
 */

const app = require('./src/config/server');

const PORT = process.env.PORT || 3000;

// Inicio del servidor HTTP
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});