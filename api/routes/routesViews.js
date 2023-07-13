const express = require('express');
const path = require('path');
const router = express.Router();
const {verifySession} = require('./../validateRoutes')

router

.get('/', (req,res)=>{
    if(req.session.user){
        return res.redirect('/admin/index');
    }
    return res.redirect('/admin/login');
})

.get('/login', (req,res)=>{
    return res.render('admin/login')
})


.get('/index',verifySession ,(req,res)=>{
    return res.render('admin/index',{name: req.session.user.role})
})

module.exports = router;