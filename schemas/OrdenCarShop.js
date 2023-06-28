const mongoose = require('mongoose');

const orden = mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'cliente',
        required:true
    },
    vehiculo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'vehiculo',
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required:true
    },
    createdAt:{
        type: Date,
        required: true
    }

});

const Orden = new mongoose.model('orden',orden);

module.exports = Orden;