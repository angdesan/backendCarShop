const express = require('express');
const app = express();
const ordenController = require('../../../../controllers/admin/carshop/carshop');
const {verifySession} = require('../../../validateRoutes');

app.use(verifySession);
app.get('/index', async(req,res)=>{
    return res.render('admin/index',{name: req.session.user.role})
})
app.get('/orden', async(req,res)=>{
    await ordenController.obtenerOrdenesAdmin(req,res);
})
app.delete('/orden/:id', async(req,res)=>{
    await ordenController.eliminarOrden(req,res);
})
app.put('/orden/:id/agendarCitaOrden', async(req,res)=>{
    await ordenController.angendarCitaOrden(req,res);
})
app.put('/orden/:id/cancelarOrden', async (req,res)=>{
    await ordenController.cancelarOrden(req,res);
})

module.exports = app;