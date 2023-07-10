const express = require('express');
const app = express();
const validateJWT = require('../../validateToken');
const { model } = require('mongoose');


app.use(validateJWT)

app.put('/orden/:id')

module.exports = app;