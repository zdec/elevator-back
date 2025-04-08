/**
 * @file Elevator.js
 * @description Modelo que representa la entidad Ascensor (Elevator) en el dominio del sistema.
 * @author Daniel Ciro
 * @date 2025-04-08
 */

class Elevator {
    /**
     * @constructor
     * Inicializa el estado base del ascensor.
     */
    constructor() {
        /** @type {number} Piso actual donde se encuentra el ascensor */
        this.currentFloor = 1;

        /** @type {number[]} Lista de pisos a los que se ha solicitado el ascensor */
        this.requests = [];

        /** @type {boolean} Estado de la puerta (true = abierta, false = cerrada) */
        this.doorOpen = false;

        /** @type {boolean} Indica si el ascensor está en movimiento */
        this.running = false;

        /** @type {NodeJS.Timeout | null} Intervalo de movimiento del ascensor */
        this.interval = null;
    }

    /**
     * Agrega una nueva solicitud para ir a un piso específico.
     * Evita duplicados en la lista de solicitudes.
     * @param {number} floor - Número del piso solicitado.
     */
    call(floor) {
        if (!this.requests.includes(floor)) {
            this.requests.push(floor);
        }
    }

    /**
     * Abre la puerta del ascensor.
     * Marca el estado `doorOpen` como verdadero.
     */
    openDoor() {
        this.doorOpen = true;
    }

    /**
     * Cierra la puerta del ascensor.
     * Marca el estado `doorOpen` como falso.
     */
    closeDoor() {
        this.doorOpen = false;
    }

    /**
     * Inicia el movimiento del ascensor hacia los pisos solicitados.
     * Gestiona la apertura/cierre de puertas y simula el tiempo de movimiento.
     * Evita que se ejecute si ya está en movimiento o no hay solicitudes.
     */
    async start() {
        if (this.running || this.requests.length === 0) return;

        // Cerrar la puerta si está abierta antes de comenzar
        if (this.doorOpen) {
            this.closeDoor();
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        this.running = true;

        // Ordena las solicitudes por proximidad al piso actual
        this.requests.sort((a, b) => {
            const diffA = Math.abs(a - this.currentFloor);
            const diffB = Math.abs(b - this.currentFloor);
            return diffA - diffB;
        });

        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // Simula el recorrido del ascensor hacia cada solicitud
        while (this.requests.length > 0) {
            const targetFloor = this.requests[0];

            if (this.currentFloor < targetFloor) {
                this.currentFloor++;
            } else if (this.currentFloor > targetFloor) {
                this.currentFloor--;
            }

            await wait(1000); // Simula el tiempo de desplazamiento entre pisos

            // Si llegó al piso solicitado
            if (this.currentFloor === targetFloor) {
                this.openDoor();
                this.requests = this.requests.filter(f => f !== this.currentFloor);
                await wait(2000); // Puerta abierta durante 2 segundos
                this.closeDoor();
                await wait(1000); // Espera a que la puerta se cierre
            }
        }

        this.stop();
    }

    /**
     * Detiene el movimiento del ascensor.
     * Marca el estado `running` como falso.
     */
    stop() {
        this.running = false;
    }

    /**
     * Devuelve el estado actual del ascensor.
     * @returns {{ currentFloor: number, doorOpen: boolean, running: boolean, pendingRequests: number[] }}
     *          Snapshot con piso actual, estado de puertas, si está en movimiento y solicitudes pendientes.
     */
    status() {
        return {
            currentFloor: this.currentFloor,
            doorOpen: this.doorOpen,
            running: this.running,
            pendingRequests: this.requests,
        };
    }
}

module.exports = Elevator;