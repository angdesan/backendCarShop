const mongo = require('../../lib/db');

const insertOne = async (doc)=>{
    try{
        const db = mongo.getDb();
        let insertData = await db.collection('user').insertOne(doc);
        return insertData;
    }catch(err){
        console.log('Error al registrar el usuario');
        return err;
    }
}
const findOne = async(query, options) =>{
    try{
        const db = mongo.getDb();
        let findData = await db.collection('user').findOne(query,options);
        return findData;
    }catch(err){
        console.log('Error al encontrar el usuario');
        return err;
    }
}
module.exports = {
    insertOne,
    findOne
}