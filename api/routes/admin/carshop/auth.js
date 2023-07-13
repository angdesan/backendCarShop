const express = require('express')
const app = express();
const {loginCarShopAdmin, logOutAdmin} = require('../../../../controllers/auth/login')


app.post('/login', async(req,res)=>{
    await loginCarShopAdmin(req,res);
})

app.get('/logout', async (req,res)=>{
    await logOutAdmin(req,res);
})

module.exports = app;