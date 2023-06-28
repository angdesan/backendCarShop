const moongose = require('mongoose');

const vehiculo = moongose.Schema({
    marca: String,
    modelo: String,
    placa: String,
    nivelTanqueGasolina: String,
    detalleEstadoVehiculo: String
});

const Vehiculo = new moongose.model('vehiculo',vehiculo);

module.exports = Vehiculo;