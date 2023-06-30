const bcrypt = require('bcrypt');
const userModel = require('../../../models/client/auth/userModel');

const register = async (req,res)=>{
    try{
        const data = req.body;
        let {nombre, correo, password} = data;
        let insertUser = await userModel.insertOne({
            nombre: nombre,
            correo:correo,
            password: bcrypt.hashSync(password,10),
            createdAt: new Date()
        });
        res.status(201).json(insertUser);
    }catch(err){
        return res.status(500).send("Error al realizar el registro del usuario");
    }
}
module.exports = register;
