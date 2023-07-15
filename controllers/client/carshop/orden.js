const ordenModel = require('./../../../models/carshop/orden');
const clienteModel = require('./../../../models/carshop/cliente');
const vehiculoModel = require('./../../../models/carshop/vehiculo');
const {ObjectId} = require('mongodb');

const generarOrden = async(req, res)=>{
    try{
        const ordenData = req.body;
        const idUsuario = req.headers['user_id'];
        let {nombreCliente,email,numeroContacto,tipoIdentificacion,identificacion} = ordenData.cliente;
        let {marca,modelo,placa,nivelTanqueGas,detalle} = ordenData.vehiculo;
        let servicios = ordenData.servicios;
        let insertDataCliente = await clienteModel.insertOne({
            nombre: nombreCliente,
            correo: email,
            numeroContacto: numeroContacto,
            tipoIdentificacion: tipoIdentificacion,
            identificacion: identificacion
        });
        if(insertDataCliente.err){
            return res.status(500).json({error:"Error al crear el cliente de la orden"});
        }
        let inserDataVehiculo = await vehiculoModel.insertOne({
            marca: marca,
            modelo: modelo,
            placa: placa,
            nivelTanqueGas: nivelTanqueGas,
            detalle: detalle
        });
        if(inserDataVehiculo.err){
            return res.status(500).json({error:"Error al crear el vehiculo de la orden"});
        };
        let insertDataOrden = await ordenModel.insertOne({
            cliente: insertDataCliente.insertedId,
            vehiculo: inserDataVehiculo.insertedId,
            servicios: servicios,
            idUser: new ObjectId(idUsuario),
            estado: 'Enviada',
            estadoLogico: 1,
            createdAt: new Date()
        });
        res.status(201).json(insertDataOrden);

    }catch(err){
        return res.status(500).json({error: "Error al generar la orden"});
    }
}
const obtenerOrdenesByUserId = async (req,res)=>{
    try{
        const idUser = req.headers['user_id'];
        let ordenes = await ordenModel.find(idUser);
        if(ordenes.err){
            return res.status(500).json({error: "Error al encontrar las ordenes"});
        }
        return res.status(201).json(ordenes);
    }catch(err){
        return res.status(500).json({error: 'Error al encontrar las ordenes por usuario'});
    }
}

const obtenerOrdenById = async (req,res)=>{
    try{
        
        const idOrden = req.params.id;
        let orden = await ordenModel.findOne(idOrden);
        if(orden.err){
            return res.status(500).json({error: "Error al encontrar la orden solicitada"});
        }
        return res.status(201).json(orden);

    }catch(err){
        console.log('Error en obtenerOrdenById: ',err);
        return res.status(500).json({error: 'Error interno en el servidor'});
    }
}


const editarOrden = async (req,res)=>{
    try{
        const ordenData = req.body;
        let idOrden = ordenData.idOrden;
        let {nombre,email,numeroContacto,tipoIdentificacion,identificacion} = ordenData.cliente;
        let {marca,modelo,placa,nivelTanqueGas,detalle} = ordenData.vehiculo;
        let servicios = ordenData.servicios;
        let idUsuario = ordenData.idUsuario;
        let orden = await ordenModel.findOne(idOrden);
        let cliente = await clienteModel.findOne(orden.cliente);
        let vehiculo = await vehiculoModel.findOne(orden.vehiculo);

        let updateCliente = {
            nombre: nombre,
            correo: email,
            numeroContacto: numeroContacto,
            tipoIdentificacion: tipoIdentificacion,
            identificacion: identificacion
        }

        let updateVehiculo = {
            marca: marca,
            modelo: modelo,
            placa: placa,
            nivelTanqueGas: nivelTanqueGas,
            detalle: detalle
        }
        let updateOrden = {
            servicios: servicios,
            updatedAt: new Date()
        }
        let editarCliente = await clienteModel.updateOne(cliente._id, updateCliente);
        if(editarCliente.err){
            return res.status(500).send('Error al actualizar el cliente');
        }

        let editarVehiculo = await vehiculoModel.updateOne(vehiculo._id, updateVehiculo);
        if(editarVehiculo.err){
            return res.status(500).send('Error al actualizar el vehiculo');
        }
        
        let editarOrden = await ordenModel.updateOne(idOrden,updateOrden);
        if(editarOrden.err){
            return res.status(500).send('Error al actualizar la orden');
        }
    }catch(err){
        return res.status(500).json('Error al actualizar la orden');
    }
}

module.exports = {
    generarOrden,
    obtenerOrdenesByUserId,
    obtenerOrdenById,
    editarOrden
}