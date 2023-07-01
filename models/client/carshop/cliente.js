const mongo = require('./../../../lib/db');
const {ObjectId} = require('mongodb');

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
const findOne = async (idCliente) =>{
    try{
        const db = mongo.getDb();
        let cliente = await db.collection('cliente').findOne({
            _id: ObjectId(idCliente)
        });
        return cliente;
    }catch(err){
        console.log('Error al encontrar el cliente');
        return {err}
    }
}
const updateOne = async (idCliente,updateCliente) => {
    try{
        const db = mongo.getDb();
        let updateClient = await db.collection('cliente').updateOne({
            _id: ObjectId(idCliente)
        },{
            $set: updateCliente
        });
        return updateClient;

    }catch(err){
        console.log('Error al actualizar el cliente');
        return {err}
    }
}

module.exports = {
    insertOne,
    findOne,
    updateOne
}