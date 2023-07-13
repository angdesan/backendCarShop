const ordenModel = require('./../../../models/carshop/orden');
const clienteModel = require('./../../../models/carshop/cliente');
const vehiculoModel = require('./../../../models/carshop/vehiculo');


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
const angendarCitaOrden =  async(req,res) =>{
    try{
        const idUser = req.params.id;
        const {estado, fechaCita} = req.body
        const data = {
            estado: estado,
            fechaCitaAgendar: new Date(fechaCita)
        }
        let agendarCita = await ordenModel.updateOne(idUser, data);
        if(agendarCita.err){
            return res.status(500).json({error: "Error al agendar la cita"})
        }
        return res.status(201).send()

    }catch(err){
        console.log('Error en agendarCitaOrden', err);
        return res.status(500).json({error: 'Error interno en el servidor'});
    }
}
const cancelarOrden = async (req,res)=>{
    try{
        const idOrden = req.params.id;
        const {estado, motivoCancelacion} = req.body;
        const data = {
            estado: estado,
            motivoCancelacion: motivoCancelacion
        }
        let cancelarOrden = await ordenModel.updateOne(idOrden, data);
        if(cancelarOrden.err){
            return res.status(500).json({error: "Error al agendar la cita"})
        }
        return res.status(201).send()

    }catch(err){
        console.log('Error en cancelarOrden', err);
        return res.status(500).json({error: 'Error interno en el servidor'});
    }
}


module.exports = {
    obtenerOrdenesAdmin,
    eliminarOrden,
    angendarCitaOrden,
    cancelarOrden
}