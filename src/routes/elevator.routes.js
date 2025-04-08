/**
 * @file elevator.routes.js
 * @description Define las rutas RESTful para las operaciones del ascensor.
 * @author Daniel Ciro
 * @date 2025-04-08
 */

const express = require('express');
const ElevatorController = require('../controllers/ElevatorController');

const router = express.Router();

/**
 * @route POST /elevator/call
 * @description Llama al ascensor a un piso específico.
 * @body { floor: number } - Piso solicitado.
 */
router.post('/call', ElevatorController.callElevator);

/**
 * @route POST /elevator/open
 * @description Abre las puertas del ascensor.
 */
router.post('/open', ElevatorController.openDoor);

/**
 * @route POST /elevator/close
 * @description Cierra las puertas del ascensor.
 */
router.post('/close', ElevatorController.closeDoor);

/**
 * @route POST /elevator/start
 * @description Inicia el movimiento del ascensor hacia los pisos solicitados.
 */
router.post('/start', ElevatorController.startElevator);

/**
 * @route POST /elevator/stop
 * @description Detiene el movimiento del ascensor.
 */
router.post('/stop', ElevatorController.stopElevator);

/**
 * @route GET /elevator/status
 * @description Retorna el estado actual del ascensor, incluyendo piso actual, puerta, movimiento y solicitudes pendientes.
 */
router.get('/status', ElevatorController.getStatus);

module.exports = router;