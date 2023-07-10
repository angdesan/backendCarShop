const express = require('express');
const path = require('path');
const router = express.Router();
const auth = require('./routes/client/auth');
const authAdmin = require('./routes/admin/auth')
const carshop = require('./routes/client/carShop');
const carshopServices = require('./routes/client/apiOrden');
router
.get('/', (req, res) => {
    res.status(404).sendFile(path.join(__dirname+'/views/errors/404.html'))
  })

// rutas para cliente
.use('/client/auth',auth)
.use('/client/carshop',carshop)


// rutas para admin
.use('/admin/auth',authAdmin)


//ruta api ordenes
.use('/services/carshop',carshopServices)



module.exports = router;