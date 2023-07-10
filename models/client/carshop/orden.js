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
            idUser: new ObjectId(idUser)
        }).toArray();
        return ordenesByIdUser;
    }catch(err){
        console.log('error al obtener las ordenes por usuario');
        return {err}
    }
}
const findOne = async (idOrden) =>{
    try{
        const db = mongo.getDb();
        let ordenById = await db.collection('orden').aggregate([{
            $match:{
                _id: new ObjectId(idOrden)
            }       
        },{
            $lookup: {
                from: "cliente",
                localField: "cliente",
                foreignField: "_id",
                as: "cliente"
            }
        },{
            $unwind: {
                path: "$cliente",
                preserveNullAndEmptyArrays: true
            }
        
        },{
            $lookup: {
                from: "vehiculo",
                localField: "vehiculo",
                foreignField: "_id",
                as: "vehiculo"
            }
        },{
                
            $unwind: {
                path: "$vehiculo",
                preserveNullAndEmptyArrays: true
            }
        }]);
        return ordenById.toArray();
    }catch(err){
        console.log('error al obtener la orden solicitada');
        return {err}
    }
}
const updateOne = async (idOrden,updateOrden) => {
    try{
        const db = mongo.getDb();
        let updatedOrden = await db.collection('orden').updateOne({
            _id: new ObjectId(idOrden)
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
    findOne,
    updateOne
}