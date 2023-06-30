const jwt = require('jsonwebtoken');
const env = require('./../lib/env');
const config = env.getConfig()

const verifyToken = (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token) return res.json({error: 'Acceso denegado'});
    try{
        const verified = jwt.verify(token, config.jwt.secretKey);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).json({error: 'token no valido'});
    }
}

module.exports = verifyToken;