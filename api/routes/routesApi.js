const express = require('express');
const path = require('path');
const router = express.Router();
const client = require('./client/routes');
const admin = require('./admin/routes');


router
.use('/v1/client',client)
.use('/v1/admin',admin)

module.exports=router;