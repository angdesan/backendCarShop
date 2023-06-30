const express = require('express');
const path = require('path');
const router = express.Router();
const auth = require('./routes/client/auth');
const carshop = require('./routes/client/carShop');
router
.get('/', (req, res) => {
    res.status(404).sendFile(path.join(__dirname+'/views/errors/404.html'))
  })
.use('/auth',auth)
.use('/carshop',carshop)

module.exports = router;