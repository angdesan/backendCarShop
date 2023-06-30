const express = require('express');
const app = express();
const validateJWT = require('./../../validateToken');

app.use(validateJWT)
app.post('/orden', async(req,res)=>{

})

module.exports = app;
