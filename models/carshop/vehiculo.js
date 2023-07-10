const mongo = require('../../lib/db');

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

const findOne = async (idVehiculo) =>{
    try{
        const db = mongo.getDb();
        let vehiculo = await db.collection('vehiculo').findOne({
            _id: ObjectId(idVehiculo)
        });
        return vehiculo;
    }catch(err){
        console.log('Error al encontrar el vehiculo');
        return {err}
    }
}
const updateOne = async (idVehiculo,updateVehiculo) => {
    try{
        const db = mongo.getDb();
        let updateCar = await db.collection('vehiculo').updateOne({
            _id: ObjectId(idVehiculo)
        },{
            $set: updateVehiculo
        });
        return updateCar;

    }catch(err){
        console.log('Error al actualizar el vehiculo');
        return {err}
    }
}

module.exports = {
    insertOne,
    findOne,
    updateOne
};