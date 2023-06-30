const mongo = require('./../../../lib/db');

const insertOne = async(doc) =>{
    try{
        const db = mongo.getDb();
        let insertData = await db.collection('vehiculo').insertOne(doc);
        return insertData;
    }catch(err){
        console.log('Error al insertar la informacion del vehiculo');
        return {err};
    }
}

module.exports = insertOne;