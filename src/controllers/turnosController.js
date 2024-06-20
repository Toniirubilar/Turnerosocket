const turnosModel = require('../models/turnosModel');

function enviarListados(io, alerta) {
    io.sockets.emit('ListaDeTurnos', {
        pendientes: turnosModel.getListaTurnos(),
        atendidos: turnosModel.getListaAtendidos(),
        alerta: alerta
    });
}

function configureSocket(io) {
    setInterval(() => {
        enviarListados(io, false);
    }, 60000);

    io.on('connection', (socket) => {
        console.log('Usuario conectado');

        enviarListados(io, false);

        socket.on('VentanaTurnoActual', () => {
            console.log('VentanaTurnoActual');
            enviarListados(io, false);
        });

        socket.on('AtenderTurno', (puesto) => {
            console.log('AtenderTurno');
            if (turnosModel.atenderTurno(puesto)) {
                enviarListados(io, true);
            }
        });

        socket.on('CrearTurno', (data) => {
            console.log('CrearTurno');
            if (turnosModel.crearTurno(data)) {
                enviarListados(io, false);
            }
        });

        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });
}

module.exports = {
    configureSocket
};
