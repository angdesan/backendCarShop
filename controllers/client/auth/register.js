const bcrypt = require('bcrypt');
const userModel = require('../../../models/auth/userModel');
const mongo = require('./../../../lib/db');

const register = async (req,res)=>{
    try{
        const data = req.body;
        let {nombre, correo, password} = data;
        let user = await userModel.findOne({
            correo: correo
        },{});
        if(user){
            return res.status(403).json({error: "El correo proporcionado ya existe"})
        }
        let insertUser = await userModel.insertOne({
            nombre: nombre,
            correo:correo,
            password: bcrypt.hashSync(password,10),
            role: "user",
            createdAt: new Date()
        });
        res.status(201).json(insertUser);
    }catch(err){
        return res.status(500).json({error:"Error al realizar el registro del usuario"});
    }
}
const logout = async (req,res)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1];
        const db = mongo.getDb();
        await db.collection('tokenBlacklistCollection').insertOne({
            token:token
        })
        return res.status(200).json({message: 'cierre de sesion satisfactorio'});
    }catch(error){
        return res.status(500).json({error:"Error al realizar el cierre de sesion"});
    }
}
module.exports = {
    register,
    logout
};
