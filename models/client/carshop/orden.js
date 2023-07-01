const mongo = require('../../../lib/db');
const {ObjectId} = require('mongodb');

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
const find = async(idUser) =>{
    try{
        const db = mongo.getDb();
        let ordenesByIdUser = await db.collection('orden').find({
            idUser: ObjectId(idUser)
        });
        return ordenesByIdUser;
    }catch(err){
        console.log('error al obtener las ordenes por usuario');
        return {err}
    }
}
const findOne = async (idOrden) =>{
    try{
        const db = mongo.getDb();
        let ordenById = await db.collection('orden').findOne({
            _id: ObjectId(idOrden)
        });
        return ordenById;
    }catch(err){
        console.log('error al obtener la orden solicitada');
        return {err}
    }
}
const updateOne = async (idOrden,updateOrden) => {
    try{
        const db = mongo.getDb();
        let updatedOrden = await db.collection('orden').updateOne({
            _id: ObjectId(idOrden)
        },{
            $set: updateOrden
        });
        return updatedOrden;

    }catch(err){
        console.log('Error al actualizar la orden');
        return {err}
    }
}

module.exports = {
    insertOne,
    find,
    findOne
}