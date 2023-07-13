const express = require('express');
const path = require('path');
const router = express.Router();
const auth = require('./carshop/auth');
const carshop = require('./carshop/carShop');
const carshopServices = require('./carshop/apiOrden');
router
.get('/', (req, res) => {
    res.status(404).sendFile(path.join(__dirname+'/views/errors/404.html'))
  })

// rutas para cliente
.use('/auth',auth)
.use('/carshop',carshop)

//ruta api ordenes
.use('/services/carshop',carshopServices)



module.exports = router;