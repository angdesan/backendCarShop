const mongo = require('../../../lib/db');

const insertOne = async(doc) => {
    try{
        const db = mongo.getDb();
        let insertData = await db.collection('orden').insertOne(doc);
        return insertData;
    }catch(err){
        console.log('Error al generar la orden');
        return {err};
    }
}

module.exports = insertOne;