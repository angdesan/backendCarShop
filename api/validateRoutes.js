const jwt = require('jsonwebtoken');
const env = require('../lib/env');
const config = env.getConfig()
const mongo = require('../lib/db');

const verifyToken = async (req, res, next) =>{
    try{
        const db = mongo.getDb();
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) return res.json({error: 'Acceso denegado'});
        const tokenConsulta = await db.collection('tokenBlacklistCollection').findOne({
            token: token
        });
        if(tokenConsulta) return res.json({error: 'Token invalido'});
        const verified = jwt.verify(token, config.jwt.secretKey);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).json({error: 'token no valido'});
    }
}

const verifySession = (req,res,next)=>{
    if(!req.session.user){
        return res.redirect('/admin/login');
    }
    next();
}

module.exports = {
    verifyToken,
    verifySession
};