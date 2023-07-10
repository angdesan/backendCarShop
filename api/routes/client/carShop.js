const express = require('express');
const app = express();
const validateJWT = require('./../../validateToken');
const ordenController = require('./../../../controllers/client/carshop/orden');


// Middelware para validar el token antes de acceder a los recursos
app.use(validateJWT)
app.get('/orden', async(req,res)=>{
    await ordenController.obtenerOrdenesByUserId(req,res);
})
app.get('/orden/:id', async(req,res)=>{
    await ordenController.obtenerOrdenById(req,res);
})
app.post('/orden', async(req,res)=>{
    await ordenController.generarOrden(req,res);
})
app.put('/orden/:id', async(req,res)=>{
    await ordenController.editarOrden(req,res);
})

module.exports = app;
