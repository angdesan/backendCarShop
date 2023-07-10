const express = require('express')
const app = express();
const {loginCarShopAdmin} = require('../../../controllers/auth/login')


app.post('/login', async(req,res)=>{
    await loginCarShopAdmin(req,res);
})

module.exports = app;