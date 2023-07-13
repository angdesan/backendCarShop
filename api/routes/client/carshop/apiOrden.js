const express = require('express');
const app = express();
const {verifyToken} = require('../../../validateRoutes');
const actualizarEstadoOrden = require('./../../../../services/carshop')


app.use(verifyToken)

app.put('/orden/:id', async (req,res)=>{
    await actualizarEstadoOrden(req,res);
})

module.exports = app;