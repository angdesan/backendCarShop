const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/auth/userModel');
const env = require('../../lib/env');
const config = env.getConfig()

const loginCarShopClient = async (req,res) =>{
    try{
        const loginData = req.body;
        let user = await userModel.findOne({
            correo: loginData.correo
        },{});
        const validations = loginValidation(user,loginData);
        if(validations.error !==null){
            return res.status(404).json(validations);
        }
        if(user.role !== "user"){
            return res.status(403).json({error:"El usuario no cuenta con el rol respectivo"});
        }
        let token = jwt.sign({
            _id: user._id,
            correo: user.correo
    
        },config.jwt.secretKey,{
            expiresIn:  config.jwt.expiration.login
        });
        res.header('auth-token',token).json({
            error: null,
            data: {token,idUser: user._id},
            message: 'login exitoso',
        });
    }catch(err){
        return res.status(500).json({error: "Error al encontrar el usuario"});
    }

}

const loginCarShopAdmin = async (req,res)=>{
    try{
        const loginData = req.body;
        let user = await userModel.findOne({
            correo: loginData.email
        },{});
    const validations = loginValidation(user,loginData);
    if(validations.error !==null){
        return res.status(404).json(validations);
    }
    if(user.role !== "admin" && user.role !== "operario"){
        return res.status(403).json({error:"El usuario no cuenta con el rol respectivo"});
    }
    req.session.user = {
        userId: user._id,
        correo: user.correo,
        role: user.role
    }
    res.redirect('/admin/index')
    }catch(err){
        return res.status(500).json({error: "Error al encontrar el usuario"});
    }

}

const loginValidation = (user,loginData) =>{
    if(!user){
        return {error: "No se encuentra el usuario solicitado"}
    }
    if(!bcrypt.compareSync(loginData.password, user.password)){
        return {error:"Contraseña incorrecta"};
    }
    return {error: null}
}

const logOutAdmin = async (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        } else {
            res.redirect('/admin/login');
        }
    })
}

module.exports = {
    loginCarShopClient,
    loginCarShopAdmin,
    logOutAdmin
};