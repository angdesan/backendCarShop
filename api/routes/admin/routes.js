const express = require('express');
const path = require('path');
const router = express.Router();
const auth = require('./carshop/auth')
const carshop = require('./carshop/carshop');

router
.get('/', (req, res) => {
    return res.status(404).sendFile(path.join(__dirname+'/views/errors/404.html'))
  })

//ruta api
.use('/auth',auth)
.use('/carshop',carshop)


module.exports = router;