/**
 * @file ElevatorService.js
 * @description Servicio que encapsula la lógica de negocio del ascensor. Coordina las operaciones de la instancia del modelo Elevator y expone métodos para ser utilizados por los controladores HTTP.
 * @author Daniel Ciro
 * @date 2025-04-08
 */

const Elevator = require('../models/Elevator');

class ElevatorService {
  constructor() {
    /** @type {Elevator} Instancia única del ascensor utilizada por toda la aplicación */
    this.elevator = new Elevator();
  }

  /**
   * Solicita el ascensor a un piso específico.
   * @param {number} floor - Piso al que se llama el ascensor.
   */
  callElevator(floor) {
    this.elevator.call(floor);
  }

  /**
   * Abre las puertas del ascensor.
   */
  openDoor() {
    this.elevator.openDoor();
  }

  /**
   * Cierra las puertas del ascensor.
   */
  closeDoor() {
    this.elevator.closeDoor();
  }

  /**
   * Inicia el movimiento del ascensor hacia los pisos pendientes.
   */
  async startElevator() {
    await this.elevator.start();
  }

  /**
   * Detiene el ascensor, cancelando cualquier movimiento en curso.
   */
  stopElevator() {
    this.elevator.stop();
  }

  /**
   * Devuelve el estado actual del ascensor.
   * @returns {{ currentFloor: number, doorOpen: boolean, running: boolean, pendingRequests: number[] }} Estado actual
   */
  getStatus() {
    return this.elevator.status();
  }
}

module.exports = new ElevatorService();