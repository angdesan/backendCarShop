const moongose = require('mongoose');

const cliente = moongose.Schema({
    nombre: String,
    correo: String,
    numeroContacto: String,
    tipoIdentificacion: String,
    identificacion: String
});

const Cliente = new moongose.model('cliente',cliente);

module.exports = Cliente;