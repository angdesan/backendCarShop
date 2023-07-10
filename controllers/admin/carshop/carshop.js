const ordenModel = require('./../../../models/client/carshop/orden');
const clienteModel = require('./../../../models/client/carshop/cliente');
const vehiculoModel = require('./../../../models/client/carshop/vehiculo');


const obtenerOrdenesAdmin = async (req,res)=>{
    try{
        let ordenes = await ordenModel.findAll();
        if(ordenes.err){
            return res.status(500).json({error: "Error al encontrar las ordenes solicitadas"});
        }
        return res.status(201).json(ordenes);
    }catch(err){
        console.log('Error en obtenerOrdenesAdmin: ',err);
        return res.status(500).json({error: 'Error interno en el servidor'});
    }
}
const eliminarOrden = async(req,res)=>{
    try{
        const idUser = req.params.id;
        let deleteOrden = await ordenModel.deleteOne(idUser);
        if(deleteOrden.err){
            return res.status(500).json({error: "Error al encontrar las eliminar la orden solicitada"});
        }
        return res.status(204).send();

    }catch(err){
        console.log('Error en eliminarOrden: ',err);
        return res.status(500).json({error: 'Error interno en el servidor'});
    }
}


module.exports = {
    obtenerOrdenesAdmin,
    eliminarOrden
}