const express = require('express');
const path = require('path');
const router = express.Router();
const auth = require('./routes/client/auth');

router
.get('/', (req, res) => {
    res.status(404).sendFile(path.join(__dirname+'/views/errors/404.html'))
  })
.use('/auth',auth);

module.exports = router;