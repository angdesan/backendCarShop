const mongo = require('./../../../lib/db');

const insertOne = async(doc) =>{
    try{
        const db = mongo.getDb();
        let insertData = await db.collection('cliente').insertOne(doc);
        return insertData;
    }catch(err){
        console.log('Error al insertar la informacion del cliente');
        return {err};
    }
}

module.exports = insertOne;