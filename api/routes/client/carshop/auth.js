const express = require('express')
const app = express();

const register = require('../../../../controllers/client/auth/register');
const { loginCarShopClient} = require('../../../../controllers/auth/login')

app.post('/signup', async(req,res)=>{
    await register(req,res);
})

app.post('/login', async(req,res)=>{
    await loginCarShopClient(req,res);
})

module.exports = app;