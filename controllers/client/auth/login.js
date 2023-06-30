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
        if(!bcrypt.compareSync(data_from_page.password, user.password)){
            return res.status(404).send("Usuario o contraseña incorrecta");
        }
        let token = jwt.sign({
            _id: user._id,
            username: user.username

        },config.jwt.secretKey,{
            expiresIn:  config.jwt.expiration.login
        });
        return res.status(200).json({
            ok: true,
            usuario: user,
            token:token
        })
    }catch(err){
        return res.status(500).send("Error al encontrar el usuario");
    }
}

module.exports = login;