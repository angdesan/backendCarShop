const moongose = require('mongoose');

const user = moongose.Schema({
    nombre: String,
    correo: String,
    password: String
});

const User = new moongose.model('user',user);

module.exports = User;