const ordenModel = require('./../../../models/client/carshop/orden');
const clienteModel = require('./../../../models/client/carshop/cliente');
const vehiculoModel = require('./../../../models/client/carshop/vehiculo');


const generarOrden = async(req, res)=>{
    try{
        const ordenData = req.body;
        let {nombre,email,numeroContacto,tipoIdentificacion,identificacion} = ordenData.cliente;
        let {marca,modelo,placa,nivelTanqueGas,detalle} = ordenData.vehiculo;
        let servicios = ordenData.servicios;
        let insertDataCliente = await clienteModel.insertOne({
            nombre: nombre,
            correo: email,
            numeroContacto: numeroContacto,
            tipoIdentificacion: tipoIdentificacion,
            identificacion: identificacion
        });
        if(insertDataCliente.err){
            return res.status(500).send("Error al crear el cliente de la orden");
        }
        let inserDataVehiculo = await vehiculoModel.insertOne({
            marca: marca,
            modelo: modelo,
            placa: placa,
            nivelTanqueGas: nivelTanqueGas,
            detalle: detalle
        });
        if(inserDataVehiculo.err){
            return res.status(500).send("Error al crear el vehiculo de la orden");
        };
        let insertDataOrden = await ordenModel.insertOne({
            cliente: insertDataCliente.insertedId,
            vehiculo: inserDataVehiculo.insertedId,
            servicios: servicios,
            estado: 'Enviada',
            createdAt: new Date()
        });
        res.status(201).json(insertDataOrden);

    }catch(err){
        return res.status(500).send("Error al generar la orden");
    }
}

module.exports = generarOrden;