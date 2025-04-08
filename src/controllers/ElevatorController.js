/**
 * @file ElevatorController.js
 * @description Controlador HTTP para manejar las operaciones del ascensor.
 * @author Daniel Ciro
 * @date 2025-04-08
 */

const elevatorService = require('../services/ElevatorService'); // Servicio que contiene la lógica del ascensor

const ElevatorController = {
  /**
   * Maneja la solicitud para llamar al ascensor a un piso específico.
   * @param {import('express').Request} req - Objeto de solicitud HTTP
   * @param {import('express').Response} res - Objeto de respuesta HTTP
   * 
   * Valida que el número de piso sea válido y delega la acción al servicio.
   */
  callElevator: (req, res) => {
    const { floor } = req.body;

    if (typeof floor !== 'number') {
      return res.status(400).json({ message: 'El piso debe ser un número.' });
    }

    elevatorService.callElevator(floor);
    res.status(200).json({ message: `Ascensor solicitado al piso ${floor}` });
  },

  /**
   * Maneja la apertura de puertas del ascensor.
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  openDoor: (req, res) => {
    elevatorService.openDoor();
    res.status(200).json({ message: 'Puerta del ascensor abierta.' });
  },

  /**
   * Maneja el cierre de puertas del ascensor.
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  closeDoor: (req, res) => {
    elevatorService.closeDoor();
    res.status(200).json({ message: 'Puerta del ascensor cerrada.' });
  },

  /**
   * Inicia el movimiento del ascensor de manera asíncrona.
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  startElevator: async (req, res) => {
    await elevatorService.startElevator();
    res.status(200).json({ message: 'Ascensor en movimiento.' });
  },

  /**
   * Detiene el movimiento del ascensor.
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  stopElevator: (req, res) => {
    elevatorService.stopElevator();
    res.status(200).json({ message: 'Ascensor detenido.' });
  },

  /**
   * Retorna el estado actual del ascensor.
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  getStatus: (req, res) => {
    const status = elevatorService.getStatus();
    res.status(200).json(status);
  }
};

module.exports = ElevatorController;