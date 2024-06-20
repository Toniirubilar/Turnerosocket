const listaTurnos = ["Agustin Rubilar", "Manuel Caporaso", "Lucas Duran", "Raul Camacho", "Cristian Testaseca"];
const listaAtendidos = [];

module.exports = {
    getListaTurnos: () => listaTurnos,
    getListaAtendidos: () => listaAtendidos,
    atenderTurno: (puesto) => {
        if (listaTurnos.length > 0) {
            const atendido = {
                nombre: listaTurnos.shift(),
                puesto: puesto,
                hora: Date.now()
            };
            listaAtendidos.unshift(atendido);
            return atendido;
        }
        return null;
    },
    crearTurno: (nombre) => {
        if (typeof nombre === 'string' && nombre.trim() !== '') {
            listaTurnos.push(nombre);
            return true;
        }
        return false;
    }
};
