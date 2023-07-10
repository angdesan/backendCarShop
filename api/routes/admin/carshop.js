const express = require('express');
const app = express();
const ordenController = require('./../../../controllers/admin/carshop/carshop');

// app.use((req,res,next)=>{
//     if(req.session.user){
//         next()
//     }else{
//         return res.render('admin/login')
//     }
// })
app.get('/orden', async(req,res)=>{
    await ordenController.obtenerOrdenesAdmin(req,res);
})
app.delete('/orden/:id', async(req,res)=>{
    await ordenController.eliminarOrden(req,res);
})

module.exports = app;