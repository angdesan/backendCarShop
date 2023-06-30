const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./../../../models/client/auth/userModel');
const env = require('./../../../lib/env');
const config = env.getConfig()

const login = async (req,res)=>{
    try{
        const loginData = req.body;
        let user = await userModel.findOne({
            correo: loginData.correo
        },{});
        if(!user){
            return res.status(404).send("No se encuentra el usuario solicitado");
        }
        if(!bcrypt.compareSync(loginData.password, user.password)){
            return res.status(404).send("Usuario o contraseña incorrecta");
        }
        let token = jwt.sign({
            _id: user._id,
            correo: user.correo

        },config.jwt.secretKey,{
            expiresIn:  config.jwt.expiration.login
        });
        res.header('auth-token',token).json({
            error: null,
            data: {token},
            message: 'login exitoso'
        });
    }catch(err){
        return res.status(500).send("Error al encontrar el usuario");
    }
}

module.exports = login;