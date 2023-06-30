const express = require('express')
const app = express();

const register = require('./../../../controllers/client/auth/register');
const login = require('./../../../controllers/client/auth/login')

app.post('/signup', async(req,res)=>{
    await register(req,res);
})

app.post('/login', async(req,res)=>{
    await login(req,res);
})

module.exports = app;